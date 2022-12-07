from django.db import models
import hashlib
import time
from django.conf import settings
from .managers import PostManager

User: str = settings.AUTH_USER_MODEL


def profile_path(instance, filename: str) -> str:
    """
    Return a unique path for all user images
    """
    extension = filename.split(".").pop()
    directory_name = f"{instance.creator.username}_{instance.creator.id}"
    hash = hashlib.md5(str(time.time()).encode()).hexdigest()
    return f"images/posts/images/{directory_name}/{hash}.{extension}"


class Comment(models.Model):
    creator = models.ForeignKey(
        User, related_name="comments", on_delete=models.CASCADE)
    content = models.TextField()
    post = models.ForeignKey(
        "Post", related_name='comments', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.creator.username} at {self.created}'


class Post(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to=profile_path, default="", null=True)
    creator = models.ForeignKey(
        User, related_name='posts', on_delete=models.CASCADE)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name="liked_post")
    saves = models.ManyToManyField(User, related_name="saved_post")
    isEdited = models.BooleanField(default=False)
    objects = PostManager()

    def __str__(self):
        return f'{self.creator.username} at {self.created}'
