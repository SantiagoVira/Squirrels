# Register viewsets in api/urls.py!!!

from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response

# There are so many api views.. maybe we should *eventually* stick to one
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from .serializers import * # The file only has serializers
from .permissions import IsOwner

# Models
from .models import SquirreLog, SquirrelTopic
from django.contrib.auth import get_user_model
User = get_user_model() # checks the most updated User model (api.User)


# User stuff can be loosely based on this article:
# https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a

@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

# The article's UserList
class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    - https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# I put the article's class below, but I think something like this could work?
# It'd be so much cleaner
# class UserList(viewsets.ModelViewSet):
#     """Make and sign in users"""
#     permission_classes = [permissions.AllowAny] # They don't need to be signed in to sign up
#
#     serializer_class = UserSerializerWithToken
#     queryset = User.objects.all()

class TopicViewSet(viewsets.ModelViewSet):
    queryset = SquirrelTopic.objects.all()
    serializer_class = SquirrelTopicSerializer

class SquirreLogViewSet(viewsets.ModelViewSet):
    queryset = SquirreLog.objects.all().order_by('pub_date') # most recent
    serializer_class = SquirreLogSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [permissions.AllowAny, ]
        elif self.action in ['create', 'vote']:
            self.permission_classes = [permissions.IsAuthenticated, ]
        else:
            self.permission_classes = [IsOwner, ]
        return super(SquirreLogViewSet, self).get_permissions()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(methods=['put'], detail=True, url_path='vote', url_name='vote')
    def vote(self, request, **kwargs):
        log = SquirreLog.objects.get(id=kwargs['pk'])
        self.check_object_permissions(request, log)

        user = User.objects.get(id=request.user.id)
        # Checks if user already liked/disliked this post
        previously_liked = log in user.liked_posts.all()
        previously_disliked = log in user.disliked_posts.all()
        changed = True

        if request.data['upvote'] and not previously_liked:
            vote_count = log.votes + 1
            if previously_disliked:
                user.disliked_posts.remove(log.id)
            else:
                user.liked_posts.add(log.id)
        elif not request.data['upvote'] and not previously_disliked:
            vote_count = log.votes - 1
            if previously_liked:
                user.liked_posts.remove(log.id)
            else:
                user.disliked_posts.add(log.id)
        else:
            # Keeps vote count the same if user tries to upvote/downvote again
            changed = False
            vote_count = log.votes

        log_serializer = SquirreLogSerializer(log, data={'votes': vote_count}, partial=True)
        user_serializer = UserSerializer(user)
        if log_serializer.is_valid():
            log_serializer.save()
            return Response({
                'log': log_serializer.data, 
                'user': user_serializer.data, 
                'changed': changed
            }, status=status.HTTP_200_OK)
        return Response(log_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# I think ModelViewSet handles list and stuff
# https://www.django-rest-framework.org/tutorial/6-viewsets-and-routers/
# class SquirreLogViewSet(viewsets.ViewSet):
#     def get_permissions(self):
#         if self.request.method == 'GET':
#             self.permission_classes = [permissions.AllowAny, ]
#         elif self.request.method in ['POST', 'PUT']:
#             self.permission_classes = [permissions.IsAuthenticated, ]
#         else:
#             self.permission_classes = [IsOwner, ]
#         return super(SquirreLogViewSet, self).get_permissions()
#
#     def list(self, request):
#         print(self.permission_classes)
#         print(request.auth)
#         print(request.user.id)
#         queryset = SquirreLog.objects.all().order_by('pub_date') # most recent
#         serializer = SquirreLogSerializer(queryset, many=True)
#         return Response(serializer.data)
#
#     def create(self, request):
#         serializer = SquirreLogSerializer(data=request.data, context={'request': request})
#         if serializer.is_valid():
#             serializer.save(owner=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def retrieve(self, request, **kwargs):
#         queryset = SquirreLog.objects.get(id=kwargs['pk'])
#         serializer = SquirreLogSerializer(queryset)
#         return Response(serializer.data)
#
#     def vote(self, request, **kwargs):
#         print(self.permission_classes)
#         print(request.auth)
#         log = SquirreLog.objects.get(id=kwargs['pk'])
#
#         if request.data['upvote']:
#             vote_count = log.votes + 1
#         else:
#             vote_count = log.votes - 1
