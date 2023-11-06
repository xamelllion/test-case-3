from django.db import models
from django.contrib.auth import get_user_model


class Room(models.Model):
    room_name    = models.CharField(max_length=50)
    daily_cost   = models.IntegerField()
    num_of_seats = models.IntegerField()

    is_booked    = models.BooleanField(default=False)
    booked_by    = models.ForeignKey(get_user_model(), on_delete=models.SET_DEFAULT, default=1)
