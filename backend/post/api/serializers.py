from django.http import Http404
from rest_framework import serializers
from django.contrib.auth import get_user_model
from post.models import Post, Comment

User = get_user_model()


class CreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', "username", "email", "profile_pic")


class CommentSerializer(serializers.ModelSerializer):
    creator = CreatorSerializer(read_only=True)

    class Meta:
        model = Comment
        exclude = ('post',)

    def create(self, validated_data):
        print(self.context)
        post_id = self.context.get('post_id')
        post = Post.objects.get(id=post_id)
        validated_data['post'] = post
        validated_data['creator'] = self.context.get("request").user
        return super().create(validated_data)


class PostSerializer(serializers.ModelSerializer):
    creator = CreatorSerializer(read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    is_liked = serializers.SerializerMethodField(read_only=True)
    is_commented = serializers.SerializerMethodField(read_only=True)
    is_saved = serializers.SerializerMethodField(read_only=True)
    comments = serializers.SerializerMethodField()
    saves = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            "id",
            'creator',
            'likes',
            'is_liked',
            'image',
            'content',
            'created',
            'comments',
            'saves',
            'is_saved',
            'is_commented',
        )

    def get_is_liked(self, post):
        user = self.context.get("request").user
        return post.likes.filter(id=user.id).exists()

    def get_is_saved(self, post):
        user = self.context.get("request").user
        return post.saves.filter(id=user.id).exists()

    def get_is_commented(self, post):
        user = self.context.get("request").user
        return post.comments.filter(creator=user).exists()

    def get_likes(self, post):
        return post.likes.count()

    def get_comments(self, post):
        return post.comments.count()

    def get_saves(self, post):
        return post.saves.count()

    def create(self, validated_data):
        user = self.context.get("request").user
        validated_data["creator"] = validated_data.get('creator', user)
        return super().create(validated_data)


class PostCommentSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)

    class Meta:
        model = Post
        fields = ("comments",)
