from rest_framework.decorators import api_view
import requests
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Ingredient
from .serializers import IngredientSerializer
from django.utils import timezone
from datetime import date
from rest_framework import status
import json

#Get the list of available ingredients
@api_view(['GET', 'POST'])
def ingredient_list(request):
    if request.method == 'GET':
        ingredients = Ingredient.objects.all()
        serializer = IngredientSerializer(ingredients, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        # Check for duplicate ingredient name
        existing_ingredient = Ingredient.objects.filter(name=request.data['name']).first()
        if existing_ingredient:
            # If an ingredient with the same name already exists, return a validation error
            return Response({"name": "Ingredient with this name already exists."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = IngredientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            ingredients = Ingredient.objects.all()
            serializer = IngredientSerializer(ingredients, many=True)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

#Perform CRUD operation for ingredients table
@api_view(['GET', 'PUT', 'DELETE'])
def ingredient_detail(request, pk):
    try:
        ingredient = Ingredient.objects.get(pk=pk)
    except Ingredient.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        serializer = IngredientSerializer(ingredient)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = IngredientSerializer(ingredient, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    elif request.method == 'DELETE':
        ingredient.delete()
        ingredients = Ingredient.objects.all()
        serializer = IngredientSerializer(ingredients, many=True)
        return Response(serializer.data,status=200)

#Extract cocktail data from Nexible API
def get_cocktail_data(request):
    api_url = "https://us-central1-nexible-code.cloudfunctions.net/cocktails"
    try:
        response = requests.get(api_url)
        if response.status_code == 200:
            data = json.loads(response.content)
            return JsonResponse(data, safe=False)
        else:
            return JsonResponse({"error": "Request to external API failed"}, status=500)
    except requests.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)

#Show list of cocktails that can be prepare with our available ingredients
@api_view(['GET', 'POST'])
def show_available_cocktails(request):
    if request.method == 'GET':
        try:
            cocktails_data = get_cocktail_data(request)

            # Decode the bytes content to a string using UTF-8 encoding
            content_str = cocktails_data.content.decode('utf-8')
            data = json.loads(content_str)

            today = date.today()
            # Filter ingredients where expiry_date is greater than today
            ingredients = Ingredient.objects.filter(expiry_date__gt=today)

            # Get the valid list of Ingredient names
            available_ingredient_names = ingredients.values_list('name', flat=True)

            valid_cocktails = []
            for cocktail in data:
                required_ingredients = set(cocktail['ingredients'])
                available_set = set(available_ingredient_names)

                # Check if all required ingredients are available
                if required_ingredients.issubset(available_set):
                    valid_cocktails.append({'name': cocktail['name'], 'ingredients': cocktail['ingredients']})

            return JsonResponse(valid_cocktails, safe=False)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
