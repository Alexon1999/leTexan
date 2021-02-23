import string
from random import choices
from django.shortcuts import render, get_object_or_404
from rest_framework import generics, serializers, status
from .serializers import ClientSerializer, CommandeSerializer, PanierSerializer, Panier_menuSerializer
from .models import Commande, Panier, Panier_menu, Panier_produit, Client
from restaurant.models import Menu, Produit
from rest_framework.views import APIView
from rest_framework.response import Response
import stripe
# Create your views here.

# mettre en variable d'environnement
stripe.api_key = "sk_test_51IIvIiJnUZH8vWLUYv5UyL8c1xsuic2ukC0MrsaidKHLcroUAcLv9CE8Ufihgy1oHsNkag9GGQBYGkcNk7RI24Kr006AGZODjU"


class CreateClientSecret(APIView):
    def post(self, request):
        try:
            paymentIntent = stripe.PaymentIntent.create(
                amount=request.data.get('amount', 0),
                currency='eur', receipt_email=request.data.get('email')
            )
            return Response({"clientSecret": paymentIntent['client_secret']})
        except Exception as e:
            return Response({"error": str(e)})


class CommandeView(generics.ListAPIView):
    queryset = Commande.objects.all()
    serializer_class = CommandeSerializer


# class CommandeCreateView(generics.ListCreateAPIView):
#     queryset = Commande.objects.all()
#     serializer_class = CommandeSerializer


class PanierView(generics.ListAPIView):
    queryset = Panier.objects.all()
    serializer_class = PanierSerializer


class NouvelleCommande(generics.ListAPIView):
    queryset = Commande.objects.filter(est_vue=False, est_livre=False)
    serializer_class = CommandeSerializer


class CommandeEnCours(generics.ListAPIView):
    queryset = Commande.objects.filter(est_vue=True, est_livre=False)
    serializer_class = CommandeSerializer


class HistoriqueCommande(generics.ListAPIView):
    queryset = Commande.objects.filter(
        est_vue=True, est_livre=True).order_by('-date_commande')
    serializer_class = CommandeSerializer


class CommandeCreateView(APIView):
    serializer_class = CommandeSerializer

    def post(self, request, format=None):
        panier = Panier()
        panier.save()  # il faut un id pour les relation many to many

        menus = request.data.get('panier').get('menus')
        if menus != None:
            for menu_dict in menus:
                menu_id = menu_dict.pop('menu_id')
                menu = Menu.objects.get(id=menu_id)
                panier_menu = Panier_menu(
                    menu=menu, **menu_dict)
                panier_menu.save()
                panier.menus.add(panier_menu)

        produits = request.data.get('panier').get('produits')
        if produits != None:
            for produit_dict in produits:
                produit_id = produit_dict.pop('produit_id')
                produit = Produit.objects.get(id=produit_id)
                panier_produit = Panier_produit(
                    produit=produit, **produit_dict)
                panier_produit.save()
                panier.produits.add(panier_produit)

        # print(panier.menus.all())

        client = Client.objects.create(**request.data.get('client'))

        while True:
            code = ''.join(
                choices(string.ascii_uppercase + '0123456789', k=5))
            if Commande.objects.filter(reference=code).count() == 0:
                break

        commande = Commande.objects.create(
            panier=panier, client=client, commentaire=request.data.get('commentaire'), prix_totale=request.data.get('prix_totale'), reference=code)
        return Response(self.serializer_class(commande).data, status=status.HTTP_201_CREATED)

# class Panier_itemView(generics.ListAPIView):
#     queryset = Panier_item.objects.all()
#     serializer_class = Panier_itemSerializer


class UpdateCommande(APIView):
    serializer_class = CommandeSerializer

    def put(self, request):
        commande_id = request.data.get('id')
        commande = get_object_or_404(Commande, id=commande_id)
        commande.est_vue = request.data.get('est_vue', commande.est_vue)
        commande.est_livre = request.data.get('est_livre', commande.est_livre)
        commande.save(update_fields=['est_livre', 'est_vue'])
        return Response(status=status.HTTP_204_NO_CONTENT)
