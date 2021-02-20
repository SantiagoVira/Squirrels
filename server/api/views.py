from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import SquirreLogSerializer, UserSerializer, UserTokenSerializer
from .models import SquirreLog
from .permissions import IsOwner

@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class UserList(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserTokenSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Register viewsets in api/urls.py
class SquirreLogViewSet(viewsets.ViewSet):
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.AllowAny, ]
        elif self.request.method in ['POST', 'PUT']:
            self.permission_classes = [permissions.IsAuthenticated, ]
        else:
            self.permission_classes = [IsOwner, ]
        return super(SquirreLogViewSet, self).get_permissions()

    def list(self, request):
        queryset = SquirreLog.objects.all().order_by('pub_date') # most recent
        serializer = SquirreLogSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = SquirreLogSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, **kwargs):
        queryset = SquirreLog.objects.get(id=kwargs['pk'])
        serializer = SquirreLogSerializer(queryset)
        return Response(serializer.data)

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

    def destroy(self, request, **kwargs):
        serializer = SquirreLog.objects.get(id=kwargs['pk'])
        self.check_object_permissions(request, serializer)
        serializer.delete()
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
