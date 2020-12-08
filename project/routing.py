from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import chat_messages.routing

import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter(
            chat_messages.routing.websocket_urlpatterns
        )
    ),
})