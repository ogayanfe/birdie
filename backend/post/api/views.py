from rest_framework.generics import ListAPIView
from post.models import Post
from .serializers import PostSerializer


class PostListAPIView(ListAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Post.objects.user_post(user)
