from rest_framework import permissions

# From docs: https://www.django-rest-framework.org/tutorial/4-authentication-and-permissions/#object-level-permissions
class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Only owner can perform other requests
        return obj.owner == request.user