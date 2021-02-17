from rest_framework import serializers

from .models import SquirreLog

# Serializers are used in the views 
class SquirreLogSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = SquirreLog
        # We could also add function names to the serializer!
        fields = ('id', 'topic', 'note', 'pub_date', 'votes', 'user_story')
