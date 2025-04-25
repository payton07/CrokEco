/*
== Introduction
1-2 pages

- Présenter le problème étudié et le contexte dans lequel le projet se positionne.
- Motiver l’intérêt du problème étudié par rapport à votre parcours d’études et au monde de l’informatique.
- Présenter les différentes approches possibles pour la résolution du problème, et en particulier celle choisie.
- Donner le cahier des charges détaillé

1.
L'écologie c'est important, il faut magez sans poluer. Mais comment savoir quels plats ne poluent pas. 

2.
Le portable est une solution rapide pour aider les gens à se sensibiliser sur l'écologie. Creer une application dans ce but permet d'allier l'ecologie a l'informatique.

3.
Approche 1 : Demander au restaurateur d'afficher l'impact ecologique des plats, en lui aidant grace a l'informatique à calculer rapidement et à afficher simplement le résultat. Deja essaye l'annee derniere mais le restaurateur pas content !

Approche 2 : Afficher sur les televiseurs du crous l'impact écologique de chaque plat.

Approche 3 : Se servir des bases de données déjà existante pour calculer l'impact et deployer une application coloboratives ou chaque utilisateurs reseigne la quatité des ingredients pour un plats. La recette est enregistrer et lorsque l'on scanne un menu l'appli renvoie l'impact écologique de chaque plats.

4.
Le but est de créer une application permettant de devoiler l'impact écologique de tous les plats que l'on scanne sur un menu dans un restaurant.

Outils :
- Android studio (pour télécharger la SDK android)
- React Native
- Expo
- Figma pour le design
- A completer...


== Développements Logiciel : Conception, Modélisation, Implémentation
/*8 à 15 pages

Il se peut que la conception du logiciel (3) et l’analyse algorithmique (4) aient un poids différent dans votre projet. Les points décrits ci-dessous seront ainsi plus ou moins développés en fonction du travail réalisé en accord avec l’encadrant.
1. Présenter les développements logiciel réalisés dans le cadre du projet.
2. Présenter les principaux modules du logiciel développé dans le cadre du projet. Utiliser le langage UML pour la modélisation : donner le diagramme de cas d’utilisation et le diagramme des classes.
3. Décrire les fonctionnalités de l’interface graphique implémentée (si votre logiciel dispose d’une interface graphique).
4. Décrire le format des données en entrée ou encore les conventions utilisées pour les entrées de vos programmes. Décrire les procédures de lecture et validation des entrées.
5. Statistiques : nombre de modules/composantes/classes/scripts développés. Nombre de lignes de code.*/




== Algorithmes et Structures de Données
2 à 3 pages

1. Présenter les principales structures de données définies dans le cadre du projet.
2. Présenter les principaux algorithmes implémentés. En illustrer le fonctionnement avec des exemples. Attention : il s’agit ici de choisir 1 ou 2 algorithmes intéressants, et non pas de présenter tous les algorithmes implémentés.
3. Évaluer la complexité théorique en temps des algorithmes présentés

== Analyse des résultats
2 à 4 pages

L’analyse expérimentale sera faites dans cette section. Elle sera plus ou moins importante
dans votre projet comme pour les deux points précédent, cette section devra donc être développée en
conséquence.
1. Illustrer les performances ainsi que l’efficacité du logiciel implémenté à l’aide de graphiques.
2. Analyser (et comparer, si plusieurs) les performances des solutions implémentées.
3. Présenter les bancs d’essais (ou les procédures utilisées pour la génération des données) utilisés
pour les tests du logiciel.

== Gestion du Projet
1-2 pages

1. Présenter la gestion du projet et les documents de planification rédigés (par exemple, le diagramme
de Gantt).
2. Discuter les changements majeurs effectués en cours de projet.

== Bilan et Conclusions*/

RAPPORT DE STAGE


#pagebreak()

= Remerciement (Si nécessaire)

#pagebreak()

#show outline.entry.where(
  level: 1
): set block(above: 1.2em)

#outline()

#pagebreak()

= Introduction

Nous réalisons ce projet dans le cadre de notre 3e en Licence Informatique. Le projet a débuté en décembre 2024 et nous a accompagné tout au long de notre 2e semestres. Ce projet s'incrit dans la continuité de celui commencé l'année précedente par des étudiants de Cursus Master en Ingénierie (CMI) Informatique en 3e année. Le sujet que nous avons choisi est celui de Monsieur Bourreau. Le but du projet est de créer une application permettant de noté l'impact écologique avec une couleur. Celle-ci peut etre de couleur Verte, Orange ou Rouge respectivement d'une empreinte carbonne faible a élevé.

Ce projet a été réalisé avec KEGLO Patrice, BARATAY Mallory et PHILIPOT Ewen. PHILIPOT Ewen ayant arreté la Licence avant les vacances de février nous avons réalisé la majeur partie du projet à deux. 

#pagebreak()

= Spécification du sujet

