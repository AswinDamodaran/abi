from rest_framework import serializers
from inventory.models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
    
    def validate_name(self,value):
        if len(value)<2:
            raise serializers.ValidationError("Name is too short")
        return value
         
    def validate_price(self,value):
        if isinstance(value, (int,float,Decimel)):
            raise serializers.ValidationError("price should be a number")
        else if value<0:
            raise serializers.ValidationError("price cannot be a negative number")
        return value
    
    