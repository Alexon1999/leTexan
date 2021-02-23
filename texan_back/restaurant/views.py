from django.shortcuts import render
from rest_framework import generics, status
from .serializers import CategorieSerializer, IngredientSerializer, MenuSerializer, ProduitSerializer, Ingredient_infoSerializer
from .models import Produit, Ingredient, Ingredient_info, Menu, Categorie

from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

categories_produits = ['burgers', 'boissons',
                       'desserts', 'sides', 'poutines', 'entrees']


class CarteView(generics.ListAPIView):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer


class ProduitView(generics.ListAPIView):
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer


class CategorieToProduitsDetailsView(APIView):
    serializer_class = ProduitSerializer

    def get(self, request, *args, **kwargs):
        # + request.GET.get('categorie') : get the query strings ?etc=sijdi
        # + kwargs : for Url parameters a dictionary

        categorie = Categorie.objects.get(nom=kwargs['categorie'])
        produit = Produit.objects.get(categorie=categorie, id=kwargs['id'])
        return Response(self.serializer_class(produit).data, status=status.HTTP_200_OK)


# carte/<str:categorie>/
class ProduitsCategorieView(APIView):
    serializer_class = ProduitSerializer

    def get(self, request, *args, **kwargs):
        categorie = Categorie.objects.get(nom=kwargs['categorie'])
        # Menu.objects.filter(categories=categorie)
        # return Response({'menus': MenuSerializer(Menu.objects.filter(categories__id=categorie.id), many=True).data, 'produits': ProduitSerializer(Produit.objects.filter(categories__id=categorie.id), many=True).data})
        return Response(MenuSerializer(Menu.objects.filter(categories__id=categorie.id), many=True).data + ProduitSerializer(Produit.objects.filter(categories__id=categorie.id), many=True).data)


class ProduitDetailsView(generics.RetrieveAPIView):
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer


class MenuDetailsView(generics.RetrieveAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer


class MenusView(APIView):
    def get(self, request):
        return Response(MenuSerializer(Menu.objects.all(), many=True).data)
