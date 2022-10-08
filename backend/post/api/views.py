from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateAPIView,
    RetrieveAPIView,
    RetrieveDestroyAPIView
)

from post.models import Post, Comment
from .serializers import PostSerializer, PostCommentSerializer, CommentSerializer
from rest_framework.views import APIView


class PostListAPIView(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        filter = self.request.query_params.get('filter', None)
        user = self.request.user
        user_posts = Post.objects.user_post(user)
        if filter == 'saved':
            return user.saved_post
        elif filter == "liked":
            return user.liked_post
        return user_posts


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
