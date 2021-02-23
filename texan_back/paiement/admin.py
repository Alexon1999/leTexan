from django.contrib import admin

# Register your models here.
from .models import Panier, Commande, Panier_produit, Panier_menu, Client


# class Panier_itemAdmin(admin.ModelAdmin):
#     list_display = ('id', 'menu', 'produit', 'quantite', 'totale')


class Panier_ProduitAdmin(admin.ModelAdmin):
    list_display = ('id', 'produit', 'quantite', 'totale')


class Panier_MenuAdmin(admin.ModelAdmin):
    list_display = ('id', 'menu', 'quantite', 'totale')


class CommandeAdmin(admin.ModelAdmin):
    list_display = ('id', 'date_commande', 'panier', 'totale')


class PanierAdmin(admin.ModelAdmin):
    list_display = ('id', 'totale')


admin.site.register(Panier, PanierAdmin)
# admin.site.register(Panier_item, Panier_itemAdmin)
admin.site.register(Commande, CommandeAdmin)
admin.site.register(Panier_produit, Panier_ProduitAdmin)
admin.site.register(Panier_menu, Panier_MenuAdmin)
admin.site.register(Client)
