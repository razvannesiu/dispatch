# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-07-27 00:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dispatch', '0015_user_management'),
    ]

    operations = [
        migrations.AddField(
            model_name='imageattachment',
            name='style',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='imageattachment',
            name='width',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
