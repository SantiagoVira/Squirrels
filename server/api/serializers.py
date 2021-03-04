from rest_framework import serializers

from rest_framework_jwt.settings import api_settings
# from django.contrib.auth.models import User # default django user model
from .models import SquirreLog, SquirrelTopic, User

# SquirreLog-Topic Structure (is this correct?): # Yep
# SquirreLog creates/updates topic references in string-related field
# SquirreLogRead gets topics from nested TinyTopic (read-only)
# TinyTopic contains a url to SquirrelTopic and the names of topics
# SquirrelTopic contains Squirrelog urls

class SquirrelTopicSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    SquirreLogs = serializers.HyperlinkedIdentityField(view_name='squirreltopic-detail')

    class Meta:
        model = SquirrelTopic
        fields = ('id', 'SquirreLogs', 'topic_name',)

class TinyTopicSerializer(serializers.ModelSerializer):
    """To be nested in the read-only version of the SquirreLog serializer"""

    topic_link = serializers.HyperlinkedIdentityField(view_name='squirreltopic-detail')

    class Meta:
        model = SquirrelTopic
        fields = ['topic_name', 'topic_link']

class SquirreLogReadSerializer(serializers.ModelSerializer):
    SquirrelTopics = TinyTopicSerializer(many=True, read_only=True)

    liked_by = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='user-detail',
        )

    class Meta:
        model = SquirreLog
        fields = ('id', 'pub_date', 'votes', 'owner', 'SquirrelTopics', 'liked_by')

class SquirreLogSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    serializers.StringRelatedField(many=True, read_only=False)

    class Meta:
        model = SquirreLog
        fields = ('id', 'note', 'pub_date', 'votes', 'owner', 'SquirrelTopics')
        extra_kwargs = {'note': {'trim_whitespace': False}}

    def create(self, validated_data):
        if 'SquirrelTopics' in validated_data: # We're not posting topics?
            topics = validated_data['SquirrelTopics']
        else:
            topics = []
        log = SquirreLog.objects.create(
            note=validated_data['note'],
            pub_date=validated_data['pub_date'],
            owner=validated_data['owner'],
        )
        for topic in topics:
            try: # Finding an existing topic
                topic_obj = SquirrelTopic.objects.get(topic_name__exact=topic_name)
            except: # When no existing topics
                topic_obj = SquirrelTopic.objects.create(topic_name=topic)
            log.topics.add(topic_obj) # Adding topic
        return log

class UserSerializer(serializers.ModelSerializer): # For handling signups
    # We're using token-based authentication
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'token', 'liked_posts')

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

class UserListSerializer(serializers.ModelSerializer):
    liked_posts = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='squirrelog-detail',
        )
    posts = serializers.HyperlinkedIdentityField(
        read_only=True,
        view_name='user-detail'
        )

    class Meta:
        model = User
        fields = ('id', 'username', 'liked_posts', 'posts')

class UserSquirrelSerializer(serializers.ModelSerializer):
    log_link = serializers.HyperlinkedIdentityField(view_name='squirrelog-detail')
    SquirrelTopics = TinyTopicSerializer(many=True, read_only=True)

    class Meta:
        model = SquirreLog
        fields = ('id', 'note', 'pub_date', 'votes', 'SquirrelTopics', 'log_link', 'owner')
