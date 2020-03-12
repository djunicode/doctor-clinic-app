from django.contrib.auth.base_user import BaseUserManager

class CustomManager(BaseUserManager):
    #Custom manager for logging in doctors and patients
    def create_user(self, username, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not username:
            raise ValueError('The username must be set')
    
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user


    def create_superuser(self,username,password,**extra_fields):
        #Creating superuser having all the rights
        
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        extra_fields.setdefault('is_active',True)
        #extra_fields.setdefault('is_doctor',True)
        #extra_fields.setdefault('is_patient',True)
        return self.create_user(username,password,**extra_fields)

