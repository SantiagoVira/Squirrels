"""
ASGI config for server project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/asgi/
"""

# import os
#
# from django.core.asgi import get_asgi_application
#
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
#
# application = get_asgi_application()

# import os
#
# import django
# from channels.http import AsgiHandler
# from channels.routing import ProtocolTypeRouter
#
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
# django.setup()
#
# application = ProtocolTypeRouter({
#   "http": AsgiHandler(),
#   # IMPORTANT::Just HTTP for now. (We can add other protocols later.)
# })

from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import server.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

# application = get_asgi_application()
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            server.routing.websocket_urlpatterns
        )
    ),
})

# import os
# import django
# from channels.routing import get_default_application
#
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_notifications_project.settings") #  your_project_name.settings
# django.setup()
# application = get_default_application()
