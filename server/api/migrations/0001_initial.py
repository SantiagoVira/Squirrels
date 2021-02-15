# Generated by Django 3.1.4 on 2021-02-14 23:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SquirreLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topic', models.CharField(max_length=100)),
                ('note', models.TextField(max_length=400)),
                ('pub_date', models.DateTimeField(verbose_name='date published')),
            ],
        ),
    ]