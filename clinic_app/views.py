
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
import datetime
from .forms import *
from .models import *
from .mycalendar import *
from .helper_functions import *
# Create your views here.
def register(request):
    form=CustomUserCreationForm(request.POST)
    if form.is_valid():
        new_user=form.save()
        new_user=authenticate(username=form.cleaned_data['username'],password=form.cleaned_data['password1'])
        login(request,new_user)
        t=form.cleaned_data['Position']
        val=CustomUser.objects.filter(username=form.cleaned_data['username']).first()
        if t=='Doctor':
            val.is_Doctor=True
            val.save()
            return redirect('/docRegister/',{'val':val,'status':'doctor'})
            
        elif t=='Patient':
            val.is_Patient=True
            val.save()
            return redirect('/patRegister/',{'val':val,'status':'patient'})
    else:

        return render(request,"register.html",{'form':form})

def docRegister(request):
    form2 = DoctorForm(request.POST)
    val = request.user.username
    if form2.is_valid():
        form2.save()
        print("in form doctor")
        d=Doctor.objects.filter()
        d.username=val
        d.qualification=form2.cleaned_data['quali']
        d.qualification=form2.cleaned_data['postgrad']
        d.speciality=form2.cleaned_data['special']
        d.update()
        return redirect("/login/")
    else:
        return render(request,"register2.html",{'form':form2,'val':val,'status':'doctor'})

def patRegister(request):
    form3 = PatientForm(request.POST)
    val = request.user.username
    if form3.is_valid():
        form3.save()
        p=Patient.objects.filter()
        p.username=val
        p.DOB=form3.cleaned_data['dob']
        p.update()
        return redirect("/login/")
    else:
        return render(request,"register3.html",{'form':form3,'val':val,'status':'patient'})

def bookAppointment(request):

    #current_calendar = get_current_calendar()
    current_calendar = Appointment.objects.order_by('-date')
    if request.method == "POST":
        form = AppointmentForm(request.POST)
        # Appointments (L1, R1) and (L2, R2) will collide iff (R2 >= L1 and )
        appointments_in_range = Appointment.objects.filter(date = request.POST['date'], 
            doctor = request.POST['doctor'],
            start_time__lte = request.POST['end_time'], 
            end_time__gte = request.POST['start_time'], 
            )
        # start_time = datetime.time(form.fields['start_time'])
        # end_time = form.fields['end_time']
        if (form.is_valid() and len(appointments_in_range) == 0):
            appointment = form.save(commit = False)
            appointment.save()
            #add_appointment_to_calendar()
            
            return redirect('/docRegister/') #gotta decide where to redirect after booking appointment
    else:
        form = AppointmentForm()
        #add_appointment_to_calendar()
    
    return render(request, 'book_appointment.html', {'form' : form, 'current_calendar' : current_calendar})

