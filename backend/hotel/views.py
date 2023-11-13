from django.contrib.auth import get_user_model

from rest_framework import viewsets
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly

from django_filters import rest_framework as filters

from hotel.serialisers import RoomSerializer, UserSerializer
from hotel.models import Room, RoomBooks


class RoomBooksFilter(filters.FilterSet):

    class Meta:
        model = RoomBooks
        fields = {
            'check_in_date': ['lte'],
            'check_out_date': ['gte'],
        }


class RoomFilter(filters.FilterSet):
    
    class Meta:
        model = Room
        fields = {
            'num_of_seats': ['lte', 'gte'],
            'daily_cost': ['lte', 'gte'],
        }

    @property
    def qs(self):
        parent = super().qs
        request = self.data
        user = getattr(self.request, 'user', None)

        if request.get('modify'): return parent
        if request is None or \
            request.get('check_in_date__lte') is None or \
            request.get('check_out_date__gte') is None:
            return Room.objects.none()
        
        objects = RoomBooksFilter(self.data, RoomBooks.objects.all()).qs
        out = parent
        for obj in objects:
            if obj.user_id != user:
                out = out.exclude(id=obj.room_id.id)
        return out



class RoomViewSet(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )


    def get_queryset(self):
        request = self.request

        objects = Room.objects.all()
        objects = RoomFilter(data=request.GET, queryset=objects, request=request).qs

        match request.GET.get('price_option'):
            case 'inc':
                return objects.order_by('daily_cost')
            case 'des':
                return objects.order_by('-daily_cost')

        match request.GET.get('count_option'):
            case 'inc':
                return objects.order_by('num_of_seats')
            case 'des':
                return objects.order_by('-num_of_seats')

        return objects.order_by('id')


    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        if request.data['is_booked'] == False:
            RoomBooks.objects.filter(user_id=request.user).delete()
        else:
            record = RoomBooks(
                room_id=instance,
                user_id=request.user,
                check_in_date=request.data['check_in_date'],
                check_out_date=request.data['check_out_date']
            )
            record.save()

        return Response(request.data)


class CreateUserView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )
    model = get_user_model()
