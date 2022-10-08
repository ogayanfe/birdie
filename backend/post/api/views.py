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


class LikeUnlikePostAPIView(APIView):

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        like = False
        post_likes = post.likes
        if post_likes.filter(id=self.request.user.id).exists():
            post_likes.remove(self.request.user)
        else:
            like = True
            post_likes.add(self.request.user)
        data = CreatorSerializer(self.request.user).data
        data['is_liked'] = like
        data['likes'] = post_likes.count()
        return Response(data)


class SaveUnsavePostAPIView(APIView):

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        saved = False
        post_saved_by = post.saved_by
        if post_saved_by.filter(id=self.request.user.id).exists():
            post_saved_by.remove(self.request.user)
        else:
            saved = True
            post_saved_by.add(self.request.user)
        data = CreatorSerializer(self.request.user).data
        data['saved'] = saved
        data["save_count"] = post_saved_by.count()
        return Response(data)
