from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User # default django user model

from .models import SquirreLog

# The default user class
from django.contrib.auth.models import User

# Serializers are used in the views
class SquirreLogSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = SquirreLog
        # We could also add function names to the serializer!
        fields = ('id', 'topic', 'note', 'pub_date', 'votes', 'user_story')

# CREDIT:
# https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a

class UserSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ('username',)

class UserSerializerWithToken(serializers.ModelSerializer): # For handling signups
    # We're using token-based authentication
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password) # Security
        instance.save()
        return instance

    class Meta:
        model = User
        fields = {'username', 'password', 'token'}
