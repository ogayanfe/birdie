from django.shortcuts import get_object_or_404
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateAPIView,
    RetrieveAPIView,
    RetrieveDestroyAPIView
)
from post.models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from accounts.models import User
from typing import Any


class PostListAPIView(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        filter = self.request.query_params.get('filter', None)
        user = self.request.user
        if filter == 'saved':
            return user.saved_post.all().order_by("-created")
        elif filter == "liked":
            return user.liked_post.all().order_by("-created")
        elif filter == 'user':
            return user.posts.all().order_by("-created")
        elif filter == 'media':
            return user.media_posts().order_by("-created")
        elif filter == "explore":
            def _(post):
                return post.likes.count() + post.saves.count() + post.comments.count()
            return sorted(Post.objects.all().order_by("-created"), key=_, reverse=True)
        else:
            return Post.objects.user_post(user).order_by("-created")


class UserPostListAPIView(ListAPIView):
    serializer_class = PostSerializer
    kwargs: dict[str, Any]

    def get_queryset(self):
        filter = self.request.query_params.get('filter', None)
        pk = self.kwargs.get("id")
        user: User = get_object_or_404(User, id=pk)
        if filter == 'media':
            return user.media_posts().order_by("-created")
        return user.posts.all().order_by("-created")


class PostCreateAPIView(CreateAPIView):
    model = Post
    serializer_class = PostSerializer


class PostUpdateAPIView(RetrieveUpdateAPIView):
    model = Post
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        qs = self.model.objects.filter(creator=user)
        return qs


class PostRetrieveAPIView(RetrieveAPIView):
    model = Post
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class PostDeleteAPIView(RetrieveDestroyAPIView):
    model = Post
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        qs = self.model.objects.filter(creator=user)
        return qs


class PostCommentsListAPIView(ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.kwargs.get('pk')
        return Comment.objects.filter(post__id=post_id).order_by("-created")


class CommentsListAPIView(ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        user = self.request.user
        return Comment.objects.filter(creator=user.id).order_by("-created")


class CommentCreateApiView(CreateAPIView):
    model = Comment
    serializer_class = CommentSerializer

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx["post_id"] = self.kwargs.get('pk')
        return ctx


class CommentDestroyApiView(RetrieveDestroyAPIView):
    model = Comment
    serializer_class = CommentSerializer

    def get_queryset(self):
        return self.model.objects.filter(creator=self.request.user)


class CommentUpdateApiView(RetrieveUpdateAPIView):
    model = Comment
    serializer_class = CommentSerializer

    def get_queryset(self):
        return self.model.objects.filter(creator=self.request.user)


class CommentRetrieveAPIView(RetrieveAPIView):
    model = Comment
    serializer_class = CommentSerializer

    def get_queryset(self):
        return self.model.objects.filter(creator=self.request.user)


class LikeUnlikePostAPIView(APIView):

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        post_likes = post.likes
        if post_likes.filter(id=self.request.user.id).exists():
            post_likes.remove(self.request.user)
        else:
            post_likes.add(self.request.user)
        data = PostSerializer(post, context={"request": self.request}).data
        return Response(data)


class SaveUnsavePostAPIView(APIView):

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        post_saves = post.saves
        if post_saves.filter(id=self.request.user.id).exists():
            post_saves.remove(self.request.user)
        else:
            post_saves.add(self.request.user)
        data = PostSerializer(post, context={"request": self.request}).data
        return Response(data)
