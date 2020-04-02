from django.contrib import admin
from django.urls import path,include
from . import views
from django.contrib.auth import views as auth_views
from rest_framework.authtoken import views as views2
urlpatterns = [
    path('register/',views.register,name="new user" ),
    path('',auth_views.LoginView.as_view(template_name='login.html'),name="login"),
    path('docRegister/<str:name>/',views.docRegister,name="Doctor Register" ),
    path('patRegister/<str:name>/',views.patRegister,name="Patient Register" ),
    #path('api/list',views.NewUserList.as_view(),name="listapi"),
    path('api/list/',views.GetIndividualList.as_view(),name="getindividual"),
    path('api-token-auth/', views2.obtain_auth_token),
    path('api-auth/', include('rest_framework.urls')), 
    path('login/',views.LoginUser,name="login2"),
    path('',views.register,name="new user" ),
    path('login/',auth_views.LoginView.as_view(template_name='login.html'),name="login"),
    path('docRegister/',views.docRegister,name="Doctor Register" ),
    path('patRegister/',views.patRegister,name="Patient Register" ),
    path('bookAppointment', views.bookAppointment, name='bookAppointment')
]
