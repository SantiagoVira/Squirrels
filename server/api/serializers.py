from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
# from django.contrib.auth.models import User # default django user model
from .models import SquirreLog, SquirrelTopic, User

class TinyTopicSerializer(serializers.ModelSerializer):
    topic_link = serializers.HyperlinkedIdentityField(view_name='squirreltopic-detail')

    class Meta:
        model = SquirrelTopic
        fields = ['topic_name', 'topic_link']

class SquirreLogReadSerializer(serializers.ModelSerializer):
    SquirrelTopics = TinyTopicSerializer(many=True, read_only=True)

    class Meta:
        model = SquirreLog
        fields = ('id', 'note', 'pub_date', 'votes', 'owner', 'SquirrelTopics')

class SquirreLogSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    # Establishing the fields
    # SquirrelTopics = TinyTopicSerializer(many=True)
    serializers.StringRelatedField(many=True, read_only=False)
    # topic_links = serializers.HyperlinkedRelatedField(
    #     many=True,
    #     read_only=True,
    #     view_name='squirreltopic-detail'
    # )

    class Meta:
        model = SquirreLog
        fields = ('id', 'note', 'pub_date', 'votes', 'owner', 'SquirrelTopics')

    def create(self, validated_data):
        print(validated_data)
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
            print(topic)
            try: # Finding an existing topic
                topic_obj = SquirrelTopic.objects.get(topic_name__exact=topic_name)
            except: # When no existing topics
                topic_obj = SquirrelTopic.objects.create(topic_name=topic)
            log.topics.add(topic_obj) # Adding topic
        print(log.owner)
        return log

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

class UserSerializer(serializers.ModelSerializer): # For handling signups
    # We're using token-based authentication
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)
    # Creates a many-to-many relationship, similar to User model
    liked_posts = serializers.PrimaryKeyRelatedField(many=True,
        queryset=SquirreLog.objects.all(), required=False)

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
