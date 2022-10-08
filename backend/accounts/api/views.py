from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView
from .serializers import MyTokenObtainPairSerializer, UserSerializer, SignupSerializer
from accounts.models import User
from rest_framework.generics import RetrieveAPIView
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class SignupAPIView(CreateAPIView):
    model = User
    serializer_class = SignupSerializer
    permission_classes = []
    authentication_classes = []


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
            }, status=403)
        if user.followers.filter(id=self.request.user.id).exists():
            user.followers.remove(self.request.user)
        else:
            followed = True
            user.followers.add(self.request.user)
        data = SignupSerializer(self.request.user).data
        data['followed'] = followed
        data['followers'] = user.followers.count()
        return Response(data)
