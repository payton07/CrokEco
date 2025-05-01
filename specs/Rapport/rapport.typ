#import "@preview/modern-report-umfds:0.1.2": umfds

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

#show : umfds.with(lang: "fr", title: "Crok'eco
Projet de Programmation 2", authors: ("BATATAY Mallory
KEGLO Partice",), abstract: "", date: "2024 - 2025", department: [Informatique], img: image("Images/logo_vf.png", width: 60%))

*Remerciement (Si nécessaire)*

#pagebreak()

#show outline.entry.where(
  level: 1
): set block(above: 1.2em)

#outline(title: "Table des matières")

#pagebreak()

*Introduction*

Nous réalisons ce projet dans le cadre de notre 3e en Licence Informatique. Le projet a débuté en décembre 2024 et nous a accompagné tout au long de notre 2e semestres. Ce projet s'incrit dans la continuité de celui commencé l'année précedente par des étudiants de Cursus Master en Ingénierie (CMI) Informatique en 3e année. Le sujet que nous avons choisi est celui de Monsieur Bourreau. Le but du projet est de créer une application permettant de noté l'impact écologique avec une couleur. Celle-ci peut etre de couleur Verte, Orange ou Rouge respectivement d'une empreinte carbonne faible a élevé.

Ce projet a été réalisé avec KEGLO Patrice, BARATAY Mallory et PHILIPOT Ewen. PHILIPOT Ewen ayant arrêté la Licence avant les vacances de février, nous avons réalisé la majeure partie du projet à deux. 

#pagebreak()

= Spécification du sujet

== Enjeux climatiques

Selon l'INSEE, en 2018, l'alimentation representé 22% de l'empreinte carbonne de la France. Que ce soit lié au transport de la nourriture, à l’élevage des animaux, à la quantité d’eau utilisée tout au long de la production, il y a beaucoup de facteurs polluants pour amener la nourriture dans nos assiettes. Une majorité de la population n’est pas informée sur ce sujet et ne pense pas à l’impact que sa nourriture à sur la planète.

Des solutions sont déjà présentes pour réduire l'émission de gaz à effet de serre qu'en notre nourriture. Effectivement, tous les aliments ne se valent en matière de pollution. Certains aliment tel que la viandes et le poisson ont un impact écologique bien plus important, que les fruits, légumes ou céréales. Le fait de consommer des produits de saison et locales permet aussi de réduire l'emission du à notre alimentation.

Entre 2009 et 2019, la quantité de viande consommée baisse de 5 % en France métropolitaine selon l'INSEE. On constate donc une volonté en France de vouloir consommer plus écologiquement et la demande concernant des applications permettant de se renseigner devient de plus en plus grande. On note également une augmentation de projets allant dans ce sens, que ce soit avec la nourriture mais également d’autres produits du quotidien comme les cosmétiques et les textiles qui sont des domaines eux aussi très polluants.


#figure(image("Images/repas.png", width: 80%), caption: "Emission de kg de CO2 en fonction du type de rapas 
Source: ADEME")


== Approche du sujet

Afin d'aider la population a faire des geste ecologique il est important de lui donner les outils permettant d'atteidre ses objectifs. La composition d'un plat étant la première cause de l'impact écologique du plat, il serait interessant de pouvoir etre informé sur l'empreinte écologique du plat que l'on souhaite mangé.
Afin de pallier a ce problème nous avons imaginé plusieurs solition : 

Afin de faire profiter une solution au étudiant dans un premier, il sreait possible de s'accorder avec le Crous ou les gérant des restaurants de la Faculté des Sciences pour faire afficher sur les televiseurs du crous l'impact écologique de chaque plat. L'affichage pourrait ce faire à l'aide d'une pastille de couleur.

Sinon, nous pourrions afficher le résultat à l'aide d'un QR Code. Le QR Code redirigerai vers une page qui détaillerai l'empreinte carbonne de chaque plat.

Cette solution avait déjà était enviqagé l'année derniere mais sans succès car, comme la première, elle possède un problème. En effet, elle nécessite un accord avec les gérant des restaurant qui sont assez retissant a voir l'imapct écologique de leurs plats révélé. De plus, mais s'il avait était possible d'avoir l'accord pour les restaurants de la Faculté des Sciences, ces solutions demanderait énormement d'effort pour etre deployer à l'echelle de la France Car il nécessiterait l'accord de chaque restaurants. 

Nous avons donc choisi de faire une application collaborative qui calcule l'imapct écologique de tous les plats en scannant leurs noms sur le menu. Le but de cette derniere methode est de permettre a tout le monde de participer a amielorer l'ecologie en rendant l'application collaborative. Cette méthode peut fonctionner dans n'importe quelle restaurant traditionnel et peut etre étendu au self et cantine scolaire.

/*== Cahier des charges

Le but de ce projet est de développer une application pour la cantine, qui permet d’afficher l’indice carbone des plats préparés et proposés. Comme le nutriscore fourni une échelle nutritionnelle (part de gras, de sucre et d’additifs) sur les aliments, l’indice carbone des plats fournit un équivalent carbone à la production du plat. Il s’inspire du bilan carbone et du nutriscore.
*/

#pagebreak()

= Gestion du projet

Le projet c'est déroulé en 3 étapes principale qui ont été la base de donnée, le dévellopement des fonctionnalités de l'application et enfin le design de l'application.

