from django.db.models import Manager
from django.db.models import Q


class PostManager(Manager):

    def user_post(self, user):
        query = Q(creator=user) | Q(creator__in=user.following.all())
        return self.get_queryset().filter(query).distinct()
