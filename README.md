# Openclassrooms Projet 7 BACK END du réseau social de la société Groupomania

L'application est un MVC du réseau social interne à la société Groupomania, elle permet aux utilisateurs de publier des photos et de commenter les publications des autres 

## Prérequis

Le projet est constitué de 2 parties distinctes à cloner
La partie présente frontend
La partie backend

## Pour démarrer le projet

Vous devez créer un fichier '.env' à partir de la racine dans un dossier 'config'.  

Veuillez y initialiser les variables suivantes:

- PORT= *( le port de votre serveur )*
- DB= *(votre fichier sqlite sous la forme 'sqlite:nom_de_votre_bdd')

- JWT_SECRET= *( avec votre clef secrete entre "" )*
- BCRYPT_SECRET= *( avec votre clef secrete entre "" )*
- BCRYPT_SALT_ROUND= *( donnez un nombre )*
- BCRYPT_SALT= *( avec votre clef secrete entre "" )*

- COOKIE_SECRET= *( avec votre clef secrete entre "" )*


Lancer le server avec npm start dans votre terminal.

## Techno

Node js, javascript, Sequelize

## Type de base de donnée

SQL 