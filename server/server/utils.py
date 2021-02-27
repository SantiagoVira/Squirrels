from api.serializers import UserSerializer

# Overrides jwt_response_payload_handler from JWT library
def jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
