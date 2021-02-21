from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import SquirreLog, SquirrelTopic, User

# There are a bunch of other things we could do
# https://docs.djangoproject.com/en/3.1/intro/tutorial07/

class LookAtSquirreLogs(admin.StackedInline):
    model = SquirreLog
    extra = 0

class CustomUserAdmin(UserAdmin):
    inlines = [LookAtSquirreLogs] # So we can edit the logs of a user

class SquirrelTopicAdmin(admin.ModelAdmin):
    list_display = ('topic_name',)
    inlines = [LookAtSquirreLogs]

class SquirreLogAdmin(admin.ModelAdmin):
    list_display = ('topic_name', 'pub_date')

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)

admin.site.register(SquirreLog, SquirreLogAdmin)
admin.site.register(SquirrelTopic, SquirrelTopicAdmin)
