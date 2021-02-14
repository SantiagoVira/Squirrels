from rest_framework import serializers

from .models import SquirreLog

# Serializers are used in the views 
class SquirreLogSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SquirreLog
        # We could also add function names to the serializer!
        fields = ('topic', 'note', 'pub_date')
