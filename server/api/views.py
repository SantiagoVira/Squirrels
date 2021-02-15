from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import SquirreLogSerializer
from .models import SquirreLog

# There are other kinds of viewsets we could change to; this one's just lazy lol
# Register viewsets in api/urls.py
class SquirreLogViewSet(viewsets.ModelViewSet):
    queryset = SquirreLog.objects.all().order_by('pub_date') # most recent
    serializer_class =  SquirreLogSerializer

@api_view(['GET', 'POST'])
def logs(request):
    print(request.data)
    if request.method == 'GET':
        logs = SquirreLog.objects.all()
        serializer = SquirreLogSerializer(logs, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SquirreLogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)