from rest_framework.views import APIView
from .serializers import (
    AppointmentSerializer,
    ReportSerializer,
    PatientSerializer,
    AppointmentSerializer2,
    DocSerializer,
)
from ..models import *
from rest_framework.response import Response


class PatientDashboardView(APIView):
    def get(self, request):
        data = Appointment.objects.order_by("-date")
        current_user = Patient.objects.filter(
            username=CustomUser.objects.filter(username=request.user).first()
        )
        reports = Report.objects.all()
        print(current_user)

        serializer = AppointmentSerializer(data, many=True)
        serializer2 = PatientSerializer(current_user, many=True)
        # serializer3 = ReportSerializer(reports, many=True)

        # print(dict(serializer3.data[0]))
        final = {"appointments": serializer.data, "patient": serializer2.data}

        return Response(final)


class PatientRegisterView(APIView):
    def post(self, request):
        print(request.data)
        serializer = AppointmentSerializer2(data=request.data)

        print(serializer.is_valid())
        if serializer.is_valid():
            # print(serializer.data)
            val = serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class docview(APIView):
    def get(self, request):
        print(Doctor.objects.all().first())
        val = Doctor.objects.all()
        ser = DocSerializer(val, many=True)
        # print(ser.is_valid())
        # if ser.is_valid():
        return Response(ser.data)
        # return Response("Hi")


class PatientView(APIView):
    def get(self, request):
        user_id = request.query_params.get("id")
        print(user_id)
        if user_id:
            val = Patient.objects.filter(id=user_id)
            print(val[0].username)
            ser = PatientSerializer(val, many=True)
            # if ser.is_valid():
            return Response(ser.data)
            # else:
            #   return Response(ser.errors)

        else:
            return Response({"error": "Invalid Id provided "})
