# Register viewsets in api/urls.py!!!

from django.contrib.auth import authenticate
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework import filters

# There are so many api views.. maybe we should *eventually* stick to one
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from .serializers import * # Only serializers
from .permissions import IsOwner

# Pagination
from .pagination import * # Only paginator classes
from rest_framework.pagination import PageNumberPagination

# Models
from .models import SquirreLog, SquirrelTopic
from django.contrib.auth import get_user_model


User = get_user_model() # checks the most updated User model (api.User)

# Unlike viewsets, this gets user from JWT and not querysets
@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user, context={'request': request})
    return Response(serializer.data)

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # def get_serializer_class(self):
    #     if self.request.method in ['GET']:
    #         return UserListSerializer
    #     if self.request.method in ['POST']:
    #         return UserSerializer

    # Custom register route with token
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        
        # Gets a user object from the request
        user = authenticate(
            username=request.data['username'], 
            password=request.data['password']
        )
        # Turns user object into jwt
        payload = api_settings.JWT_PAYLOAD_HANDLER(user)
        token = api_settings.JWT_ENCODE_HANDLER(payload)

        return Response({
            'token': token,
            **serializer.data
        }, status=status.HTTP_201_CREATED, headers=headers)

    def retrieve(self, request, *args, **kwargs):
        logs = SquirreLog.objects.filter(owner__id=self.kwargs['pk'])

        # http://www.django-rest-framework.org/api-guide/pagination/
        paginator = UserSquirrelPagination()
        paginator.page_size = 20
        result_page = paginator.paginate_queryset(logs, request)
        log_serializer = SquirreLogSerializer(result_page, context={'request': request}, many=True)
        # return Response(log_serializer.data, status=status.HTTP_200_OK)
        return paginator.get_paginated_response(log_serializer.data)


    # Gets all posts liked by specific user
    @action(methods=['get'], detail=True, url_path='liked', name='liked')
    def liked(self, request, pk=None):
        logs = SquirreLog.objects.filter(liked_by__id=pk)

        data = []
        for log in logs:
            # Django encourages using data and context, but we don't seem to need to??
            # This feels djanky
            log_serializer = SquirreLogSerializer(log, data={}, context={'request': request}, partial=True)

            if log_serializer.is_valid():
                data.append(log_serializer.data)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(data, status=status.HTTP_200_OK)

# Logs by user detail
# class UserSquirrelViewSet(viewsets.ModelViewSet):
#     permission_classes = [permissions.AllowAny] # They don't need to be signed in to sign up
#     serializer_class = UserSquirrelSerializer
#     pagination_class = UserSquirrelPagination
#
#     def get_queryset(self):
#         return SquirreLog.objects.filter(owner_id=self.kwargs['pk'])
#
#     # Sort of duplicated from UserViewSet; maybe some way to combine them
#     @action(methods=['get'], detail=True, url_path='liked', name='liked')
#     def liked(self, request, pk=None):
#         user = SquirreLog.objects.filter(liked_by__id=pk)
#
#         log_serializer = SquirreLogSerializer(user, partial=True)
#         if log_serializer.is_valid():
#             return Response(log_serializer.data, status=status.HTTP_200_OK)
#         return Response(log_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Topic view
class TopicViewSet(viewsets.ModelViewSet):
    queryset = SquirrelTopic.objects.all()
    serializer_class = SquirrelTopicSerializer

    # pk-related detailview editing
    def retrieve(self, request, *args, **kwargs):
        topic = SquirrelTopic.objects.get(id=self.kwargs['pk'])
        logs = SquirreLog.objects.filter(topics=topic)

        topic_serializer = SquirrelTopicSerializer(topic, context={'request': request})

        # http://www.django-rest-framework.org/api-guide/pagination/
        paginator = PageNumberPagination()
        paginator.page_size = 20
        result_page = paginator.paginate_queryset(logs, request)
        log_serializer = SquirreLogSerializer(result_page, context={'request': request}, many=True)
        # return Response(log_serializer.data, status=status.HTTP_200_OK)
        return paginator.get_paginated_response({
            **topic_serializer.data,
            'results': log_serializer.data
        })

