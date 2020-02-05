from django.contrib import admin
from .models import Doctor, Patient, Appointment, Report
# Register your models here.
app_models = [Doctor, Patient, Appointment, Report]
admin.site.register(app_models)
