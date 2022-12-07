from django.db import models
from django.contrib.auth.models import AbstractUser
import hashlib
import time
from django.utils.translation import gettext as _


def profile_path(user, filename: str) -> str:
    """
    Return a unique path for all user images
    """
    extension = filename.split(".").pop()
    directory_name = f"{user.username}_{user.id}"
    hash = hashlib.md5(str(time.time()).encode()).hexdigest()
    return f"images/profile/{directory_name}/{hash}.{extension}"


def cover_image_path(user, filename: str):
    extension = filename.split(".").pop()
    directory_name = f"{user.username}_{user.id}"
    hash = hashlib.md5(str(time.time()).encode()).hexdigest()
    return f"images/profile/cover/{directory_name}/{hash}.{extension}"


class User(AbstractUser):
    profile_pic = models.ImageField(
        upload_to=profile_path, null=True)
    following = models.ManyToManyField('self')
    cover_pic = models.ImageField(
        upload_to=cover_image_path, null=True, default="images/cover/coverphoto.jpg")
    followers = models.ManyToManyField('self')

    def media_posts(self):
        return self.posts.exclude(image='')
