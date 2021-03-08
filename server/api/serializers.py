from rest_framework import serializers

from rest_framework_jwt.settings import api_settings
from .models import SquirreLog, SquirrelTopic, User

class SquirrelTopicSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    SquirreLogs = serializers.HyperlinkedIdentityField(view_name='squirreltopic-detail')

    class Meta:
        model = SquirrelTopic
        fields = ('id', 'SquirreLogs', 'topic_name',)

# class TinyTopicSerializer(serializers.ModelSerializer):
#     """To be nested in the read-only version of the SquirreLog serializer"""

#     topic_link = serializers.HyperlinkedIdentityField(view_name='squirreltopic-detail')

#     class Meta:
#         model = SquirrelTopic
#         fields = ['topic_name', 'topic_link']

# class SquirreLogReadSerializer(serializers.ModelSerializer):
#     SquirrelTopics = TinyTopicSerializer(many=True, read_only=True)

#     liked_by = serializers.HyperlinkedRelatedField(
#         many=True,
#         read_only=True,
#         view_name='user-detail',
#         )

#     class Meta:
#         model = SquirreLog
#         fields = ('id', 'note', 'pub_date', 'votes', 'owner', 'SquirrelTopics', 'liked_by')

class SquirreLogSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    #serializers.StringRelatedField(many=True, read_only=False)
    SquirrelTopics = SquirrelTopicSerializer(many=True, read_only=True)
    liked_by = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='user-detail',
    )

    class Meta:
        model = SquirreLog
        fields = ('id', 'url', 'note', 'pub_date', 'votes', 'owner', 'SquirrelTopics', 'liked_by')
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
        log.save()

        for topic in topics:
            try: # Finding an existing topic
                topic_obj = SquirrelTopic.objects.get(topic_name__exact=topic)
            except: # When no existing topics
                topic_obj = SquirrelTopic.objects.create(topic_name=topic)
            log.topics.add(topic_obj) # Adding topic
        return log

class UserSerializer(serializers.ModelSerializer): # For handling signups
    # We're using token-based authentication
    password = serializers.CharField(write_only=True)
    liked_posts = serializers.HyperlinkedIdentityField(
        read_only=True,
        view_name='user-liked',
        ) # Link to users/<int:pk>/liked
    posts = serializers.HyperlinkedIdentityField(
        read_only=True,
        view_name='user-detail'
    )

    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'password', 'liked_posts', 'posts')

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password) # Security
        instance.save()
        return instance

# class UserListSerializer(serializers.ModelSerializer):
#     liked_posts = serializers.HyperlinkedRelatedField(
#         many=True,
#         read_only=True,
#         view_name='squirrelog-detail',
#         )
#     posts = serializers.HyperlinkedIdentityField(
#         read_only=True,
#         view_name='user-detail'
#         )

#     class Meta:
#         model = User
#         fields = ('id', 'username', 'liked_posts', 'posts')

# Didn't change this because it's used in pagination
# class UserListSerializer(serializers.ModelSerializer):
#     liked_posts = serializers.HyperlinkedIdentityField(
#         read_only=True,
#         view_name='user-liked',
#         ) # Link to users/<int:pk>/liked
#     posts = serializers.HyperlinkedIdentityField(
#         read_only=True,
#         view_name='user-detail'
#         )
#
#     class Meta:
#         model = User
#         fields = ('id', 'username', 'liked_posts', 'posts')

class UserSquirrelSerializer(serializers.ModelSerializer):
    log_link = serializers.HyperlinkedIdentityField(view_name='squirrelog-detail')
    SquirrelTopics = SquirrelTopicSerializer(many=True, read_only=True)

    class Meta:
        model = SquirreLog
        fields = ('id', 'note', 'pub_date', 'votes', 'SquirrelTopics', 'log_link', 'owner')
