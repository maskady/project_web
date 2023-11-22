Exercice 3:
Les différents attributs d'une annonce sur le site ORPI BREST sont :
nb_pieces : Nombre de pièces,
prix : loyer en euros par mois (charge comprise)
surface : Surface,
nb_bain : Nombre de salle de bain/eau
t_sejour : Taille du séjour
ascenseur : Présence ascenseur ou non
cuisine : Cuisine équipée ou non
interphone : Présence interphone ou non
digicode : Présence digicode ou non
terrasse : Présence terrasse ou non
parking : Présence garage ou non
date_creation : Date de création
nb_etages : Nombre d'étages 
conso_energie : Consommation énergétique
emission_gaz : Emission de gaz

Pour le fichier XML, on prendra comme convention : la présence d'un élément par 1, et son absence par 0.

Pour le fichier XML : "admins.xml" 
Les logins possible sont : 
{
    admin1@gmail.com
    root1
}
{
    admin2@gmail.com
    root2
}
{
    admin3@gmail.com
    root3
}

Sur la page Administrateur, dans les filtres, il est nécéssaire d'appuyer 2 fois sur les boutons pour que l'affichage le prenne en compte (erreur non résolu)
Idem sur la page utilisateur (utilisation des mêmes fonctions légèrement modifiés)

Mise en valeur de certains éléments :
-Format mobile permet d'afficher un menu de navigation hamburger 
-Hash du mot de passe
-Vérification du passage par login.html lors du chargement de gestion.html. Si suppression des informations de connexion dans les clés URL, redirection vers la page d'accueil
-Edition des biens dans le tableau
-Si suppression de beaucoup de bien, la pagination est mise à jour
-Si ajout de beaucoup de bien, la pagination est mise à jour 
-Recherche possible avec ElasticLunr. Exemple avec "appartement"
-Page d'estimation d'un bien
    -Calcul effectué à partir des prix au m2 en fonction des arrondissements en 2021
    -L'estimation est majoré si c'est une maison
    -L'estimation est majoré si dernier ou avant dernier étage de l'immeuble
    -L'estimation est minoré si rez de chaussée

