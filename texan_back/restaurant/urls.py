from django.urls import path

from . import views

app_name = 'restaurantApi'


urlpatterns = [
    # /restaurant/carte
    path('carte/', views.CarteView.as_view()),
    #     path('carte/menus/', views.MenusView.as_view()),
    path('carte/<str:categorie>/',
         views.ProduitsCategorieView.as_view()),
    path('carte/<str:categorie>/<int:id>/',
         views.CategorieToProduitsDetailsView.as_view()),
    path('produit/', views.ProduitView.as_view()),
    path('produit/<int:pk>/', views.ProduitDetailsView.as_view()),
    path('menu/<int:pk>/', views.MenuDetailsView.as_view()),
]
