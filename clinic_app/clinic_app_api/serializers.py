from rest_framework import serializers
from ..models import Patient, Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    doctor = serializers.CharField(source="doctor.username")
    patient = serializers.CharField(source="patient.username")

    class Meta:

        model = Appointment

        # fields = ["doctor", "patient", "type", "date", "start_time", "end_time"]
        fields = "__all__"


class PatientSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="username.username")
    doctor = serializers.CharField(source="doctor.username")

    class Meta:
        model = Patient

        fields = "__all__"
