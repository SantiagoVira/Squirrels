from django.urls import include, path
from rest_framework import routers
from . import views

from rest_framework_jwt.views import obtain_jwt_token

router = routers.DefaultRouter()
router.register(r'SquirreLogs', views.SquirreLogViewSet) # Registering the viewset

# These urlpatterns are included in server/urls.py
urlpatterns = [ # We can actually register the path for our serialized info here
    # Commented out to view the builtin django api interface
    # Since we enabled CORS, directly serving the frontend is unnecessary?
    # ^ We can make requests anyway
    # path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    # path('logs/', views.logs),
    # path('vote/', views.vote),

    path('current_user/', views.current_user),
    path('users/', views.UserList),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('token-auth/', obtain_jwt_token)
]
