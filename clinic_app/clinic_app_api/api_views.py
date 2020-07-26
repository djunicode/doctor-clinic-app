from rest_framework.views import APIView
from .serializers import *
from ..models import *
from rest_framework.response import Response
import datetime
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login


class CustomAuth(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        #   login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        print(request.user.is_authenticated, "____________")
        return Response(
            {
                "token": token.key,
                "user_id": user.pk,
                "email": user.email,
                "isDoctor": user.is_Doctor,
                "isPatient": user.is_Patient,
                "isStaff": user.is_hospital_staff,
                "firstName": user.first_name,
                "lastName": user.last_name,
            }
        )


# class BookNewAppointmentView(APIView):
#     """
#     """
#     def post(self, request):
#         print(request.data)
#         serializer = AppointmentSerializer2(data=request.data)
#         print(request.POST["date"], "Helllloooo")
#         # Appointments (L1, R1) and (L2, R2) will collide iff (R2 >= L1 and L2 <= R1)
#         if request.POST["start_time"] < request.POST["end_time"]:
#             appointments_in_range_for_doctor = Appointment.objects.filter(
#                 date=request.POST["date"],
#                 doctor=request.POST["doctor"],
#                 start_time__lte=request.POST["end_time"],
#                 end_time__gte=request.POST["start_time"],
#             )

#             appointments_in_range_for_patient = Appointment.objects.filter(
#                 date=request.POST["date"],
#                 patient=request.POST["patient"],
#                 start_time__lte=request.POST["end_time"],
#                 end_time__gte=request.POST["start_time"],
#             )
#             print(serializer.is_valid())
#             if (
#                 serializer.is_valid()
#                 and len(appointments_in_range_for_doctor) == 0
#                 and len(appointments_in_range_for_patient) == 0
#             ):
#                 # print(serializer.data)
#                 val = serializer.save()
#                 return Response(serializer.data)
#             else:
#                 return Response({"Not posssible": "This slot is not available"})
#         else:
#             return Response(
#                 {"Not posssible": "Start time cannot be greater than end time"}
#             )

#         return Response(serializer.errors)


class DocView(APIView):
    def get(self, request):
        print(Doctor.objects.all().first())
        val = Doctor.objects.all()
        ser = DocSerializer(val, many=True)
        # print(ser.is_valid())
        # if ser.is_valid():
        return Response(ser.data)
        # return Response("Hi")


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


class PatientView(APIView):
    """
     This view gives a list of all the patient registered in the clinic
     GET request(Optional parameter id)
     if an id is provided in the request then the specific patient is returned else the entire list of 
     Patients is returned
     """

    def get(self, request):
        user_id = request.query_params.get("id")
        print(user_id)
        if user_id:
            try:
                val = Patient.objects.filter(patient_id=user_id)
                print(val[0].username)
                ser = PatientSerializer(val, many=True)
                # if ser.is_valid():
                return Response(ser.data)
                # else:
                #   return Response(ser.errors)
            except IndexError:
                return Response({"error": "Invalid Id provided "})
        else:
            val = PatientSerializer(Patient.objects.all(), many=True)
            return Response(val.data)


# class PatientList(APIView):
#     """
#     This view gives a list of all the patient registered in the clinic
#     GET request
#     """
#     def get(self, request):


class AppointmentScheduler(APIView):

    """
    
    GET request(Parameters doc_id and day)
    The get request returns returns the appointments for a doctor on a particular day 
    on the basis of date and id provided as parameters in the request

    This view is used for creating new appointments 
    POST request(Parameters doctor,patient,type_of,date,start_time,end_time)
    The post request is used to book a new appointment .All the possible cases to prevent clash 
    of appointment have been handled
    """

    def get(self, request):
        doc_id = request.query_params.get("id")
        day = request.query_params.get("date")

        print("doc_id=", doc_id)
        print(day)
        if doc_id:
            val1 = Doctor.objects.get(doctor_id=doc_id)
            print(val1)
            val2 = Appointment.objects.filter(doctor=val1, date=day)

            ser = DocSerializer(val1)
            ser2 = AppointmentSerializer2(val2, many=True)
            final = {"doctor": ser.data, "patients": ser2.data}
            return Response(final)
        else:
            val = Appointment.objects.all()
            ser = AppointmentSerializer2(val, many=True)
            return Response(ser.data)

    def post(self, request):
        print(request.data)
        serializer = AppointmentSerializer2(data=request.data)

        # Appointments (L1, R1) and (L2, R2) will collide iff (R2 >= L1 and L2 <= R1)
        if request.POST["start_time"] < request.POST["end_time"]:
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
        else:
            return Response(
                {"Not posssible": "Start time cannot be greater than end time"}
            )

        return Response(serializer.errors)


class DailyQueue(APIView):
    """
    This function generates the daily queue for the particular day(by default today)
    The doctor id is the query parameter used to filter the queue by doctors
    """

    def get(self, request):
        schedule = Appointment.objects.filter(date=datetime.date.today()).order_by(
            "start_time"
        )
        print("--->", schedule)
        token = []
        for index, i in enumerate(schedule):
            # for i in schedule:
            token.append(
                {"name": i.patient.username.username, "token_Number": len(token)}
            )
            if DailyDoctorQueue.objects.filter(appointment=i).exists():
                check = DailyDoctorQueue.objects.filter(appointment=i).first()
                check.token = index
                check.save()

            else:
                val = DailyDoctorQueue.objects.create(appointment=i, token=index)
                val.save()

        val2 = DailyDoctorQueue.objects.filter(appointment__date=datetime.date.today())
        print(val2)
        ser = DailySerializer(val2, many=True)
        # print("HIIIIIIIIIIIIIII",ser.data)
        # for i in ser.data:
        #     i['appointment']['doctor']['username']['password']="Nice try but you trash"
        #     i['appointment']['patient']['username']['password']="Nice try but you trash"

        return Response(ser.data)


class AddNewPatient(APIView):
    """
    This view handles adding new patients to the database.
    POST request
    parameters 
    username,DOB,email,password,password2,first_name,last_name,contact_no,profile_pic(optional)
    """

    def post(self, request):

        ser = CustomSerializer(data=request.data)
        print("request.data", request.data)
        if ser.is_valid() and request.data != {}:
            print("----------->", ser.is_valid())
            print("-------+++++", ser.errors)
            if request.data["password"] != request.data["password2"]:
                return Response({"error": "Your Passwords don't match ,Please check"})

            else:
                # print(ser.validated_data)
                ser.validated_data["is_Patient"] = True
                ser.validated_data["is_active"] = True
                val = ser.save()
                temp = Patient.objects.create(
                    username=val,
                    conditions=request.POST["conditions"],
                    history=request.POST["history"],
                )
                temp.save()

                return Response({"added": "New patient added"})
        else:
            if request.data == {}:
                return Response({"Null Fields": "Some fields are not filled"})
            else:
                return Response(ser.errors)

        def put(self, request):

            pat_id = request.query_params.get("patid")
            pat = Patient.objects.get(patient_id=pat_id)
            use = CustomUser.objects.get(id=pat.username.id)
            use.profile_pic = request.data.get("image", None) or use.profile_pic
            use.contact_no = request.data.get("contact", None) or use.contact_no
            use.DOB = request.data.get("DOB", None) or use.DOB
            use.email = request.data.get("email", None) or use.email
            use.first_name = request.data.get("firstname", None) or use.first_name
            use.last_name = request.data.get("lastname", None) or use.last_name
            pat.conditions = request.data.get("conditions", None) or doc.conditions
            pat.history = request.data.get("history", None) or doc.history

            use.save()
            pat.save()

            return Response({"updated": "Patient Details Updated"})


class AddNewDoctor(APIView):
    def post(self, request):

        ser = CustomSerializer(data=request.data)
        print("request.data", request.data)
        if ser.is_valid() and request.data != {}:
            print("----------->", ser.is_valid())
            print("-------+++++", ser.errors)
            if request.data["password"] != request.data["password"]:
                return Response({"error": "Your Passwords don't match ,Please check"})

            else:

                ser.validated_data["is_Doctor"] = True
                ser.validated_data["is_active"] = True
                val = ser.save()
                temp = Doctor.objects.create(
                    username=val,
                    qualification=request.POST["Degrees"],
                    postgrad=request.POST["Postgrad"],
                    speciality=request.POST["Specialization"],
                    daily_start_time=request.POST["daily_start_time"],
                    daily_end_time=request.POST["daily_end_time"],
                )
                temp.save()

                return Response({"added": "New doctor added"})
        else:
            if request.data == {}:
                return Response({"Null Fields": "Some fields are not filled"})
            else:
                return Response(ser.errors)

    def put(self, request):
        doc_id = request.query_params.get("docid")
        doc = Doctor.objects.get(doctor_id=doc_id)
        use = CustomUser.objects.get(id=doc.username.id)
        use.profile_pic = request.data.get("image", None) or use.profile_pic
        use.contact_no = request.data.get("contact", None) or use.contact_no
        use.DOB = request.data.get("DOB", None) or use.DOB
        use.email = request.data.get("email", None) or use.email
        use.first_name = request.data.get("firstname", None) or use.first_name
        use.last_name = request.data.get("lastname", None) or use.last_name
        doc.qualification = request.data.get("qualification", None) or doc.qualification
        doc.postgrad = request.data.get("postgrad", None) or doc.postgrad
        doc.speciality = request.data.get("specialization", None) or doc.speciality
        doc.description = request.data.get("description", None) or doc.description

        use.save()
        doc.save()

        return Response({"updated": "Doctor Details Updated"})


class MarkAttendance(APIView):

    """
    This view handles the attendance part of the user.It takes the 
    patient id whose attendance has to be marked as query params


    """

    def get(self, request):
        pid = request.query_params.get("id")
        # day=request.query_params.get('date')
        print(pid, "000000000000000000000")
        val = DailyDoctorQueue.objects.get(
            # appointment__patient__username=CustomUser.objects.get(username=str(pid)),
            # appointment__date=datetime.date.today(),
            appointment__id=pid
        )
        print(val)
        val.present = True
        val.save()
        return Response({"done": "done"})


class ReportUploader(APIView):
    """
    This view handles all the stuff related to reports 
    GET (Parameter id of patient)
    The get method returns the Reports of patient depending on the id provided

    POST (Parameters fillocation(file),typeof,patient,publishedon,appointment)
    This function is used for uploading data to the database 

    """

    def get(self, request):
        pid = request.query_params.get("patientid")
        rep = Report.objects.filter(patient=Patient.objects.get(patient_id=pid))
        print(rep)

        ser = ReportSerializer(rep, many=True)
        return Response(ser.data)

        return ser.data

    def post(self, request):
        ser = ReportSerializer(data=request.data)
        if ser.is_valid():
            print("Yes")
            val = ser.save()
            return Response(
                {
                    "success": "Your reports have been uploaded ",
                    "location": f"{val.filelocation}",
                }
            )

        return Response(ser.errors)


class ReceiptUploader(APIView):
    """
    This view handles all the stuff related to receipts 
    GET (Parameter id of patient)
    The get method returns the Reports of patient depending on the id provided

    POST (Parameters fillocation(file),typeof,patient,publishedon,appointment)
    This function is used for uploading data to the database 

    """

    def get(self, request):
        pid = request.query_params.get("patientid")
        rep = Receipt.objects.filter(patient=Patient.objects.get(patient_id=pid))
        print(rep)

        ser = ReceiptSerializer(rep, many=True)
        return Response(ser.data)

        return ser.data

    def post(self, request):
        ser = ReceiptSerializer(data=request.data)
        if ser.is_valid():
            print("Yes")
            val = ser.save()
            return Response(
                {
                    "success": "Your receipt has been uploaded ",
                    "location": f"{val.filelocation}",
                }
            )

        return Response(ser.errors)

