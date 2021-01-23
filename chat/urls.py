from django.conf.urls import url
from chat import views

app_name = "chat"

urlpatterns = [
    url(r'^convo$',views.convo,name='convo'),
]
