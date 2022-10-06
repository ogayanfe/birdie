from django.db.models import Manager


class PostManager(Manager):

    def user_post(self, user):
        return self.get_queryset().filter(creator=user)
