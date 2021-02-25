from django.urls import include, path
from rest_framework import routers
from . import views

from rest_framework_jwt.views import obtain_jwt_token

# Registering viewsets
router = routers.DefaultRouter()
router.register(r'SquirreLogs', views.SquirreLogViewSet)
router.register(r'Topics', views.TopicViewSet)

# These urlpatterns are included in server/urls.py
urlpatterns = [ # We can actually register the path for our serialized info here
    # Views for users
    path('current_user/', views.current_user),
    path('user/', views.UserList.as_view()),
    path('user/<int:pk>/', views.UserSquirrelViewSet.as_view({'get':'list'})),

    # Authenticates and parses username into jwt
    path('authenticate/', obtain_jwt_token),

    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
]
