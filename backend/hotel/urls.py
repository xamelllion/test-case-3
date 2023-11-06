from django.urls import path, include
from rest_framework import routers

from hotel import views


router = routers.DefaultRouter()
router.register(r'rooms', views.RoomViewSet, basename='rooms')
router.register(r'rooms/<int:pk>', views.RoomViewSet, basename='rooms')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.CreateUserView.as_view())
]
