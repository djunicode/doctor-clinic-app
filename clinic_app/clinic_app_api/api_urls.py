from django.contrib import admin
from django.urls import path, include
from .api_views import *


urlpatterns = [
    path("appointments/", PatientDashboardView.as_view(), name="Appointment"),
    path("patregister/", PatientRegisterView.as_view(), name="PatientRegister"),
    path("test/", docview.as_view()),
    path("patientdetails/", PatientView.as_view(), name="dash"),
    path("newAppointment/",AppointmentScheduler.as_view(),name="new"),
    path("allpat/",PatientList.as_view(),name="allpat"),
    path('daily/',DailyQueue.as_view(),name="daily"),
    path('newpat/',AddNewPatient.as_view(), name="newpatient"),
    path('markAttend/',MarkAttendance.as_view(),name="Mark"),
    path('report/',ReportUploader.as_view(),name='report')

]
