from django.db import models

# Create your models here.


class Ingredient_info(models.Model):
    description = models.TextField(null=True)

    def __str__(self):
        return self.id


class Ingredient(models.Model):
    nom = models.CharField(max_length=50)
    ingredient_info = models.ForeignKey(
        Ingredient_info, on_delete=models.CASCADE)

    def __str__(self):
        return self.nom


class Categorie(models.Model):
    nom = models.CharField(max_length=50)
    libelle = models.CharField(max_length=50, null=False, blank=False)

    def __str__(self):
        return self.libelle


class Produit(models.Model):
    nom = models.CharField(max_length=20, unique=True)
    description = models.TextField(null=True, blank=True)
    image_url = models.CharField(max_length=2048)
    prix = models.FloatField(default=0)
    # categorie = models.ForeignKey(
    #     Categorie, on_delete=models.SET_NULL, null=True)
    categories = models.ManyToManyField(Categorie, blank=True)
    ingredients = models.ManyToManyField(Ingredient, blank=True)

    # self.ingredients.add(ing1 , ing2 etc)
    # self.ingredients.remove(ing1)
    # self.ingredients.all()

    def __str__(self):
        return self.nom

    def aff_categories(self):
        return ', '.join(categ.nom for categ in self.categories.all())


class Menu(models.Model):
    nom = models.CharField(max_length=20, unique=True)
    description = models.TextField(null=True, blank=True)
    image_url = models.CharField(max_length=2048)
    prix = models.FloatField(default=0)
    produits = models.ManyToManyField(Produit)
    # categorie = models.ForeignKey(
    #     Categorie, on_delete=models.SET_NULL, null=True)
    categories = models.ManyToManyField(Categorie, blank=True)

    def __str__(self):
        return self.nom

    def aff_categories(self):
        return ', '.join(categ.nom for categ in self.categories.all())
