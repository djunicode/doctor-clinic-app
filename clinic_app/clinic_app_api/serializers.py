from rest_framework import serializers
from ..models import *


class AppointmentSerializer(serializers.ModelSerializer):
    doctor = serializers.CharField(source="doctor.username", read_only=True)
    patient = serializers.CharField(source="patient.username", read_only=True)

    class Meta:

        model = Appointment

        fields = ["doctor", "patient", "type_of", "date", "start_time", "end_time"]
        # fields = "__all__"


class PatientSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="username.username")
    doctor = serializers.CharField(source="doctor.username")

    class Meta:
        model = Patient

        fields = "__all__"


class ReportSerializer(serializers.ModelSerializer):
    class Meta:

        model = Report
        fields = "__all__"


class AppointmentSerializer2(serializers.ModelSerializer):
    # doctor = serializers.StringRelatedField()
    # patient = serializers.StringRelatedField()

    # doctor = serializers.SlugRelatedField(
    #     slug_field="username", queryset=Doctor.objects.all()
    # )
    # patient = serializers.SlugRelatedField(
    #     slug_field="username", queryset=Patient.objects.all()
    # )

    # def create(self, validated_data):
    #     print("Hello")
    #     print(**validated_data)
    #     app = Appointment.objects.create(**validated_data)
    #     return app.save()

    class Meta:

        model = Appointment

        # fields = ["doctor", "patient", "type_of", "date", "start_time", "end_time"]
        fields = "__all__"


class DocSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="username.username")
    
    class Meta:

        model = Doctor
        fields = "__all__"

class DailySerializer(serializers.ModelSerializer):


    class Meta:
        model=DailyDoctorQueue

        fields="__all__"
        depth=3

    
class CustomSerializer(serializers.ModelSerializer):
    password1=serializers.CharField(read_only=True)
    password2=serializers.CharField(read_only=True)

    class Meta:
        model=CustomUser
        #fields=['username','DOB','password1','password2','DOB','first_name','last_name','contact_no']
        fields="__all__"
