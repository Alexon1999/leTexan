from rest_framework import serializers
from .models import Produit, Ingredient, Ingredient_info, Menu, Categorie


class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = ["id",
                  "nom",
                  "libelle",
                  ]


class ProduitSerializer(serializers.ModelSerializer):
    categories = CategorieSerializer(many=True)

    class Meta:
        model = Produit
        fields = ["id",
                  "nom",
                  "description",
                  "prix",
                  "ingredients",
                  "categories",
                  "image_url",
                  ]


class Ingredient_infoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient_info
        fields = ["id",
                  "description"
                  ]


class IngredientSerializer(serializers.ModelSerializer):
    ingredient_info = Ingredient_infoSerializer()

    class Meta:
        model = Ingredient
        fields = ["id",
                  "ingredient_info"
                  ]


class MenuSerializer(serializers.ModelSerializer):
    produits = ProduitSerializer(many=True)
    categories = CategorieSerializer(many=True)

    class Meta:
        model = Menu
        fields = ["id",
                  "nom",
                  "description",
                  "image_url",
                  "prix",
                  "produits",
                  "categories"
                  ]
