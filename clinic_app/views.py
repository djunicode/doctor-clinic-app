import datetime
from .forms import *
from .models import *
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from .serializers import *
from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from pprint import pprint

from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth.forms import AuthenticationForm
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework.decorators import api_view, permission_classes


def token_generator(userinput):
    token = Token.objects.create(user=userinput)
    print(token.key)
    return token.key


@csrf_exempt
# Create your views here.
def register(request):
    form = CustomUserCreationForm(request.POST)
    form2 = DoctorForm(request.POST)
    print(request.POST)
    if form.is_valid():
        new_user = form.save()

        tok = token_generator(
            CustomUser.objects.get(username=form.cleaned_data["username"])
        )
        # new_user=authenticate(username=form.cleaned_data['username'],password=form.cleaned_data['password1'])

        # login(request,new_user)
        # t=form.cleaned_data['Position']
        # print(t,"-----------------------------------")
        new_user = authenticate(
            username=form.cleaned_data["username"],
            password=form.cleaned_data["password1"],
        )
        login(request, new_user)
        # t=form.cleaned_data['Position']
        val = CustomUser.objects.filter(username=form.cleaned_data["username"]).first()
        # if t=='Doctor':
        val.is_Doctor = True
        val.save()
        d = Doctor()
        d.username = val
        d.qualification = request.POST["quali"]
        d.qualification = request.POST["postgrad"]
        d.speciality = request.POST["special"]
        d.save()

        # return redirect('/docRegister/{}'.format(val.username),{'val':val,'status':'doctor'})
        return JsonResponse({"success:": "Successfully created new doctor"})
        # elif t=='Patient':
        #     val.is_Patient=True
        #     val.save()
        #     return redirect('/patRegister/{}'.format(val.username),{'val':val,'status':'patient'})
    else:
        pprint(form2.errors.get_json_data())
        return render(request, "register.html", {"form": form, "form2": form2})


@csrf_exempt
def docRegister(request, name):
    form2 = DoctorForm(request.POST)
    val = CustomUser.objects.filter(username=name).first()
    if form2.is_valid():
        form2.save()
        print("in form doctor")
        d = Doctor.objects.get(username=val)
        d.username = val
        d.qualification = request.data["quali"]
        d.qualification = request.data["postgrad"]
        d.speciality = request.data["special"]
        d.save()
        return JsonResponse({"success:": "Successfully created new doctor"})
        # return HttpResponse("Created")
    else:
        print("in else doctor")
        return render(
            request,
            "register2.html",
            {"form": form2, "val": val.username, "status": "doctor", "form2": form2},
        )


@csrf_exempt
def patRegister(request, name):
    form3 = PatientForm(request.POST, initial={"username": request.user})
    form3.fields["username"].initial = request.user
    val = CustomUser.objects.filter(username=name).first()
    if form3.is_valid():
        form3.save()
        print("in form patient")
        p = Patient.objects.get(username=val)

        p = Patient.objects.filter()
        p.username = val
        p.DOB = form3.cleaned_data["dob"]
        p.save()

        return JsonResponse({"success:": "Successfully created new Patient"})
    else:
        print("in else patient")

        return render(
            request,
            "register3.html",
            {"form": form3, "val": val.username, "status": "patient"},
        )


# API view for the serializer


class NewUserList(APIView):
    """
    This view is used to list all the users of our app 
    """

    permission_classes = [permissions.IsAuthenticated]
    # form=AuthenticationForm()
    def get(self, request):
        users = CustomUser.objects.all()
        serializer = NewUserSerializer(users, many=True)
        print("###############################", request.user)
        return Response(serializer.data)

    def post(self, request):
        serializer = NewUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetIndividualList(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_user(self, un):
        try:
            return CustomUser.objects.get(username=un)
        except CustomUser.DoesNotExist:
            raise "Hello"

    def get(self, request):
        users = self.get_user(request.user)
        serializer = NewUserSerializer(users)
        token, created = Token.objects.get_or_create(user=users)
        print(token)
        dict3 = dict(serializer.data)
        dict3["token"] = token.key

        return JsonResponse(dict3, safe=False)


@csrf_protect
@api_view(["POST"])
def LoginUser(request):

    u_name = request.data["username"]
    passw = request.data["password"]

    queryset = CustomUser.objects.get(username=u_name)
    serializer = NewUserSerializer(queryset)
    user = authenticate(username=u_name, password=passw)
    if user is not None:
        user = CustomUser.objects.get(username=u_name)
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        dict3 = dict(serializer.data)
        dict3["token"] = token.key
        return Response(dict3)
    else:
        return JsonResponse("None", safe=False)
        return render(
            request, "register3.html", {"form": form3, "val": val, "status": "patient"}
        )

        return render(
            request, "register3.html", {"form": form3, "val": val, "status": "patient"}
        )


def bookAppointment(request):

    current_calendar = Appointment.objects.order_by("-date")
    if request.method == "POST":
        form = AppointmentForm(request.POST)
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
        if (
            form.is_valid()
            and len(appointments_in_range_for_doctor) == 0
            and len(appointments_in_range_for_patient) == 0
        ):

            print(form.data)
            appointment = form.save(commit=False)
            appointment.save()

            return redirect(
                "bookAppointment"
            )  # gotta decide where to redirect after booking appointment
    else:
        form = AppointmentForm()

    return render(
        request,
        "book_appointment.html",
        {"form": form, "current_calendar": current_calendar},
    )


def receipt(request):

    if request.method == "POST":
        form = ReceiptForm(request.POST)
        if form.is_valid():
            receipt = form.save()
            print("in form receipt")
            print(Doctor.objects.get(username=request.user), "YO BOIS")

            return HttpResponse("Done")
    else:
        form = ReceiptForm()

    return render(request, "receipt.html", {"form": form})


def reports(request):
    if request.method == "POST":
        form = ReportForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponse("Added")
    else:
        form = ReportForm(request.POST, request.FILES)
    return render(request, "receipt.html", {"form": form})


def scheduleAppointments(request):

    doc = Doctor.objects.get(username=CustomUser.objects.get(username="Nilay"))
    # schedule = IndivdualDoctorQueue.objects.filter(doctor=doc)
    schedule=Appointment.objects.filter(doctor=doc,date=datetime.date.today())
    print(schedule)

    token = []
    count = 1
    for i in schedule:
        
        token.append({"name": i.patient.username.username, "token_Number": len(token)})
        if not DailyDoctorQueue.objects.filter(appointment=i).exists():
            val=DailyDoctorQueue.objects.create(appointment=i,token=len(token))
            val.save()
            count += 1
    return HttpResponse(token)


def test(request):
    form=PatientForm(request.POST)
    print(form.is_valid())
    print(form.errors)
    if form.is_valid():
        print("hi")
        print(form.data)

    return render(request,'test.html',{'form':form})

