from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.base import Model

# Create your models here.


class User(AbstractUser):
    pass

class Activities(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='activities')
    date = models.DateField(auto_now_add=True)
    duration = models.IntegerField()
class Cards(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='cards')
    acronym = models.CharField(max_length=30)
    definition = models.CharField(max_length=300)
    reviewedDate = models.DateField(auto_now = True)