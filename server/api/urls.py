from django.urls import include, path
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token # decodes jwt

from api.views import SquirreLogViewSet

# Assigns viewset methods to HTTP request methods
logs = SquirreLogViewSet.as_view({
    'get': 'get_many',
    'post': 'create',
})

log = SquirreLogViewSet.as_view({
    'put': 'vote',
    'delete': 'delete',
})

# These urlpatterns are included in server/urls.py
urlpatterns = [ # We can actually register the path for our serialized info here
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('logs/', logs, name='logs'),
    path('log/<int:pk>/', log, name='log'),
    path('authenticate/', obtain_jwt_token)
]