== Enjeux climatiques
Selon l'INSEE, en 2018, l'alimentation representé 22% de l'empreinte carbonne de la France.
Que ce soit lié au transport de la nourriture, à l’élevage des animaux, à la quantité d’eau utilisée tout au long de la production, il y a beaucoup de facteurs polluants pour amener la nourriture dans nos assiettes. Une majorité de la population n’est pas informée sur ce sujet et ne pense pas à l’impact que sa nourriture a sur la planète.

== Approche du sujet
De nos jours la problematique de l'ecologie et tres importante. Afin d'aider la population a faire des geste ecologique il est important de lui donner les outils permettant de comprendre. La nourrriture et une source tres importante de la production de CO2 mondial. La composition d'un plat influt enormement sur cette production. Lorsque l'on va au restaurant et que nous ne savons pas quoi manger, un bon reflex pourrait etre de choisir en fonction de l'imapct ecologique d'un plat.
Afin de pallier a ce problème nous avons imaginé plusieurs solition : 

Approche 1 : Demander au restaurateur d'afficher l'impact ecologique des plats, en lui aidant grace a l'informatique à calculer rapidement et à afficher simplement le résultat. Deja essaye l'annee derniere mais le restaurateur pas content !

Approche 2 : Afficher sur les televiseurs du crous l'impact écologique de chaque plat.

Le problème des 2 approches précédentes est quelle nécessite l'accord du restaurateur pour se mettre en place et de plus elle ne peut pass etre généraliser a tous les restaurant de France.

Approche 3 : Se servir des bases de données déjà existante pour calculer l'impact et deployer une application coloboratives ou chaque utilisateurs reseigne la quatité des ingredients pour un plats. La recette est enregistrer et lorsque l'on scanne un menu l'appli renvoie l'impact écologique de chaque plats.

Le but de cette derniere methode est de permettre a tout le monde de participer a amielorer l'ecologie en redant l'application collaborative. Cette méthode peut fonctionner dans n'importe quelle restaurant traditionnel et peut etre étendu au self et cantine scolaire.

== Cahier des charges

#pagebreak()

= Gestion du projet

*DIAGRAMME DE GANTT*

#pagebreak()

= Choix technique

#pagebreak()

= Architectures

== Modele Statique

== Architectures de l'application

#pagebreak()

= Application

== Base de donnée

Afin de connaotre l'impact ecologique d'un plat nous avons choisi dans un premier temps de se servir de la base de donnée fournie par l'ADEME. La base de l'ADEME sur la consommation CO2 est une immense base regroupant tout les types d'emission de gaz à effet de serre tel que la production de materiaux, ..., ainsi que toute les emissions liee au CO2. En inspectant la base de données nous avons découvert que toutes les information liée à la nourriture provenait de 2 base de donnée qui sont AGRYBALISE et AGRYBALISE 2.0. AGRIBALYSE est un programme collectif et innovant qui met à disposition des données de référence sur les impacts environnementaux des produits agricoles et alimentaires à travers une base de données construite selon la méthodologie des Analyses du Cycle de Vie. Il est possible de se servir du site web d'agrybalise pour connaitre l'imapct environnemental d'un aliment ou bien de télécharger leur base de donnée. Nous avons donc télécharger la base de données concernant dans un premeir temps uniquement les plats ayant nécessité une transformation. Cette base de donnée etait disponible au format CSV. Afin de traiter de rendre les donnée utilisable nous avons creer un programme python servant à initialiser une base de donnee en sql comportant tous les plats décrit dans le CSV.
Le CSV etait cinstruit de la maniere suivante : par plat enregistrer il y avait une ligne pour chaque ingredient. Cela signifie qu'on retrouve l'imapct écologique d'un ingredient pour que dans chaque plats comportant cette ingredient, mais l'impact différé en fonction de la proportion de cette aliment dans le plat.
En analysant plus precisement nos besoin nous avons remarqué qu'il manqué trop de plats dans la base de donnée actuel. Afin de pallier a ce probleme nous avons changé une nouvelle fois de base de donnée pour prendre finalement celle comportant uniquement les ingredients avec l'imapct associé par kilo d'aliment.
Pour connaitre l'imapct ecologique d'un plat, on doit donc realisé la somme de l'imapct de chaque plat et faire un produit en croix pour le ramener à un kilo de plat.
Pour connaitre le poids de chaque aliment dans un plat et pour remplir la table sql des plat nous avons choisi de faire confiance au utilisateur de l'application. Une page de l'application permet d'enregistrer la composition d'un plat. Chaque plat nouvellement creer peut etre voter par un utilisateur afin d'etre ajouter par nous à la base de donnée comportant tous les plats.

=== Conception

=== Modelisation

== Application utilisateur

=== Modélisation

=== Implémentation

== Statistiques


#pagebreak()

= Algorithmes (Si il y en a 1 ou 2 d'intéressants)


#pagebreak()

= Conclusion


#pagebreak()

= Bibliographie

