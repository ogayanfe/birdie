from django.shortcuts import get_object_or_404
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateAPIView,
    RetrieveAPIView,
    RetrieveDestroyAPIView
)

from post.models import Post, Comment
from .serializers import PostSerializer, PostCommentSerializer, CommentSerializer, CreatorSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


class PostListAPIView(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        filter = self.request.query_params.get('filter', None)
        user = self.request.user
        if filter == 'saved':
            return user.saved_post.all().order_by("-created")
        elif filter == "liked":
            return user.liked_post.all().order_by("-created")
        else:
            return Post.objects.user_post(user).order_by("-created")


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

    def get_queryset(self):
        user = self.request.user
        qs = self.model.objects.filter(creator=user)
        return qs


class PostDeleteAPIView(RetrieveDestroyAPIView):
    model = Post
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        qs = self.model.objects.filter(creator=user)
        return qs


class PostCommentsListAPIView(RetrieveAPIView):
    serializer_class = PostCommentSerializer
    queryset = Post.objects


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
        post_saved_by = post.saved_by
        if post_saved_by.filter(id=self.request.user.id).exists():
            post_saved_by.remove(self.request.user)
        else:
            post_saved_by.add(self.request.user)
        data = PostSerializer(post, context={"request": self.request}).data
        return Response(data)