Globalement, le temps estimé pour chaque étapes du projet a été respecté selon nos prévisions, à part pour la base donnée que nous du retravaillé au cours du projet a cause de changement imprévu.

#figure(image("Images/Diagramme de Gantt.png"), caption: "Diagramme de Gantt")

#pagebreak()

= Choix technique

Le développement de l’application a été réalisé en TypeScript, un sur-ensemble typé de JavaScript, afin de bénéficier d’un typage statique, d’une meilleure lisibilité du code et d’une maintenance facilitée.

Nous avons utilisé le framework React Native, couplé à Expo, pour accélérer le processus de développement multi-plateformes (Android et iOS).
Outils et bibliothèques principaux :
- Pandas(Python) pour la gestion de donnée en CSV

L’application a été testée à la fois sur simulateurs Android via Android Studio et sur appareils physiques pour s’assurer d’une bonne compatibilité et d’une expérience utilisateur fluide.

Nous avons utilisé GitHub comme plateforme de gestion de version tout au long du projet afin de collaborer efficacement, et d'avoir un historique clair des modifications. Les branches ont été utilisées pour séparer le dévellopement des différentes fonctionnalités, ce qui a facilité l’intégration progressive des différentes parties de l’application dans la branche principale.

Les données que nous utilisons pour notre base donné proviennte toutes du programme de collecte de donnée AGRIBALYSE 2.0. 

#pagebreak()

= Architectures

== Modele Statique

UML
Entité association

== Architectures de l'application



#pagebreak()

= Application

== Base de donnée

=== Recherche
Afin de connaitre l'impact ecologique d'un plat nous avons choisi dans un premier temps de se servir de la base de donnée fournie par l'ADEME. La base de l'ADEME sur la consommation CO2 est une immense base regroupant tout les types d'emission de gaz à effet de serre tel que la production de materiaux, ..., ainsi que toute les emissions liee à l'alimentation.

En inspectant la base de données nous avons remarqué que toutes les informations liée à la nourriture provenait de 2 base de donnée qui sont AGRIBALYSE et AGRIBALYSE 2.0. AGRIBALYSE est un programme collectif et innovant qui met à disposition des données de référence sur les impacts environnementaux des produits agricoles et alimentaires à travers une base de données construite selon la méthodologie des Analyses du Cycle de Vie. Il est possible de se servir du site web d'AGRIBALYSE pour connaitre l'imapct environnemental d'un aliment ou bien de télécharger leur base de donnée.

Nous avons donc télécharger la base de données concernant dans un premier temps uniquement les plats ayant nécessité une transformation. Cette base de donnée etait disponible au format CSV. Afin de traiter de rendre les donnée utilisable nous avons coder un programme python servant à initialiser une base de donnee en sql comportant tous les plats décrit dans le CSV.

Le CSV etait construit de la maniere suivante : par plat enregistrer il y avait une ligne pour chaque ingredient. Cela signifie qu'on retrouve l'imapct écologique d'un ingredient pour que dans chaque plats comportant cette ingredient, mais l'impact différé en fonction de la proportion de cette aliment dans le plat.
En analysant plus precisement nos besoin nous avons remarqué qu'il manqué trop de plats dans la base de donnée actuel. Afin de pallier a ce probleme nous avons changé une nouvelle fois de base de donnée pour prendre finalement celle comportant uniquement les ingredients avec l'imapct associé par kilo d'aliment.
Pour connaitre l'imapct ecologique d'un plat, on doit donc realisé la somme de l'imapct de chaque plat et faire un produit en croix pour le ramener à un kilo de plat.
Pour connaitre le poids de chaque aliment dans un plat et pour remplir la table sql des plat nous avons choisi de faire confiance au utilisateur de l'application. Une page de l'application permet d'enregistrer la composition d'un plat. Chaque plat nouvellement creer peut etre voter par un utilisateur afin d'etre ajouter par nous à la base de donnée comportant tous les plats.

=== Modélisation

parler du modele E A

=== Implémentation

Afin de convertir les données d'AGRIBALYSE dans notre base de données décrites dans la partie précedente, nous avons choisi de coder un programme Python. Le but du programme est de créer à partir de 0 la base de données.
Pour cela, on commence par créer le fichier qui contiendra la base de données. Si celui existe déjà, il est remplacé. Ensuite on importe le fichier .sql contenant l'agencement des tables. Cela permet d'initialiser toutes les tanble mais a ce moment là celle ci sont encore vide.
Pour remplir la base de données on extrait les information du fichier Excel d'AGRIBALYSE.

Au moment de remplir la base de données il est important de respecter les contraintes de clé etrangere. Pour cela il est impératif de 
Programme python

== Application utilisateur

=== Modélisation
Nous avons commencé par faire des croquis de l'application sur figma afin de réflechir à quelle fonctinonalité nous allions implémenté. ...

=== Conception


=== Implémentation

== Fonctionnalités non implémenté

== Statistiques


#pagebreak()

= Algorithmes (Si il y en a 1 ou 2 d'intéressants)


#pagebreak()

= Conclusion


#pagebreak()

= Bibliographie

base ademe : #link("https://base-empreinte.ademe.fr/") \
site AGRIBALYSE : https://doc.agribalyse.fr/documentation \
2009/2019 : https://www.insee.fr/fr/statistiques/7728873?sommaire=7728903 \
22% : https://www.insee.fr/fr/statistiques/7728883?sommaire=7728903 \

#outline(
  title: [Tables des figures],
  target: figure,
)