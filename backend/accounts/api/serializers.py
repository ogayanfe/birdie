from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user_name'] = user.username
        try:
            token["profile_pic"] = user.profile_pic.url
        except:
            token["profile_pic"] = ""

        return token
