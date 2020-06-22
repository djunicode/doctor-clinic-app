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
        print(request.POST["date"], "Helllloooo")
        # Appointments (L1, R1) and (L2, R2) will collide iff (R2 >= L1 and L2 <= R1)
        appointments_in_range_for_doctor = Appointment.objects.filter(
            date=request.POST["date"],
            doctor=request.POST["doctor"],
            start_time__lte=request.POST["end_time"],
            end_time__gte=request.POST["start_time"],
        )

        appointments_in_range_for_patient = Appointment.objects.filter(
            date=request.POST["date"],
            patient=request.POST["patient"],
            start_time__lte=request.POST["end_time"],
            end_time__gte=request.POST["start_time"],
        )
        print(serializer.is_valid())
        if (
            serializer.is_valid()
            and len(appointments_in_range_for_doctor) == 0
            and len(appointments_in_range_for_patient) == 0
        ):
            # print(serializer.data)
            val = serializer.save()
            return Response(serializer.data)
        else:
            return Response({"Not posssible": "This slot is not available"})

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



class AppointmentScheduler(APIView):

    def get(self,request):
        doc_id=request.query_params.get('id')
        day=request.query_params.get('date')
        print("doc_id=",doc_id)
        print(day)
        if doc_id:
            val=Doctor.objects.filter(id=doc_id)
            print(val)
            val2=Appointment.objects.filter(doctor=val[0],date=day)

            ser=DocSerializer(val,many=True)
            ser2=AppointmentSerializer2(val2,many=True)
            final={"doctor":ser.data,"patients":ser2.data}
            return Response(final)
        else:
            return Response({"Nop":"not valoid"})

            
    def post(self, request):
        print(request.data)
        serializer = AppointmentSerializer2(data=request.data)
        print(request.POST["date"], "Helllloooo")
        # Appointments (L1, R1) and (L2, R2) will collide iff (R2 >= L1 and L2 <= R1)
        appointments_in_range_for_doctor = Appointment.objects.filter(
            date=request.POST["date"],
            doctor=request.POST["doctor"],
            start_time__lt=request.POST["end_time"],
            end_time__gt=request.POST["start_time"],
        )

        appointments_in_range_for_patient = Appointment.objects.filter(
            date=request.POST["date"],
            patient=request.POST["patient"],
            start_time__lt=request.POST["end_time"],
            end_time__gt=request.POST["start_time"],
        )
        print(serializer.is_valid())
        if (
            serializer.is_valid()
            and len(appointments_in_range_for_doctor) == 0
            and len(appointments_in_range_for_patient) == 0
        ):
            # print(serializer.data)
            val = serializer.save()
            return Response(serializer.data)
        else:
            return Response({"Not posssible": "This slot is not available"})

        return Response(serializer.errors)


class PatientList(APIView):
    def get(self,request):
        val=PatientSerializer(Patient.objects.all(),many=True)
        return Response(val.data)