# class TopicLogsViewSet(viewsets.ModelViewSet):
#     serializer_class = SquirreLogSerializer

#     def get_queryset(self):
#         topic = SquirrelTopic.objects.get(id=self.kwargs['pk'])
#         return SquirreLog.objects.filter(topics=topic)

# ALL SquirreLog view
class SquirreLogViewSet(viewsets.ModelViewSet):
    queryset = SquirreLog.objects.all().order_by('pub_date')
    serializer_class = SquirreLogSerializer

    # Adds searching functionality
    search_fields = ['note', 'owner__username', 'topics__topic_name']
    filter_backends = (filters.SearchFilter,)

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [permissions.AllowAny, ]
        elif self.action in ['create', 'vote']:
            self.permission_classes = [permissions.IsAuthenticated, ]
        else:
            self.permission_classes = [IsOwner, ]
        return super(SquirreLogViewSet, self).get_permissions()

    # def get_serializer_class(self):
    #     # https://stackoverflow.com/a/41313121
    #     # Specify the serializer we want for each operation
    #     if self.request.method in ['GET']:
    #         return SquirreLogReadSerializer
    #     return SquirreLogSerializer

    def perform_create(self, serializer):
        serializer.save(
            owner=self.request.user,
            SquirrelTopics=self.request.data['topics']
        )

    def destroy(self, request, *args, **kwargs):
        # Delete related topics that won't have any associated logs after
        # squirrelog deletion
        topics = SquirrelTopic.objects.filter(logs=kwargs['pk'])
        for topic in topics:
            # Topics with 1 or less logs will be empty after this method
            if topic.logs.count() <= 1:
                topic.delete()
        return super(SquirreLogViewSet, self).destroy(request, *args, **kwargs)

    # Gets all squirrelogs except for superuser's (user 1) squirrelogs
    @action(methods=['get'], detail=False, url_path='uploads', url_name='uploads')
    def uploads(self, request, **kwargs):
        uploads = SquirreLog.objects.all().exclude(owner_id=1).order_by('pub_date')
        serializer = SquirreLogSerializer(uploads, context={'request': request}, many=True)

        paginator = PageNumberPagination()
        paginator.page_size = 20
        result_page = paginator.paginate_queryset(uploads, request)
        log_serializer = SquirreLogSerializer(result_page, context={'request': request}, many=True)
        # return Response(log_serializer.data, status=status.HTTP_200_OK)
        return paginator.get_paginated_response(log_serializer.data)

    @action(methods=['put'], detail=True, url_path='vote', url_name='vote')
    def vote(self, request, **kwargs):
        log = SquirreLog.objects.get(id=kwargs['pk'])
        self.check_object_permissions(request, log) # checking permissions
        user = User.objects.get(id=request.user.id)

        # Un-like if the user liked already
        if (log in user.liked_posts.all()):
            who_liked = log.liked_by.remove(user.id)
            user.liked_posts.remove(log.id)
        # Otherwise, like
        else:
            who_liked = log.liked_by.add(user.id)
            user.liked_posts.add(log.id)

        log_serializer = SquirreLogSerializer(log, data={'liked_by':
            who_liked}, context={'request': request}, partial=True)
        user_serializer = UserSerializer(user, context={'request': request})

        if log_serializer.is_valid():
            log_serializer.save()
            return Response({
                'log': log_serializer.data,
                'user': user_serializer.data
            }, status=status.HTTP_200_OK)
        return Response(log_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Excluding user 1; we need at least one view with all
# class NoOneSquireLogViewset(viewsets.ModelViewSet):
#     "This view excludes user 1; we hate them :)"
    # queryset = SquirreLog.objects.all().exclude(owner_id=1).order_by('pub_date')
    # serializer_class = SquirreLogReadSerializer
    #
    # # Basic search
    # search_fields = ['note', 'owner__username', 'topics__topic_name']
    # filter_backends = (filters.SearchFilter,)
