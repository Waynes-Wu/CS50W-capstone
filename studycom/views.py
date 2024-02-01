from django.http import response, HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
# Create your views here.
from django.db import IntegrityError
from .models import *
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.decorators import login_required
import datetime

@csrf_exempt
@login_required(login_url='/login')
def index(request):
    if request.method == 'GET':
        user = User.objects.get(username=request.user)
        
        dateLast = user.activities.last()
        
        last_studied = '-'
        if dateLast is not None:

            dateLast = dateLast.date
            # year month day
            dateToday = datetime.date.today()

            last_studied = ((dateToday - dateLast).days)

        return render(request, 'studycom/index.html',{
            'last_studied': last_studied,
            'history': Activities.objects.filter(user = user).order_by('-date')[:5] 
        })

    elif request.method == 'PUT':
        data = json.loads(request.body)
        data = data.get('sessionNumber')
        if data is not None:
            data = int(data)
            user = User.objects.get(username=request.user)
            act = Activities(user=user, duration = data)
            act.save()
            return response.JsonResponse({
                'message': f"saved"
            })


def login_view(request):
    if request.method == 'GET':
        return render(request, 'studycom/login.html')
    if request.method == 'POST':
        data = request.POST
        email = data['email']
        password = data['password']
        user = authenticate(request, username=email, password=password)

        if user is None:
            return render(request, 'studycom/login.html', {
            'error_message':'password does not match'
            })
        login(request, user)
        return redirect(reverse('index'))


def register(request):
    if request.method == 'GET':
        return render(request, 'studycom/register.html')


    if request.method == 'POST':
        data = request.POST
        email = data['email']
        password = data['password']
        confirm = data['confirm']

        if password != confirm:
            return render(request, 'studycom/register.html', {
                'error_message':'password does not match'
            })
        
        try:
            user = User.objects.create_user(email, email, password)
            user.save()
        except IntegrityError as e:
            print(e)
            return render(request, "studycom/register.html", {
                "error_message": "Email address already taken."
            })
        login(request, user)
        return redirect(reverse('index'))

def logout_view(request):
    logout(request)
    return redirect(reverse('index'))

@login_required(login_url='/login')
def cards(request):
    if request.method == 'GET':
        user = User.objects.get(username = request.user)
        cards = user.cards.all().order_by('reviewedDate')
        return render(request, 'studycom/cards.html',{
            'cards':cards
        })
    elif request.method == 'POST':
        data = request.POST
        if data.get('acronym') is None:
            return HttpResponse('error encountered')
        if data.get('def') is None:
            return HttpResponse('error encountered')

        acro = data.get('acronym')
        desc = data.get('def')

        newCard = Cards(user = User.objects.get(username = request.user), acronym = acro, definition = desc)
        newCard.save()
        return redirect(reverse('flashcards'))
    elif request.method == 'PUT':
        user = User.objects.get(username=request.user)
        data = json.loads(request.body)
        acro = data.get('acronym')
        if data is not None:
            card = Cards.objects.get(user=user, acronym = acro)
            card.save()
            return response.JsonResponse({
                'message': f"card was saved {card.reviewedDate}"
            })
        else:
            return response.JsonResponse({
                'message':f'failed to update'
            })

