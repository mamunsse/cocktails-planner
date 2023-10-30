from django.db import models

# Create your models here.

class Ingredient(models.Model):
    name = models.CharField(max_length=100)  # Name of the ingredient, e.g., "Tequila"
    is_alcoholic = models.BooleanField(default=False)  # Boolean field to indicate if the ingredient is alcoholic
    expiry_date = models.DateField(null=True, blank=True)  # Expiry date of the ingredient! Expiry ingredient should not be served!

    def __str__(self):
        return self.name
