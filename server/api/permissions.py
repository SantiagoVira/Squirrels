from django.contrib.auth.models import User
from rest_framework import permissions

# Checks if current user is the same as object's owner
class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner.id == request.user.id