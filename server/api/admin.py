from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from .models import SquirreLog

# There are a bunch of other things we could do
# https://docs.djangoproject.com/en/3.1/intro/tutorial07/

class UserSquirreLogs(admin.StackedInline):
    model = SquirreLog

class CustomUserAdmin(UserAdmin):
    inlines = [UserSquirreLogs] # So we can edit the logs of a user

class SquirreLogAdmin(admin.ModelAdmin):
    list_display = ('topic', 'pub_date')

admin.site.unregister(User) 
admin.site.register(User, CustomUserAdmin)
admin.site.register(SquirreLog, SquirreLogAdmin)
