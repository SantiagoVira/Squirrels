from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import SquirreLogSerializer
from .models import SquirreLog

# There are other kinds of viewsets we could change to; this one's just lazy lol
# Register viewsets in api/urls.py
class SquirreLogViewSet(viewsets.ModelViewSet):
    def get_many(self, request):
        queryset = SquirreLog.objects.all().order_by('pub_date') # most recent
        serializer =  SquirreLogSerializer(queryset, many=True)
        return Response(serializer.data)

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

# Handles get and post requests to squirrelogs
# @api_view(['GET', 'POST', 'DELETE'])
# def logs(request):  # 'logs' is an arbitrary name, change it if you want
#     if request.method == 'GET':
#         logs = SquirreLog.objects.all()
#         serializer = SquirreLogSerializer(logs, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = SquirreLogSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == 'DELETE':
#         serializer = SquirrelLogSerializer()

# @api_view(['PUT'])
# def vote(request):
#     if request.method == 'PUT':
#         log = SquirreLog.objects.get(id=request.data['id'])
#         vote_count = (log.votes + 1 if request.data['upvote']
#             else log.votes - 1)
#         serializer = SquirreLogSerializer(log, data={'votes': vote_count}, partial=True)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)