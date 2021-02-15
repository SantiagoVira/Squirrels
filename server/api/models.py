from django.db import models

# Note: migrate database after every new model!
class SquirreLog(models.Model):
    topic = models.CharField(max_length=100)
    note = models.TextField(max_length=400) # Arbitrary length of a note
    pub_date = models.DateTimeField('date published')
    # Maybe a field for squirrel upvotes from users? Won't add yet

    def __str__(self):
        return self.topic