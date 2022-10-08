from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView
from .serializers import MyTokenObtainPairSerializer, UserSerializer
from accounts.models import User
from rest_framework.generics import RetrieveAPIView
from django.shortcuts import get_object_or_404


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class SignupAPIView(CreateAPIView):
    model = User
    serializer_class = UserSerializer


class UserDetailAPIView(RetrieveAPIView):
    model = User
    serializer_class = UserSerializer

    def get_object(self):
        user = self.request.user
        obj = get_object_or_404(self.model, id=user.id)
        self.check_object_permissions(self.request, obj)
        return obj
