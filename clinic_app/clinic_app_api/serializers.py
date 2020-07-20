from rest_framework import serializers
from ..models import *
from django.contrib.auth.hashers import make_password
from rest_framework.utils.field_mapping import get_nested_relation_kwargs

class AppointmentSerializer(serializers.ModelSerializer):
    doctor = serializers.CharField(source="doctor.username", read_only=True)
    patient = serializers.CharField(source="patient.username", read_only=True)

    class Meta:

        model = Appointment

        fields = ["doctor", "patient", "type_of", "date", "start_time", "end_time"]
        # fields = "__all__"


class PatientSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="username.username")
    # doctor = serializers.CharField(source="doctor.username")

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
    #appointment = serializers.StringRelatedField()
    appointment=AppointmentSerializer()

    class Meta:
        model=DailyDoctorQueue
        

        fields="__all__"
        depth=3
        

    def build_nested_field(self, field_name, relation_info, nested_depth):
        if field_name == 'username': 
            field_class = DocSerializer
            field_kwargs = get_nested_relation_kwargs(relation_info)
            
            return field_class, field_kwargs
        return super().build_nested_field(field_name, relation_info, nested_depth) 

    
class CustomSerializer(serializers.ModelSerializer):
    password1=serializers.CharField(read_only=True)
    password2=serializers.CharField(read_only=True)

    class Meta:
        model=CustomUser
        #fields=['username','DOB','password1','password2','DOB','first_name','last_name','contact_no']
        # fields="__all__"
        fields = "__all__"
            # write_only_fields = ('password',) 

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(CustomSerializer, self).create(validated_data)

class CustomSerializer2(CustomSerializer):
    first_serilizer = CustomSerializer(many=True, read_only=True)

    class Meta:
        model=DailyDoctorQueue
        fields = ('username',)

# class PartialFirstSerializer(FirstSerializer):

#     class Meta:
        