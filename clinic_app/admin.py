from django.contrib import admin
from .models import (
    Doctor,
    Patient,
    Appointment,
    Report,
    CustomUser,
    DailyDoctorQueue,
)
from django.contrib.auth.admin import UserAdmin
from .forms import *


class CustomUserAdmin(UserAdmin):
    list_display = (
        "username",
        "email",
        "date_joined",
        "last_login",
        "is_superuser",
        "is_staff",
        "id",
    )
    search_fields = (
        "email",
        "username",
    )
    readonly_fields = ("date_joined", "last_login")

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


# Register your models here.
app_models = [Doctor, Patient, Appointment, Report, DailyDoctorQueue]
admin.site.register(app_models)
admin.site.register(CustomUser, CustomUserAdmin)
