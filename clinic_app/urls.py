from django.contrib import admin
from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views
from rest_framework.authtoken import views as views2

urlpatterns = [
    path("register/", views.register, name="new user"),
    path("", auth_views.LoginView.as_view(template_name="login.html"), name="login"),
    path("doc-register/<str:name>/", views.docRegister, name="Doctor Register"),
    path("pat-register/<str:name>/", views.patRegister, name="Patient Register"),
    path("api/list/", views.GetIndividualList.as_view(), name="getindividual"),
    path("api-token-auth/", views2.obtain_auth_token),
    path("api-auth/", include("rest_framework.urls")),
    path("login/", views.LoginUser, name="login2"),
    path("", views.register, name="new user"),
    path(
        "login/", auth_views.LoginView.as_view(template_name="login.html"), name="login"
    ),
    path('logout/', auth_views.LogoutView.as_view(template_name='logout.html')),
    path('accounts/password-reset/',
         auth_views.PasswordResetView.as_view(
            #  template_name='password_reset.html' <--- to be added by frontend team
         ),
         name='password_reset'),
    path('accounts/password-reset/done/',
         auth_views.PasswordResetDoneView.as_view(
            #  template_name='password_reset_done.html'
         ),
         name='password_reset_done'),
    path('acoounts/password-reset-confirm/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(
            #  template_name='password_reset_confirm.html'
         ),
         name='password_reset_confirm'),
    path('accounts/password-reset-complete/',
         auth_views.PasswordResetCompleteView.as_view(
            #  template_name='password_reset_complete.html'
         ),
         name='password_reset_complete'),
    path("doc-register/", views.docRegister, name="Doctor Register"),
    path("pat-register/", views.patRegister, name="Patient Register"),
    path("book-appointment/", views.bookAppointment, name="bookAppointment"),
    path("createReceipt/", views.receipt, name="Receipt"),
    path("report/", views.reports, name="report"),
    path('doctor/dashboard/', views.doctorDashboard, name = "doctorDashboard"),
]
