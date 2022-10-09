from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from post.api.serializers import CreatorSerializer, PostSerializer
from accounts.models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user_name'] = user.username
        try:
            token["profile_pic"] = user.profile_pic.url
        except:
            token["profile_pic"] = ""

        return token


class UserSerializer(serializers.ModelSerializer):
    followers = CreatorSerializer(many=True, read_only=True)
    posts = PostSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'date_joined',
            'email',
            'profile_pic',
            'followers',
            'posts',
        ]
        extra_kwargs = {
            'date_joined': {
                'read_only': True,
            }
        }


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            'email',
            'password',
        )
        extra_kwargs = {
            'password': {
                'write_only': True,
            }
        }
