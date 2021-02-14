from django.contrib import admin
from .models import SquirreLog

# Adding models to be reflected in the admin site
class SquirreLogAdmin(admin.ModelAdmin):
    # There are a bunch of other things we could do
    # https://docs.djangoproject.com/en/3.1/intro/tutorial07/
    list_display = ('topic', 'pub_date')

admin.site.register(SquirreLog, SquirreLogAdmin)
