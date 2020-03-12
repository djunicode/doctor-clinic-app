from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
from django.contrib.auth.models import UserManager
from .managers import CustomManager
import datetime
# Create your models here.
class CustomUser(AbstractBaseUser,PermissionsMixin):
    username=models.CharField(max_length=100,unique=True)
    email= models.EmailField(null=True,blank=True)
    is_Doctor=models.BooleanField(default=False)
    is_Patient=models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    
    objects=CustomManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []


    #def __str__(self):
     #   return self.get_email_field_name






class Doctor(models.Model):
    name = models.OneToOneField(CustomUser,on_delete=models.CASCADE)
    qualification = models.CharField(max_length=50)
    speciality = models.CharField(max_length=50)
    start_time = models.TimeField(default=datetime.datetime.now())
    end_time = models.TimeField(default=datetime.datetime.now())

class Patient(models.Model):
    name = models.OneToOneField(CustomUser,on_delete=models.CASCADE)
    email = models.EmailField()
    DOB = models.DateField()
    doctor = models.ForeignKey(Doctor, on_delete = models.CASCADE) #doc under which patient is working

class Appointment(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete = models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete = models.CASCADE)
    type = models.CharField(max_length=50) #not sure what is this
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    token_number = models.IntegerField()

class Report(models.Model):
    patient = models.ForeignKey(Patient, on_delete = models.CASCADE) #the patient to whom this report belongs
    type = models.CharField(max_length=50) #x-ray, blood, etc. Maybe make it dropdown in future?
    published_on = models.DateTimeField()
    file = models.FileField(upload_to='uploads/%Y/%m/%d/')
