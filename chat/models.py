from django.db import models

# Create your models here.


class Message(models.Model):
    fromUser = models.CharField(max_length=30)
    toUser = models.CharField(max_length=30)
    message = models.CharField(max_length=1000)

    def __self__(self):
        return self.fromUser
