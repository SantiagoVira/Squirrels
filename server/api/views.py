from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import SquirreLogSerializer
from .models import SquirreLog

# Register viewsets in api/urls.py
class SquirreLogViewSet(viewsets.ViewSet):
    def get_many(self, request):
        queryset = SquirreLog.objects.all().order_by('pub_date') # most recent
        serializer_class =  SquirreLogSerializer(queryset, many=True)
        return Response(serializer_class.data)

    def create(self, request):
        serializer = SquirreLogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, **kwargs):
        log = SquirreLog.objects.get(id=kwargs['id'])
        serializer = SquirreLogSerializer(log, data={'votes': 
            log.votes + request.data['upvote']}, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, **kwargs):
        SquirreLog.objects.get(id=kwargs['id']).delete()
        return Response(kwargs['id'])