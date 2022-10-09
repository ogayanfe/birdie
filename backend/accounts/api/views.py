from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import MyTokenObtainPairSerializer, UserSerializer, SignupSerializer
from accounts.models import User
from rest_framework.generics import RetrieveAPIView
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class SignupAPIView(CreateAPIView):
    model = User
    serializer_class = SignupSerializer
    permission_classes = []
    authentication_classes = []

    def perform_create(self, serializer):
        # I overode this method because its doesn't return the instance created by
        # the serializer by default, it only calls the save method of the serializer
        return serializer.save()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Need the instance to get the tokens
        instance = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        response = serializer.data
        response["tokens"] = get_tokens_for_user(instance)
        return Response(response, status=status.HTTP_201_CREATED, headers=headers)


class UserDetailAPIView(RetrieveAPIView):
    model = User
    serializer_class = UserSerializer

    def get_object(self):
        user = self.request.user
        obj = get_object_or_404(self.model, id=user.id)
        self.check_object_permissions(self.request, obj)
        return obj


class FollowUnfollowUserAPIView(APIView):

    def post(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        followed = False
        if user == self.request.user:
            return Response({
                'message': "Cannot follow yourself"
            }, status=status.HTTP_403_FORBIDDEN)
        user_followers = user.followers
        if user_followers.filter(id=self.request.user.id).exists():
            user_followers.remove(self.request.user)
        else:
            followed = True
            user_followers.add(user)
        data = SignupSerializer(user).data
        data['followed'] = followed
        data['followers'] = user_followers.count()
        return Response(data)


class ProfileUpdateAPIView(UpdateAPIView):
    model = User
    serializer_class = UserSerializer

    def get_object(self):
        return get_object_or_404(self.model, id=self.request.user.id)
