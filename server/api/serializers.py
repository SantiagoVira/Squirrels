from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User # default django user model

from .models import SquirreLog

# Serializers are used in the views 
class SquirreLogSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = SquirreLog
        # We could also add function names to the serializer!
        fields = ('id', 'topic', 'note', 'pub_date', 'votes', 'owner')

# Used for logins
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

class UserTokenSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField() # gets value from method call
    password = serializers.CharField(write_only=True) # reading isn't allowed

    def get_token(self, obj):
        # Encodes data into JWT format
        payload = api_settings.JWT_PAYLOAD_HANDLER(obj)
        token = api_settings.JWT_ENCODE_HANDLER(payload)
        return token
    
    def create(self, data):
        # Removes password from data and instantiate user model
        password = data.pop('password', None)
        instance = self.Meta.model(**data)
        # Sets and hashes password
        if password is not None:
            instance.set_password(password)
        # Creates user
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('username', 'password', 'token')
