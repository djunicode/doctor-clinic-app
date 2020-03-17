
from django.shortcuts import render, redirect
from .forms import *
from django.http import HttpResponse
from .models import *
from django.contrib.auth import authenticate, login
# Create your views here.
def register(request):
    form=CustomUserCreationForm(request.POST)
    if form.is_valid():
        new_user=form.save()
        new_user=authenticate(username=form.cleaned_data['username'],password=form.cleaned_data['password1'])
        login(request,new_user)
        t=form.cleaned_data['Position']
        print(t,"-----------------------------------")
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
        print("in else doctor")
        return render(request,"register2.html",{'form':form2,'val':val,'status':'doctor'})

def patRegister(request):
    form3 = PatientForm(request.POST)
    val = request.user.username
    if form3.is_valid():
        form3.save()
        print("in form patient")
        p=Patient.objects.filter()
        p.username=val
        p.DOB=form3.cleaned_data['dob']
        p.update()
        return redirect("/login/")
    else:
        print("in else patient")
        return render(request,"register3.html",{'form':form3,'val':val,'status':'patient'})
