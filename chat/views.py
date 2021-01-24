from django.http.response import HttpResponse
from chat.models import Message
from django.shortcuts import render
from chat.forms import LinkForm
# Create your views here.


def index(request):
    return render(request, 'chat/index.html')


def convo(request):
    if request.method == 'POST':
        print(request.POST)
        sender = request.POST['From']
        reciever = request.POST['To']

        if 'messageText' in request.POST:
            messageText = request.POST['messageText']
            message = Message().setData(sender, reciever, messageText)

            message.save()

            return HttpResponse(True)

        else:
            chats = [
                {
                    'from': sender+":",
                    'message': 'Hey',
                },
                {
                    'from': reciever+":",
                    'message': 'Hello',
                },
            ]

            return render(request, 'chat/chat.html', {
                'from': sender,
                'to': reciever,
                'chats': chats,
            })

    form = LinkForm()
    return render(request, 'chat/head.html', {
        'form': form,
    })
