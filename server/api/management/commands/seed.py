import requests
from django.core.management.base import BaseCommand
from django.utils import timezone
from ...models import SquirreLog, SquirrelTopic

def get_official_squirrels():
    r = requests.get(
        "https://data.cityofnewyork.us/resource/gfqj-f768.json",
        headers={'Content-Type':'application/json'}
        )
    json = r.json()
    return json

def story_topics(json):
    return set([
        section.replace("story_topic_", "", 1)
        for log in json
        for section in log
        if section.startswith("story_topic_")
    ])

# Avoiding duplicates by deleting everything first
def clear_data():
    # 1 is the default owner and mother of squirrels
    # SquirreLog.objects.filter(owner_id=1).delete()
    # SquirrelTopic.objects.filter(owner_id=1).delete()
    SquirreLog.objects.all().delete()
    SquirrelTopic.objects.all().delete()

# More on saving many-to-many
# https://docs.djangoproject.com/en/3.1/topics/db/examples/many_to_many/
class Command(BaseCommand):
    def handle(self, *args, **options):
        clear_data()

        json = get_official_squirrels() # The json of official stories
        topic_names = story_topics(json) # All unique story topics

        # Making the topics in a dict
        names_to_topics = {
            topic_name : SquirrelTopic(topic_name=topic_name)
            for topic_name in topic_names
        }

        # Saving all the topics
        for topic_name in names_to_topics:
            names_to_topics[topic_name].save()

        for log in json:
            # Making the log
            seed_log = SquirreLog(note=log["note_squirrel_park_stories"], pub_date=timezone.now())
            seed_log.save()

            # The topics related to a squirrel log
            seed_topic_names = [
                section.replace("story_topic_", "", 1)
                for section in log
                if section.startswith("story_topic_")
            ]
            for seed_topic in seed_topic_names: # Adding the topics
                seed_log.topics.add(names_to_topics[seed_topic])

        print("Consider thyself seeded")
