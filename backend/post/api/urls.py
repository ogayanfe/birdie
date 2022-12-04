from django.urls import path
from .views import (
    PostCreateAPIView,
    PostListAPIView,
    PostUpdateAPIView,
    PostRetrieveAPIView,
    PostDeleteAPIView,
    PostCommentsListAPIView,
    CommentCreateApiView,
    CommentDestroyApiView,
    CommentUpdateApiView,
    CommentRetrieveAPIView,
    UserPostListAPIView,
    LikeUnlikePostAPIView,
    SaveUnsavePostAPIView,
    CommentsListAPIView,
)


urlpatterns = (
    path("<int:pk>/", PostRetrieveAPIView.as_view()),
    path("all/", PostListAPIView.as_view()),
    path("user/<int:id>/all/", UserPostListAPIView.as_view()),
    path("<int:pk>/comments/", PostCommentsListAPIView.as_view()),
    path("<int:pk>/comments/create/", CommentCreateApiView.as_view()),
    path("comments/delete/<int:pk>/", CommentDestroyApiView.as_view()),
    path("comments/update/<int:pk>/", CommentUpdateApiView.as_view()),
    path("comments/<int:pk>/", CommentRetrieveAPIView.as_view()),
    path("comments/all/", CommentsListAPIView.as_view()),
    path("create/", PostCreateAPIView.as_view(),),
    path('<int:pk>/like/', LikeUnlikePostAPIView.as_view(),),
    path('<int:pk>/save/', SaveUnsavePostAPIView.as_view(),),
    path("update/<int:pk>/", PostUpdateAPIView.as_view(),),
    path("delete/<int:pk>/", PostDeleteAPIView.as_view(),)
)
