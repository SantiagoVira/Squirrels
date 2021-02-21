from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver
from django.db.models.signals import post_save

class SquirrelTopic(models.Model):
    topic_name = models.CharField(max_length=100)

    def __str__(self):
        return self.topic_name

# Note: migrate database after every new model!
class SquirreLog(models.Model):
    note = models.TextField(max_length=400) # Arbitrary length of a note
    pub_date = models.DateTimeField('date published')
    votes = models.IntegerField(default=0)
    # topic = models.CharField(max_length=100)

    # ForeignKey connections
    topic = models.ForeignKey(SquirrelTopic, on_delete=models.CASCADE, default="", related_name="SquirreLogs")
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return str(self.topic)

    def topic_name(self):
        """
        Clearer than serializing the __str__ property
        """
        return str(self.topic)

# Note: When migrating new user model, comment out admin.site in urls and settings
# and then run `python ./manage.py makemigrations api`
# You might also need to delete and remake your db.sqlite3, migrations, and __pycache__
# More Info: https://docs.djangoproject.com/pl/2.1/topics/auth/customizing/#changing-to-a-custom-user-model-mid-project
class User(AbstractUser):
    liked_posts = models.ForeignKey(SquirreLog, on_delete=models.CASCADE, default=None, null=True)