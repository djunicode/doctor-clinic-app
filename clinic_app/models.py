from django.db import models

# Create your models here.
class Doctor(models.Model):
    name = models.CharField(max_length=50)
    qualification = models.CharField(max_length=50)
    speciality = models.CharField(max_length=50)
    start_time = models.TimeField()
    end_time = models.TimeField()

class Patient(models.Model):
    name = models.CharField(max_length=50)
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
