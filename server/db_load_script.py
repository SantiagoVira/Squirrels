from datetime import datetime
import requests
import sqlite3

choice = input("WARNING: this script clears the squirrelog table in the database, if there are any user posts that you do not want to lose, do not run this script. Continue? (y/N) ")
if choice.lower() == 'y':
    conn = sqlite3.connect('db.sqlite3')
    c = conn.cursor()

    squirrel_json = requests.get("https://data.cityofnewyork.us/resource/gfqj-f768.json").json()

    c.execute('DELETE FROM api_squirrelog')
    for entry in squirrel_json:
        topics = []
        for k in entry:
            if k.startswith('story_topic'):
                topics.append(k.replace('story_topic', '').replace('_', ' ').replace('  ', ' ').strip())
        title = ' and '.join(topics)
        story = entry['note_squirrel_park_stories']
        c.execute('INSERT INTO api_squirrelog (topic, note, pub_date, votes, owner_id) VALUES(?, ?, ?, 0, 0)', (title, story, datetime.now().isoformat()))
        conn.commit()

    conn.close()
