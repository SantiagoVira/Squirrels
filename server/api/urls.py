from django.urls import include, path
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from . import views

# Registering viewsets
router = routers.DefaultRouter()

# Maybe we should just combine them and mix with users' posts
# ^ One gallery-feed instead of separate
#router.register(r'NoOneSquireLogs', views.NoOneSquireLogViewset, basename="NoOneSquireLogs") # For gallery
router.register(r'SquirreLogs', views.SquirreLogViewSet, basename="squirrelog")
router.register(r'Topics', views.TopicViewSet)
router.register(r'users', views.UserViewSet)

# These urlpatterns are included in server/urls.py
urlpatterns = [ # We can actually register the path for our serialized info here
    path('current_user/', views.current_user),

    # Custom router views # probably a better way :pensive:
    # path('users/<int:pk>/', views.UserSquirrelViewSet.as_view({'get':'list'})),
    # path("Topics/<int:pk>/", views.TopicLogsViewSet.as_view({'get':'list'})),

    # Authenticates and parses username into jwt
    path('authenticate/', obtain_jwt_token),

    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
]
