from rest_framework import pagination
from rest_framework.response import Response
from .models import SquirreLog

class UserSquirrelPagination(pagination.PageNumberPagination):
    # Add in the total votes field
    def get_paginated_response(self, data):
        print(data)
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'total_votes': self.get_total_votes(data[0]['owner']), # They're all by the same person
            'results': data,
        })

    def get_total_votes(self, owner_id):
        data = SquirreLog.objects.filter(owner_id=owner_id)
        return sum([
            log.votes for log in data
        ])
