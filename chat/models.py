from django.db import models

# Create your models here.


class Message(models.Model):
    fromUser = models.CharField(max_length=30)
    toUser = models.CharField(max_length=30)
    messageText = models.CharField(max_length=1000)

    def __self__(self):
        return self.fromUser

    def setData(self, fromUser, toUser, messageText):
        self.fromUser = fromUser
        self.toUser = toUser
        self.messageText = messageText
        return self
