"""
ASGI config for project project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/asgi/
"""

import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')

# from django.core.asgi import get_asgi_application
from channels.routing import get_default_application

# application = get_asgi_application()
application = get_default_application()
