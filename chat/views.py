from django.shortcuts import render

# Create your views here.


def index(request):
    return render(request, 'chat/index.html')


def convo(request):
    if request.method == 'POST':
        chats = [
            {
                'from': 'Chaitanya:',
                'message': 'Hey',
            },
            {
                'from': 'Neeraj:',
                'message': 'Hello',
            },
        ]

        return render(request, 'chat/base.html', context={
            'chats': chats,
        })

    return render(request, 'chat/base.html')
