from rest_framework import viewsets
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from django.contrib.auth import get_user_model

from hotel.serialisers import RoomSerializer, UserSerializer
from hotel.models import Room


class RoomViewSet(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )


    def get_queryset(self):
        request = self.request

        objects = Room.objects.all()
        if request.GET.get('filter_room'):
            mi, ma = map(int, request.GET.get('filter_room').split('-'))
            objects = objects.filter(num_of_seats__gte=mi, num_of_seats__lte=ma)
        if request.GET.get('filter_price'):
            mi, ma = map(int, request.GET.get('filter_price').split('-'))
            objects = objects.filter(daily_cost__gte=mi, daily_cost__lte=ma)

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
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(RoomSerializer(instance).data)


class CreateUserView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )
    model = get_user_model()
