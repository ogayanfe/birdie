from rest_framework import serializers
from django.contrib.auth import get_user_model
from post.models import Post, Comment
from django.contrib.humanize.templatetags.humanize import naturaltime

User = get_user_model()


class CreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', "username", "email", "profile_pic")


class CommentSerializer(serializers.ModelSerializer):
    creator = CreatorSerializer(read_only=True)
    created = serializers.SerializerMethodField(read_only=True)
    post_id = serializers.SerializerMethodField()
    post_content = serializers.SerializerMethodField()
    post_creator_profile = serializers.SerializerMethodField()
    post_creator = serializers.SerializerMethodField()
    post_created = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        exclude = ('post',)

    def create(self, validated_data):
        post_id = self.context.get('post_id')
        post = Post.objects.get(id=post_id)
        validated_data['post'] = post
        validated_data['creator'] = self.context.get("request").user
        return super().create(validated_data)

    def get_created(self, comment):
        return naturaltime(comment.created)

    def get_post_id(self, comment):
        return comment.post.id

    def get_post_content(self, comment):
        return comment.post.content

    def get_post_creator_profile(self, comment):
        creator = comment.post.creator
        return creator.profile_pic.url if creator.profile_pic else None

    def get_post_creator(self, comment):
        return comment.post.creator.username

    def get_post_created(self, comment):
        return naturaltime(comment.post.created)


class PostSerializer(serializers.ModelSerializer):
    creator = CreatorSerializer(read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    is_liked = serializers.SerializerMethodField(read_only=True)
    is_commented = serializers.SerializerMethodField(read_only=True)
    is_saved = serializers.SerializerMethodField(read_only=True)
    comments = serializers.SerializerMethodField()
    saves = serializers.SerializerMethodField()
    created = serializers.SerializerMethodField(read_only=True)
    is_following_user = serializers.SerializerMethodField(read_only=True)
    is_followed_by_user = serializers.SerializerMethodField(read_only=True)

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
            'is_following_user',
            'is_followed_by_user',
            "isEdited"
        )

    def get_created(self, post):
        return naturaltime(post.created)

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

    def get_is_following_user(self, post):
        creator = post.creator
        user = self.context.get("request").user
        return user.following.filter(id=creator.id).exists()

    def get_is_followed_by_user(self, post):
        creator = post.creator
        user = self.context.get("request").user
        return creator.following.filter(id=user.id).exists()

    def get_comments(self, post):
        return post.comments.count()

    def get_saves(self, post):
        return post.saves.count()

    def create(self, validated_data):
        user = self.context.get("request").user
        validated_data["creator"] = validated_data.get('creator', user)
        return super().create(validated_data)
