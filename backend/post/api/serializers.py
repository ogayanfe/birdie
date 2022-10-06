from rest_framework import serializers
from django.contrib.auth import get_user_model
from post.models import Post


User = get_user_model()


class CreatorSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("username", "email", "profile_pic", )


class PostSerializer(serializers.ModelSerializer):
    creator = CreatorSerializer()
    likes = CreatorSerializer(many=True)

    class Meta:
        fields = "__all__"
        model = Post
