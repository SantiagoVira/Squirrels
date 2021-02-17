from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'SquirreLogs', views.SquirreLogViewSet) # Registering the viewset

# These urlpatterns are included in server/urls.py
urlpatterns = [ # We can actually register the path for our serialized info here
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('logs/', views.logs),
    path('vote/', views.vote),
]