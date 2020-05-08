from django.db import models

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.models import UserManager
from .managers import CustomManager
from django.utils import timezone

# Create your models here.
class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(null=True, blank=True)
    is_Doctor = models.BooleanField(default=False)
    is_Patient = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    profile_pic = models.ImageField(upload_to="uploads/%Y/%m/%d/", null=True)

    objects = CustomManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []


class Doctor(models.Model):
    username = models.OneToOneField(CustomUser, on_delete=models.CASCADE, null=False)
    Degrees = (
        ("MBBS", "MBBS"),
        ("BDS", "BDS"),
        ("BHMS", "BHMS"),
        ("DHMS", "DHMS"),
        ("BAMS", "BAMS"),
        ("BUMS", "BUMS"),
        ("BVSc & AH", "BVSc & AH"),
        ("B.Pharm.", "B.Pharm."),
        ("D.Pharm.", "D.Pharm."),
        ("BOT", "BOT"),
        ("BMLT", "BMLT"),
        ("BPT", "BPT"),
        ("B.Sc. Nursing", "B.Sc. Nursing"),
        ("BNYS", "BNYS"),
    )
    Postgrad = (
        ("None", "None"),
        ("MD", "MD"),
        ("MS", "MS"),
        ("Diploma", "Diploma"),
    )

    Specialization = (
        ("None", "None"),
        ("DM", "DM"),
        ("MCh", "MCh"),
    )
    qualification = models.CharField(max_length=50, choices=Degrees, default="MBBS")
    postgrad = models.CharField(
        max_length=50, choices=Postgrad, default=None, null=True
    )
    speciality = models.CharField(
        max_length=50, choices=Specialization, default=None, null=True
    )

    def __str__(self):
        return self.username.username


class Patient(models.Model):
    username = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    DOB = models.DateField(auto_now_add=True)
    doctor = models.ForeignKey(
        Doctor, on_delete=models.CASCADE
    )  # doc under which patient is working

    def __str__(self):
        return self.username.username


class Appointment(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    type = models.CharField(max_length=50)  # not sure what is this
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()


class Report(models.Model):
    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE
    )  # the patient to whom this report belongs
    typeof = models.CharField(
        max_length=50
    )  # x-ray, blood, etc. Maybe make it dropdown in future?
    published_on = models.DateTimeField()
    file = models.FileField(upload_to="uploads/%Y/%m/%d/")


class Receipt(models.Model):

    date = models.DateField()
    time = models.TimeField()
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    price = models.IntegerField()
