from rest_framework import viewsets, status

# There are so many api views.. maybe we should *eventually* stick to one
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from rest_framework import permissions
from rest_framework.response import Response

from .serializers import * # The file only has serializers
from .models import SquirreLog
from django.contrib.auth.models import User

# There are other kinds of viewsets we could change to
# Register viewsets in api/urls.py
class SquirreLogViewSet(viewsets.ModelViewSet):
    queryset = SquirreLog.objects.all().order_by('pub_date') # most recent
    serializer_class = SquirreLogSerializer

# User stuff is on the logic from
# https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a
# class UserViewSet(viewsets.ModelViewSet): # Something similar?
#     """Check authenticated user on a GET request"""
#
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

# class UserList(viewsets.ModelViewSet):
#     """Make and sign in users"""
#
#     permission_classes = [permissions.AllowAny] # They don't need to be signed in to sign up
#     serializer_class = UserSerializerWithToken
#     queryset = User.objects.all()

# The class used in the article:
class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Handles get and post requests to squirrelogs # I think this and SquireLogViewSet do the same thing?
# https://www.django-rest-framework.org/tutorial/6-viewsets-and-routers/
# @api_view(['GET', 'POST'])
# def logs(request):  # 'logs' is an arbitrary name, change it if you want
#     if request.method == 'GET':
#         logs = SquirreLog.objects.all()
#         serializer = SquirreLogSerializer(logs, many=True)
#         return Response(serializer.data)
#
#     elif request.method == 'POST':
#         serializer = SquirreLogSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def vote(request):
    if request.method == 'PUT':
        log = SquirreLog.objects.get(id=request.data['id'])
        vote_count = (log.votes + 1 if request.data['upvote']
            else log.votes - 1)
        serializer = SquirreLogSerializer(log, data={'votes': vote_count}, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
