from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import *

class  CustomUserCreationForm(UserCreationForm):
    #Post=[('Doctor','Doctor'),('Patient','Patient')]
    #Position = forms.ChoiceField(choices=Post, widget=forms.RadioSelect)
    class Meta:
        model=CustomUser
        fields=['username','email' ]

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model=CustomUser
        fields=['username','email']




Degrees = (
        ('None', 'None'),
        ('MBBS', 'MBBS'),
        ('BDS', 'BDS'),
        ('BHMS', 'BHMS'),
        ('DHMS', 'DHMS'),
        ('BAMS', 'BAMS'),
        ('BUMS', 'BUMS'),
        ('BVSc & AH', 'BVSc & AH'),
        ('B.Pharm.', 'B.Pharm.'),
        ('D.Pharm.', 'D.Pharm.'),
        ('BOT', 'BOT'),
        ('BMLT', 'BMLT'),
        ('BPT', 'BPT'),
        ('B.Sc. Nursing', 'B.Sc. Nursing'),
        ('BNYS', 'BNYS'),
    )

Postgrad = (
        ('None', 'None'),
        ('MD', 'MD'),
        ('MS', 'MS'),
        ('Diploma', 'Diploma'),
    )

Specialization = (
        ('None', 'None'),
        ('DM', 'DM'),
        ('MCh', 'MCh'),
    )
class DoctorForm(forms.ModelForm):
    #username=forms.CharField()
    quali = forms.CharField(widget=forms.Select(choices=Degrees))
    postgrad = forms.CharField(widget=forms.Select(choices=Postgrad))
    special=forms.CharField(widget=forms.Select(choices=Specialization))
    """start_time=forms.TimeField()
    end_time=forms.TimeField()"""

    class Meta:
        model=Doctor
        fields=['quali','postgrad','special']



class PatientForm(forms.ModelForm):
    dob=forms.DateField()

    class Meta:
        model=Patient
        fields=['username','dob','doctor']

class AppointmentForm(forms.ModelForm):
    class Meta:
        model = Appointment
        fields = ['doctor', 'patient', 'type', 'date', 'start_time', 'end_time']
