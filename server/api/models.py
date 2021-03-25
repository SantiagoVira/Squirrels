from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver
from django.db.models.signals import post_save

class SquirrelTopic(models.Model):
    topic_name = models.CharField(max_length=100)
    logs = models.ManyToManyField('SquirreLog', through='TopicalSquirrel', related_name='SquirrelTopics')

    def __str__(self):
        return self.topic_name

# Note: migrate database after every new model!
class SquirreLog(models.Model):
    note = models.TextField(max_length=400) # Arbitrary length of a note
    pub_date = models.DateTimeField('date published')

    # Foreign connections
    # https://docs.djangoproject.com/en/2.2/topics/db/models/#intermediary-manytomany
    owner = models.ForeignKey('User', on_delete=models.CASCADE, default=1, related_name='owner')
    topics = models.ManyToManyField('SquirrelTopic', through='TopicalSquirrel', related_name="SquirreLogs")
    liked_by = models.ManyToManyField('User', through="Liker", related_name="liked_by", default=None)
    replies = models.ManyToManyField('self', through='ManageReplies', related_name="log_replies", symmetrical=False)

    def __str__(self):
        return str(self.note)

    def votes(self):
        return self.liked_by.count() # Maybe there's something better? Idk

# Note: When migrating new user model, comment out admin.site in urls and settings
# and then run `python ./manage.py makemigrations api`
# You might also need to delete and remake your db.sqlite3, migrations, and __pycache__
# More Info: https://docs.djangoproject.com/pl/2.1/topics/auth/customizing/#changing-to-a-custom-user-model-mid-project
class User(AbstractUser):
    # Separating likes from dislikes to make sure users can like and dislike one time
    liked_posts = models.ManyToManyField('SquirreLog', through="Liker", related_name="liked_posts")
    pfp = models.ImageField(null=True, upload_to="pfps")
    # avatar = models.TextField(default="")

# intermediary classes for many to many fields
class TopicalSquirrel(models.Model):
    topic = models.ForeignKey('SquirrelTopic', on_delete=models.CASCADE, default=None, null=True)
    log = models.ForeignKey('SquirreLog', on_delete=models.CASCADE)

class Liker(models.Model):
    log = models.ForeignKey('SquirreLog', on_delete=models.CASCADE)
    liker = models.ForeignKey('User', on_delete=models.CASCADE)

class ManageReplies(models.Model):
    log = models.ForeignKey('SquirreLog', related_name="log", on_delete=models.CASCADE)
    reply = models.ForeignKey('SquirreLog', related_name="reply", on_delete=models.CASCADE)
