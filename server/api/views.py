from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import SquirreLogSerializer
from .models import SquirreLog

# Register viewsets in api/urls.py
class SquirreLogViewSet(viewsets.ModelViewSet):
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
    
    @permission_classes([IsAuthenticated])
    def vote(self, request, **kwargs):
        log = SquirreLog.objects.get(id=kwargs['pk'])

        if request.data['upvote']:
            vote_count = log.votes + 1
        else:
            vote_count = log.votes - 1
        serializer = SquirreLogSerializer(log, data={'votes': vote_count}, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, **kwargs):
        SquirreLog.objects.get(id=kwargs['pk']).delete()
        return Response(kwargs['pk'])

# class SquirreLogViewSet(viewsets.ModelViewSet):
#     queryset = SquirreLog.objects.all().order_by('pub_date') # most recent
#     serializer_class =  SquirreLogSerializer
#     #permission_classes = [IsOwnerOrReadOnly]

#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)
    
#     def vote(self, serializer):
#         if self.request.data.upvote:
#             vote_count = serializer
#         serializer.votes