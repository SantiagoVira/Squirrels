"""
Django settings for server project.

Generated by 'django-admin startproject' using Django 3.1.4.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path
import os
import datetime

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/
# Set to SECRET_KEY environment variable or a default string
SECRET_KEY = os.environ.get('SECRET_KEY', 'f151u71kopnay_9$a+^mo68^exeml232ip!y+fop)j)5hr+ec=')

# Note: Debug = false will stop django from serving static files (may need a work-around)
DEBUG = False

ALLOWED_HOSTS = ['localhost', '.herokuapp.com']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'rest_framework', # Rest API
    'corsheaders', # enables cors requests from frontend

    # Custom Apps
    'api.apps.ApiConfig', # Django won't know about the api otherwise
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'server.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'server.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Auth Settings

AUTH_USER_MODEL = 'api.User'

JWT_AUTH = {
    'JWT_RESPONSE_PAYLOAD_HANDLER': 'server.utils.jwt_response_handler',
    'JWT_EXPIRATION_DELTA': datetime.timedelta(hours=6),
}

REST_FRAMEWORK = {
    # Authentication method by priority
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'

# STATICFILES_DIRS can't include STATIC_ROOT directory
if DEBUG:
    # Django (development) looks for static files under STATICFILES_DIRS
    STATICFILES_DIRS = (
        os.path.join(BASE_DIR, "static/static"),
    )
else:
    # WSGI server (production) runs collectstatic and checks STATIC_ROOT
    STATIC_ROOT = os.path.join(BASE_DIR, 'static/static')


# CORS Settings
CORS_ORIGIN_ALLOW_ALL = True

# Heroku Settings
# Check if ran from Heroku's current working directories
cwd = os.getcwd()
if cwd == "/app" or cwd[:4] == "/tmp":
    # Configures Postgres
    import dj_database_url
    DATABASES = {
        "default": dj_database_url.config(default="postgres://localhost")
    }
    # Honor "X-Forwarded-Proto" header for HTTPS requests
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    # Ensure Heroku will serve project (no host header bugs)
    ALLOWED_HOSTS = ["*"]
