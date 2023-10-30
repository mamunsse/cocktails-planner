from django.urls import path
from . import views

urlpatterns = [
    path('ingredients/', views.ingredient_list, name='ingredients'),
    path('ingredients/<int:pk>/', views.ingredient_detail, name='ingredient-detail'),
    path('available-cocktails', views.show_available_cocktails, name='available-cocktails'),
]
