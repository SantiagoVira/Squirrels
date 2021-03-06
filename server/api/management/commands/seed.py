import requests
from django.core.management.base import BaseCommand
from django.utils import timezone
from ...models import SquirreLog, SquirrelTopic
import sys

def get_official_squirrels():
    r = requests.get(
        "https://data.cityofnewyork.us/resource/gfqj-f768.json",
        headers={'Content-Type':'application/json'}
        )
    return r.json()

def make_topics(json):
    topic_names = set([ # All unique topic names
        section.replace("story_topic_", "", 1)
        for log in json
        for section in log
        if section.startswith("story_topic_")
    ])

    # Making the topics in a dict
    names_to_topics = {}
    for topic_name in topic_names:
        # We don't want to duplicate topics
        try:
            names_to_topics[topic_name] = SquirrelTopic.objects.get(topic_name__exact=topic_name)
        except: # When there is no topic found
            topic = SquirrelTopic(topic_name=topic_name)
            topic.save()
            names_to_topics[topic_name] = topic

    return names_to_topics

# More on saving many-to-many
# https://docs.djangoproject.com/en/3.1/topics/db/examples/many_to_many/
class Command(BaseCommand):
    def handle(self, *args, **options):# Removing default user logs
        SquirreLog.objects.filter(owner_id=1).delete()

        print("Logs under user 1 have been cleared")

        json = get_official_squirrels() # The json of official stories

        print("The official stories have been recieved")

        names_to_topics = make_topics(json)

        print("Unique topics have been registered")

        percent_to_add = 100/len(json)
        current_percent = 0
        for log in json:
            # The topics related to a squirrel log
            seed_topic_names = [
                section.replace("story_topic_", "", 1)
                for section in log
                if section.startswith("story_topic_")
            ]

            seed_log = SquirreLog(
                note=log["note_squirrel_park_stories"],
                pub_date=timezone.now(),
                )
            seed_log.save()

            for seed_topic in seed_topic_names: # Adding the topics
                seed_log.topics.add(names_to_topics[seed_topic])

            # Percentage tracker
            current_percent += percent_to_add
            sys.stdout.write(f"\r~{round(current_percent, 2)}% done saving stories")
            sys.stdout.flush()

        print("\nConsider thyself seeded")
