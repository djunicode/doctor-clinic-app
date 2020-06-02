from django.contrib import admin
from django.urls import path, include
from .api_views import *


urlpatterns = [
    path("appointments/", AppointmentView.as_view(), name="Appointment"),
]
