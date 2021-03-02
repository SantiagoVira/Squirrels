# Register viewsets in api/urls.py!!!

from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response

# There are so many api views.. maybe we should *eventually* stick to one
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from .serializers import * # Only serializers
from .pagination import * # Only paginator classes
from .permissions import IsOwner

# Models
from .models import SquirreLog, SquirrelTopic
from django.contrib.auth import get_user_model
User = get_user_model() # checks the most updated User model (api.User)

@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class UserViewSet(viewsets.ModelViewSet):
    """User stuff"""

    permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return UserListSerializer
        if self.request.method in ['POST']:
            return UserSerializer

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Response should be the same as obtain_jwt_token (data inside user property)
            return Response({'user': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Logs by user
class UserSquirrelViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny] # They don't need to be signed in to sign up
    serializer_class = UserSquirrelSerializer
    pagination_class = UserSquirrelPagination

    def get_queryset(self):
        return SquirreLog.objects.filter(owner_id=self.kwargs['pk'])

# Liked posts for a user
class UserLikedViewSet(viewsets.ModelViewSet):
    serializer_class = UserSquirrelSerializer

    def get_queryset(self):
        # TODO: GET A LIST OF OBJECTS THAT ARE THE LIKED POSTS OF A USER
        return SquirreLog.objects.filter(owner_id=self.kwargs['pk'])

# Topic view
class TopicViewSet(viewsets.ModelViewSet):
    queryset = SquirrelTopic.objects.all()
    serializer_class = SquirrelTopicSerializer

# SquirreLog gen view
class SquirreLogViewSet(viewsets.ModelViewSet):
    queryset = SquirreLog.objects.all().exclude(owner=1).order_by('pub_date')

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [permissions.AllowAny, ]
        elif self.action in ['create', 'vote']:
            self.permission_classes = [permissions.IsAuthenticated, ]
        else:
            self.permission_classes = [IsOwner, ]
        return super(SquirreLogViewSet, self).get_permissions()

    def get_serializer_class(self):
        # https://stackoverflow.com/a/41313121
        # Specify the serializer we want for each operation
        if self.request.method in ['GET']:
            return SquirreLogReadSerializer
        return SquirreLogSerializer

    def perform_create(self, serializer):
        serializer.save(
            owner=self.request.user,
            SquirrelTopics=self.request.data['topics']
        )

    @action(methods=['put'], detail=True, url_path='vote', url_name='vote')
    def vote(self, request, **kwargs):
        log = SquirreLog.objects.get(id=kwargs['pk'])
        self.check_object_permissions(request, log)

        user = User.objects.get(id=request.user.id)

        # Un-like
        if (log in user.liked_posts.all()):
            vote_count = log.votes - 1
            user.liked_posts.remove(log.id)
        # Like
        else:
            vote_count = log.votes + 1
            user.liked_posts.add(log.id)

        log_serializer = SquirreLogSerializer(log, data={'votes': vote_count}, context={'request': request}, partial=True)
        user_serializer = UserSerializer(user)
        if log_serializer.is_valid():
            log_serializer.save()
            return Response({
                'log': log_serializer.data,
                'user': user_serializer.data
            }, status=status.HTTP_200_OK)
        return Response(log_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
