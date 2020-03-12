from django.shortcuts import render
from .forms import *
from django.http import HttpResponse
from .models import *
# Create your views here.
def register(request):
    form=CustomUserCreationForm(request.POST)
    if form.is_valid():
        form.save()
        t=form.cleaned_data['Position']
        val=CustomUser.objects.filter(username=form.cleaned_data['username']).first()
        if t=='Doctor':
            val.is_Doctor=True


        elif t=='Patient':
            val.is_Patient=True

        val.save()

        return HttpResponse("Created")

    else:
        
        return render(request,"register.html",{'form':form})

