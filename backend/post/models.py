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


class Post(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to=profile_path, default="", null=True)
    creator = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name="post_likes")
    objects = PostManager()
