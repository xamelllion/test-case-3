from rest_framework import serializers
from django.contrib.auth import get_user_model

from hotel.models import Room, RoomBooks


class RoomSerializer(serializers.ModelSerializer):

    is_booked = serializers.SerializerMethodField()

    def get_is_booked(self, obj):
        user =  self.context['request'].user
        if len(RoomBooks.objects.filter(user_id=user, room_id=obj)) != 0:
            return True
        else:
            return False
        
    class Meta:
        model = Room
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'password', )

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )
        return user
