# Generated by Django 4.2.7 on 2023-11-09 14:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotel', '0004_alter_room_daily_cost'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='check_in_date',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='room',
            name='check_out_date',
            field=models.DateField(null=True),
        ),
    ]
