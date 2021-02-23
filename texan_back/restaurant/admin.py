from django.contrib import admin

from .models import Produit, Ingredient, Ingredient_info, Menu, Categorie


class ProduitAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom', 'prix', 'aff_categories')


class CategorieAdmin(admin.ModelAdmin):
    list_display = ('id', 'libelle')


class MenuAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom', 'prix', 'aff_categories')


# Register your models here.
admin.site.register(Categorie, CategorieAdmin)
admin.site.register(Produit, ProduitAdmin)
admin.site.register(Menu, MenuAdmin)
admin.site.register(Ingredient)
admin.site.register(Ingredient_info)
