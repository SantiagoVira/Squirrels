# Generated by Django 3.1.4 on 2021-02-20 14:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_auto_20210220_1335'),
    ]

    operations = [
        migrations.RenameField(
            model_name='squirreltopic',
            old_name='topic',
            new_name='topic_name',
        ),
    ]
