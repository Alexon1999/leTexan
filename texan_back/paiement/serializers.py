from rest_framework import serializers
from .models import Commande, Panier, Panier_produit, Panier_menu, Client

from restaurant.serializers import ProduitSerializer, MenuSerializer


# class Panier_itemSerializer(serializers.ModelSerializer):
#     produit = ProduitSerializer()
#     menu = MenuSerializer()

#     class Meta:
#         model = Panier_item
#         fields = ["id",
#                   "menu",
#                   "produit",
#                   "quantite",
#                   ]


class Panier_menuSerializer(serializers.ModelSerializer):
    menu = MenuSerializer()

    class Meta:
        model = Panier_menu
        fields = ["id",
                  "menu",
                  "quantite"
                  ]


class Panier_produitSerializer(serializers.ModelSerializer):
    produit = ProduitSerializer()

    class Meta:
        model = Panier_produit
        fields = ["id",
                  "produit",
                  "quantite"
                  ]


class PanierSerializer(serializers.ModelSerializer):
    # panier_items = Panier_itemSerializer(many=True)
    menus = Panier_menuSerializer(many=True)
    produits = Panier_produitSerializer(many=True)

    class Meta:
        model = Panier
        fields = ["id",
                  #   "panier_items",
                  "menus",
                  "produits"
                  ]


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ["id",
                  "nom",
                  "prenom",
                  "email",
                  "telephone",
                  "telephone",
                  "adresse",
                  "ville",
                  "code_postale",
                  ]


class CommandeSerializer(serializers.ModelSerializer):
    panier = PanierSerializer()
    client = ClientSerializer()

    class Meta:
        model = Commande
        fields = ["id",
                  "date_commande",
                  "panier",
                  "commentaire",
                  "client",
                  "prix_totale",
                  "est_vue",
                  "est_livre",
                  "reference"
                  ]

    # def create(self, validated_data):
    #     panier_data = validated_data.pop('panier')
    #     panier = Panier.objects.create(**panier_data)
    #     client_data = validated_data.pop('client')
    #     client = Client.objects.create(**client_data)
    #     commande = Commande.objects.create(
    #         **validated_data, panier=panier, client=client)
    #     return commande
