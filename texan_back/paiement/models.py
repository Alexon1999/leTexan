from django.db import models
from restaurant.models import Menu, Produit
# Create your models here.
from functools import reduce


# class Panier_item(models.Model):
#     quantite = models.IntegerField()
#     menu = models.ForeignKey(
#         Menu, null=True, on_delete=models.SET_NULL, blank=True)
#     produit = models.ForeignKey(
#         Produit, null=True, on_delete=models.SET_NULL, blank=True)

#     def isMenuOrProduit(self):
#         if self.menu:
#             return self.menu

#         return self.produit

#     def __str__(self):
#         return str(self.id)

#     def totale(self):
#         return round(self.menu.prix * self.quantite if self.menu else self.produit.prix*self.quantite, 2)


class Panier_menu(models.Model):
    quantite = models.IntegerField()
    menu = models.ForeignKey(
        Menu, null=True, on_delete=models.SET_NULL, blank=True)

    def __str__(self):
        return str(self.menu.nom)

    def totale(self):
        return round(self.menu.prix * self.quantite, 2)


class Panier_produit(models.Model):
    quantite = models.IntegerField()
    produit = models.ForeignKey(
        Produit, null=True, on_delete=models.SET_NULL, blank=True)

    def __str__(self):
        return str(self.produit.nom)

    def totale(self):
        return round(self.produit.prix * self.quantite, 2)


class Panier(models.Model):
    # id = models.AutoField(primary_key=True)
    # panier_items = models.ManyToManyField(Panier_item)
    produits = models.ManyToManyField(Panier_produit, blank=True)
    menus = models.ManyToManyField(Panier_menu, blank=True)

    def __str__(self):
        return str(self.id)

    def totale(self):
        return round(reduce(lambda acc, item: acc + item.totale(), self.produits.all(), 0) + reduce(lambda acc, item: acc + item.totale(), self.menus.all(), 0), 2)


class Client(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    email = models.EmailField()
    telephone = models.CharField(max_length=20)
    adresse = models.CharField(max_length=250)
    ville = models.CharField(max_length=32)
    code_postale = models.CharField(max_length=32, null=False)

    def __str__(self):
        return self.nom + ' ' + self.prenom


class Commande(models.Model):
    # code = models.CharField(
    #     max_length=5, default=generate_code,  blank=True, unique=True, null=True)
    date_commande = models.DateTimeField(auto_now_add=True)
    commentaire = models.TextField(null=True, blank=True)
    client = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True)
    panier = models.ForeignKey(Panier, on_delete=models.CASCADE, null=True)
    prix_totale = models.FloatField(default=0.0)
    est_vue = models.BooleanField(default=False)
    est_livre = models.BooleanField(default=False)
    reference = models.CharField(
        default='', max_length=5, null=True)

    def __str__(self):
        return str(self.id)

    def totale(self):
        return self.panier.totale()
