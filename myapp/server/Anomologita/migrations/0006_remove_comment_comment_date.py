# Generated by Django 2.1.4 on 2019-02-23 12:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Anomologita', '0005_auto_20190223_1404'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='comment_date',
        ),
    ]
