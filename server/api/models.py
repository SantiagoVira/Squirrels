from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save

# Note: migrate database after every new model!
class SquirreLog(models.Model):
    topic = models.CharField(max_length=100)
    note = models.TextField(max_length=400) # Arbitrary length of a note
    pub_date = models.DateTimeField('date published')
    votes = models.IntegerField(default=0)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    # Reporting system?

    def __str__(self):
        return self.topic
