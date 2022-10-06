from django.core.exceptions import ValidationError
from django.conf import settings


def validate_image(image):
    file_size = image.file.size
    limit = settings.MAX_IMAGE_SIZE
    if file_size > limit:
        raise ValidationError("Max size of file is %s KB" % limit)
