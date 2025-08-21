from django.db import models
from django.core.exceptions import ValidationError
from decimal import Decimal

# Create your models here.

def validate_name(value):
        if len(value)<2:
            raise ValidationError("Name is too short")
        return value
         
def validate_price(value):
    if value<0:
            raise ValidationError("price cannot be a negative number")
    return value

class Product(models.Model):
    
    CATEGORY_CHOICES = [
        ("Electronics", "Electronics"),
        ("Furniture", "Furniture"),
        ("Apparel", "Apparel"),
    ]
    
    id=models.AutoField(primary_key=True)
    name = models.CharField(max_length=250,validators=[validate_name])
    description = models.TextField(blank=True,null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2,validators=[validate_price])
    brand = models.CharField(max_length=100)
    category= models.CharField(max_length=100,choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name