from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import SquirreLog, SquirrelTopic, User, TopicalSquirrel, Liker # ,   ManageReplies

# There are a bunch of other things we could do
# https://docs.djangoproject.com/en/3.1/intro/tutorial07/

class LookAtSquirreLogs(admin.StackedInline):
    model = SquirreLog
    extra = 0

class TopicalSquirreLogs(admin.StackedInline):
    model = TopicalSquirrel # Holds: a topic and corresponding log
    extra = 0
#
# class LogReplies(admin.StackedInline):
#     fk_name = "reply"
#     model = ManageReplies
#     extra = 0

class LikedAndUsers(admin.StackedInline):
    model = Liker
    extra = 0

class CustomUserAdmin(UserAdmin):
    # So we can edit the logs of a user
    inlines = [LookAtSquirreLogs]

class SquirrelTopicAdmin(admin.ModelAdmin):
    list_display = ('topic_name',)
    inlines = [TopicalSquirreLogs]

class SquirreLogAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'pub_date')
    inlines = [TopicalSquirreLogs, LikedAndUsers] #LogReplies

admin.site.register(User, CustomUserAdmin)

admin.site.register(SquirreLog, SquirreLogAdmin)
admin.site.register(SquirrelTopic, SquirrelTopicAdmin)
