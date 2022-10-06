from django.urls import path
from .views import PostListAPIView


urlpatterns = [
    path("all_post/", PostListAPIView.as_view())
]
