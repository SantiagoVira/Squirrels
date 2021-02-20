from django.urls import include, path
from rest_framework import routers
from . import views

from rest_framework_jwt.views import obtain_jwt_token

router = routers.DefaultRouter()
router.register(r'SquirreLogs', views.SquirreLogViewSet) # Registering the viewset

# These urlpatterns are included in server/urls.py
urlpatterns = [ # We can actually register the path for our serialized info here
    path('current_user/', views.current_user),
    path('user/', views.UserList.as_view()),
    # Authenticates and parses username into jwt
    path('authenticate/', obtain_jwt_token),
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
]
