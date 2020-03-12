from django import forms
from django.contrib.auth.forms import UserCreationForm,UserChangeForm
from .models import *

class  CustomUserCreationForm(UserCreationForm):
    Post=[('Doctor','Doctor'),('Patient','Patient')]
    Position = forms.ChoiceField(choices=Post, widget=forms.RadioSelect)
    class Meta:
        model=CustomUser
        fields=['username','email','Position']

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model=CustomUser
        fields=['username','email']

class DoctorForm(forms.ModelForm):
   
    #quali=forms.CharField()
    #special=forms.CharField()

    class Meta:
        model=Doctor
        fields=['name','qualification','speciality']



class PatientForm(forms.ModelForm):
    dob=forms.DateField()
    docname=forms.CharField()

    class Meta:
        model=Patient
        fields=['name','dob','docname']
