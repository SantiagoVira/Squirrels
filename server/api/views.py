from rest_framework import viewsets

from .serializers import SquirreLogSerializer
from .models import SquirreLog

# There are other kinds of viewsets we could change to; this one's just lazy lol
# Register viewsets in api/urls.py
class SquirreLogViewSet(viewsets.ModelViewSet):
    queryset = SquirreLog.objects.all().order_by('pub_date') # most recent
    serializer_class =  SquirreLogSerializer
