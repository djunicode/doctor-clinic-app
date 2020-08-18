from rest_framework import serializers
from .models import CustomUser


class NewUserSerializer(serializers.ModelSerializer):
    # password2=serializers.CharField(max_length=100)
    class Meta:
        model = CustomUser
        fields = ("id", "username", "email", "date_joined")
