# Generated by Django 3.0.7 on 2020-07-23 20:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clinic_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='report',
            name='published_on',
            field=models.DateField(),
        ),
    ]