from django.db import models
from django.contrib.auth import get_user_model


class Room(models.Model):
    '''
    Модель описывающая комнату в отеле.
    '''
    room_name    = models.CharField(max_length=50)
    daily_cost   = models.FloatField()
    num_of_seats = models.IntegerField()

    is_booked    = models.BooleanField(default=False)


class RoomBooks(models.Model):
    '''
    Модель для хранения временных промежутков броней комнат.
    '''
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
    user_id = models.ForeignKey(get_user_model(), on_delete=models.SET_DEFAULT, default=1)
    check_in_date = models.DateField(null=True)
    check_out_date = models.DateField(null=True)
