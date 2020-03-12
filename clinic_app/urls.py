from django.contrib import admin
from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
urlpatterns = [
    path('',views.register,name="new user" ),
    path('login/',auth_views.LoginView.as_view(template_name='login.html'),name="login")
]
