from inspect import signature
from rest_framework import pagination
from rest_framework.response import Response
from .models import SquirreLog, SquirrelTopic

def paginated_response(viewset, queryset, serializer_class=None, paginator=None):
    used_serializer = serializer_class or viewset.get_serializer
    used_paginator_class = paginator or viewset.pagination_class
    used_paginator = used_paginator_class()

    # Paginates queryset with specified paginator
    page = used_paginator.paginate_queryset(queryset, viewset.request)
    # Makes specified serializer using paginated queryset
    serializer = used_serializer(page, many=True, context={'request': viewset.request})
    # Returns paginated response
    if signature(used_paginator.get_paginated_response).parameters.get("kwargs"):
        return used_paginator.get_paginated_response(serializer.data, kwargs=viewset.kwargs)
    else:
        return used_paginator.get_paginated_response(serializer.data)

class UserSquirrelPagination(pagination.PageNumberPagination):
    # Add in the total votes field
    def get_paginated_response(self, data):
        try:
            total = self.get_total_votes(data[0]['owner'])
        except IndexError:
            total = 0
        return Response({
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'total_votes': total,
            'results': data,
        })

    def get_total_votes(self, owner_id):
        data = SquirreLog.objects.filter(owner_id=owner_id)
        return sum([
            log.votes() for log in data
        ])

class TopicSquirrelPagination(pagination.PageNumberPagination):
    # Add in the total votes field
    def get_paginated_response(self, data, kwargs):
        try:
            topic_name = SquirrelTopic.objects.get(id=kwargs['pk']).topic_name
        except:
            topic_name = ""

        return Response({
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'topic_name': topic_name,
            'results': data,
        })
