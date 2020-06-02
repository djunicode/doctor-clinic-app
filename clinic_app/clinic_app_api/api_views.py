from rest_framework.views import APIView
from .serializers import AppointmentSerializer, PatientSerializer
from ..models import *
from rest_framework.response import Response


class AppointmentView(APIView):
    def get(self, request):
        data = Appointment.objects.order_by("-date")
        current_user = Patient.objects.filter(
            username=CustomUser.objects.filter(username=request.user).first()
        )
        serializer = AppointmentSerializer(data, many=True)
        serializer2 = PatientSerializer(current_user, many=True)
        print(current_user)
        final = {"appointments": serializer.data, "patient": serializer2.data}

        return Response(final)
