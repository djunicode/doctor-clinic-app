# Generated by Django 3.0.6 on 2020-05-05 20:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("clinic_app", "0002_auto_20200506_0133"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customuser",
            name="is_superuser",
            field=models.BooleanField(default=False),
        ),
    ]
