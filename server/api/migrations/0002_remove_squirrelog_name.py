# Generated by Django 3.1.4 on 2021-02-24 19:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='squirrelog',
            name='name',
        ),
    ]
