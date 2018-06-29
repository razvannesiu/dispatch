# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-06-28 20:09
from __future__ import unicode_literals

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('dispatch', '0013_article_relation'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('endpoint', models.CharField(max_length=255)),
                ('expirationtime', models.CharField(max_length=255)),
                ('auth', models.CharField(max_length=255)),
                ('keys', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ('created_at',),
            },
        ),
    ]
