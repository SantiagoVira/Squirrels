from rest_framework import serializers

from rest_framework_jwt.settings import api_settings
from .models import SquirreLog, SquirrelTopic, User

import html

class UserSerializer(serializers.ModelSerializer): # For handling signups
    # We're using token-based authentication
    password = serializers.CharField(write_only=True, required=True)
    liked_posts = serializers.HyperlinkedIdentityField(
        read_only=True,
        view_name='user-liked',
        ) # Link to users/<int:pk>/liked
    posts = serializers.HyperlinkedIdentityField(
        read_only=True,
        view_name='user-posts'
    )

    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'password', 'liked_posts',
            'posts', 'pfp') # avatar

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password) # Security
        instance.save()
        return instance

class SquirrelTopicSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    SquirreLogs = serializers.HyperlinkedIdentityField(view_name='squirreltopic-detail')

    class Meta:
        model = SquirrelTopic
        fields = ('id', 'SquirreLogs', 'topic_name',)
    
class ReplySerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    liked_by = UserSerializer(many=True, read_only=True)
    liked = serializers.SerializerMethodField()
    owner_details = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()

    class Meta:
        model = SquirreLog
        fields = ('id', 'url', 'note', 'pub_date', 'votes', 'owner',
            'owner_details', 'liked_by', 'liked', 'replies', 'is_reply')
        extra_kwargs = {'note': {'trim_whitespace': False}}

    def get_liked(self, obj):
        try:
            request = self.context.get('request', None)
            current_user = User.objects.get(id=request.user.id)
            for post in current_user.liked_posts.all():
                if obj.id == post.id:
                    return True
            return False
        except:
            return False

    def get_owner_details(self, obj):
        return {
            'username': obj.owner.username,
        }

    def get_replies(self, obj):
        # Setting request to None causes replies to have relative 
        # HyperlinkedIdentityFields instead of absolute ones
        replies_serializer = ReplySerializer(obj.replies.all(), 
            many=True, context={'request': None})
        return replies_serializer.data

    def create(self, validated_data):
        log = SquirreLog.objects.create(
            # note=html.escape(validated_data['note']),
            note=validated_data['note'],
            pub_date=validated_data['pub_date'],
            owner=validated_data['owner'],
            is_reply=True
        )
        log.save()
        post = SquirreLog.objects.get(id=validated_data['post_id'])
        post.replies.add(log)
        post.save()
        return log

class SquirreLogSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    SquirrelTopics = SquirrelTopicSerializer(many=True, read_only=True)
    liked_by = UserSerializer(many=True, read_only=True)
    liked = serializers.SerializerMethodField()
    owner_details = serializers.SerializerMethodField()
    #replies = serializers.SerializerMethodField()
    replies = serializers.HyperlinkedIdentityField(read_only=True, view_name='squirrelog-replies')
    replies_length = serializers.SerializerMethodField()

    class Meta:
        model = SquirreLog
        fields = ('id', 'url', 'note', 'pub_date', 'votes', 'owner',
            'owner_details', 'SquirrelTopics', 'liked_by', 'liked',
            'replies', 'replies_length', 'is_reply', 'replying_to')
        extra_kwargs = {'note': {'trim_whitespace': False}}

    def get_liked(self, obj):
        try:
            request = self.context.get('request', None)
            current_user = User.objects.get(id=request.user.id)
            for post in current_user.liked_posts.all():
                if obj.id == post.id:
                    return True
            return False
        except:
            return False

    def get_owner_details(self, obj):
        return {
            'username': obj.owner.username,
            'pfp': obj.owner.pfp
        }

    def get_replies(self, obj):
        # Setting request to None causes replies to have relative 
        # HyperlinkedIdentityFields instead of absolute ones
        if obj.is_reply == False:
            return serializers.HyperlinkedIdentityField(read_only=True, view_name='squirrelog-replies')
        else:
            replies_serializer = SquirreLogSerializer(obj.replies.all(), 
                many=True, context={'request': None})
            return replies_serializer.data

    def get_replies_length(self, obj):
        return obj.replies.count()

    def create(self, validated_data):
        log = SquirreLog.objects.create(
            # note=html.escape(validated_data['note']),
            note=validated_data['note'],
            pub_date=validated_data['pub_date'],
            owner=validated_data['owner'],
        )

        # Making sure there are topics
        if 'SquirrelTopics' in validated_data:
            topics = validated_data['SquirrelTopics']
        else:
            topics = []

        for topic in topics:
            topic.replace("#", "")
            try: # Finding an existing topic
                topic_obj = SquirrelTopic.objects.get(topic_name__exact=topic)
            except: # When no existing topics
                topic_obj = SquirrelTopic.objects.create(topic_name=topic)
            log.topics.add(topic_obj) # Adding topic
        log.save()

        # Replies
        if validated_data['post_id'] is not None:
            log.is_reply = True
            log.save()
            post = SquirreLog.objects.get(id=validated_data['post_id'])
            post.replies.add(log)
            post.save()
        return log

class UserSquirrelSerializer(serializers.ModelSerializer):
    log_link = serializers.HyperlinkedIdentityField(view_name='squirrelog-detail')
    SquirrelTopics = SquirrelTopicSerializer(many=True, read_only=True)

    class Meta:
        model = SquirreLog
        fields = ('id', 'note', 'pub_date', 'votes', 'SquirrelTopics', 'log_link', 'owner')
