from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User # default django user model
from .models import User

from .models import SquirreLog, SquirrelTopic

# Serializers are used in the views
class SquirreLogSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    SquirrelTopics = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='squirreltopic-detail'
    )

    class Meta:
        model = SquirreLog
        fields = ('id', 'note', 'pub_date', 'votes', 'name', 'owner', 'SquirrelTopics')

class SquirrelTopicSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    SquirreLogs = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='squirrelog-detail'
    )

    class Meta:
        model = SquirrelTopic
        fields = ('id', 'SquirreLogs', 'topic_name',)

# Removing this serializer to make it simpler to add fields
# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         fields = ('username',)

class UserSerializer(serializers.ModelSerializer): # For handling signups
    # We're using token-based authentication
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)
    # Creates a many-to-many relationship, similar to User model
    liked_posts = serializers.PrimaryKeyRelatedField(many=True,
        queryset=SquirreLog.objects.all(), required=False)
    disliked_posts = serializers.PrimaryKeyRelatedField(many=True,
        queryset=SquirreLog.objects.all(), required=False)

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
        fields = ('username', 'password', 'token', 'liked_posts', 'disliked_posts')
