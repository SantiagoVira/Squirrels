from django.urls import include, path
from rest_framework import routers
from api.views import SquirreLogViewSet

#router = routers.DefaultRouter()
#router.register(r'logs', views.SquirreLogViewSet, basename='SquirreLog') # Registering the viewset

# Not using router because we need to concatenate these urlpatterns
# with server urlpatterns
logs = SquirreLogViewSet.as_view({
    'get': 'get_many',
    'post': 'create',
})

log = SquirreLogViewSet.as_view({
    'put': 'update'
})

# These urlpatterns are included in server/urls.py
urlpatterns = [ # We can actually register the path for our serialized info here
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('logs/', logs, name='logs'),
    path('log/<int:id>/', log, name='log'),
]