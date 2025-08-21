from django.db import models

# Create your models here.

class Product(models.Model):
    
    CATEGORY_CHOICES = [
        ("Electronics", "Electronics"),
        ("Furniture", "Furniture"),
        ("Apparel", "Apparel"),
    ]
    
    id=models.AutoField(primary_key=True)
    name = models.CharField(max_length=250)
    description = models.TextField(blank=True,null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    brand = models.CharField(max_length=100)
    category= models.CharField(max_length=100,choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name