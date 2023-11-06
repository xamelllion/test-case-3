# Generated by Django 4.2.7 on 2023-11-01 15:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room_name', models.CharField(max_length=50)),
                ('daily_cost', models.IntegerField()),
                ('num_of_seats', models.IntegerField()),
                ('is_booked', models.BooleanField(default=False)),
            ],
        ),
    ]
