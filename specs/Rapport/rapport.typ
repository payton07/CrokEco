#import "@preview/modern-report-umfds:0.1.2": umfds


#show : umfds.with(lang: "fr", title: "Crok'eco
Projet de Programmation 2", authors: ("BATATAY Mallory
KEGLO Partice",), abstract: "Crok'eco est une application collaborative permettant à chacun de s'informer sur l'imapct écologique d'un plat.", date: "2024 - 2025", department: [Informatique], img: image("Images/logo_vf.png", width: 60%))

#text(1.5em)[*Remerciement*]

Nous tenons à exprimer notre sincère gratitude envers toutes les personnes qui ont contribué à la
réussite de ce projet. Leur soutien et leur encadrement ont été d'une importance capitale tout au long de la création de cette application.

Nous souhaitons exprimer nos sincères remerciements à M. Eric Bourreau pour nous avoir permis de travailler sur ce sujet. Sa confiance et son soutien nous ont permis de le réaliser avec succès. Nous lui sommes reconnaissant pour cette opportunité qui nous a permis d'acquérir une expérience en génie logiciel.

Nous souhaitons tout particulièrement remercier Ewen PHILIPOT, pour nous avoir aider à initier le projet malgré qu'il soit parti au cours de cette année  scolaire. Ses connaissances approfondies nous ont permis d'avoir une base solide pour l'application.

Je tiens également à exprimer ma gratitude envers Mme Elisabeth BAERT, responsable de la licence 3 Informatique, pour nous avoir permis de réaliser ces projets durant le second semestre. 

Enfin, j'aimerais remercier chaleureusement toutes les personnes qui m'ont aidé dans la création de l'application ainsi que dans la rédaction de ce rapport et qui ont relu ce dernier. Leur soutien et leurs précieux commentaires ont grandement amélioré la qualité de ce travail.


#pagebreak()

#show outline.entry.where(
  level: 1
): set block(above: 1.2em)

#outline(title: "Table des matières")

#pagebreak()

= Introduction

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

Cette solution avait déjà était enviqagé l'année derniere mais sans succès car, comme la première, elle possède un problème. En effet, elle nécessite un accord avec les gérant des restaurant qui sont assez retissant a voir l'impact écologique de leurs plats révélé. De plus, mais s'il avait était possible d'avoir l'accord pour les restaurants de la Faculté des Sciences, ces solutions demanderait énormement d'effort pour etre deployer à l'echelle de la France Car il nécessiterait l'accord de chaque restaurants. 

Nous avons donc choisi de faire une application collaborative qui calcule l'impact écologique de tous les plats en scannant leurs noms sur le menu. Le but de cette derniere methode est de permettre a tout le monde de participer a amielorer l'ecologie en rendant l'application collaborative. Cette méthode peut fonctionner dans n'importe quelle restaurant traditionnel et peut etre étendu au self et cantine scolaire.



= Gestion du projet

Le projet c'est déroulé en autour 4 étapes qui ont été la base de données, le dévellopement des fonctionnalités de l'application, la création du serveur distant et enfin le design de l'application.

Globalement, le temps estimé pour chaque étapes du projet a été respecté selon nos prévisions, à part pour la base données que nous du retravaillé au cours du projet a cause de changement imprévu.

#figure(image("Images/Diagramme de Gantt.png"), caption: "Diagramme de Gantt")

#pagebreak()

= Choix technique

Le développement de l’application a été réalisé en TypeScript, un sur-ensemble typé de JavaScript, afin de bénéficier d’un typage statique, d’une meilleure lisibilité du code et d’une maintenance facilitée.

Nous avons utilisé le framework React Native, couplé à Expo, pour accélérer le processus de développement multi-plateformes (Android et iOS).
Outils et bibliothèques principaux :
- Pandas(Python) pour la gestion de données en CSV

L’application a été testée à la fois sur simulateurs Android via Android Studio et sur appareils physiques pour s’assurer d’une bonne compatibilité et d’une expérience utilisateur fluide.

Nous avons utilisé GitHub comme plateforme de gestion de version tout au long du projet afin de collaborer efficacement, et d'avoir un historique clair des modifications. Les branches ont été utilisées pour séparer le dévellopement des différentes fonctionnalités, ce qui a facilité l’intégration progressive des différentes parties de l’application dans la branche principale.

Les données que nous utilisons pour notre base donné proviennte toutes du programme de collecte de données AGRIBALYSE 2.0. 


= Architectures

== Modele Statique
A detailler
#figure(image("Images/Modele statique.png"))

== Architectures de l'application

#figure(image("Images/Architecture de l'application.png"), caption: "Architecture de l'application") <Architecture>

La @Architecture illustre l'architecture de notre application du point de vue de l'utilisateur.
L'application s'organise autour de la barre de recherche qui permet d'atteindre les 5 pages principales (Scan, Historique, Recherche, Votes, add). Ces 5 pages peuvent être redivisé en 2 catégories. Les pages permettant de rechercher et d'afficher la composition d'un plat et la partie permettant d'ajouterun plat à la base de données.

Dans la partie de recherche et d'affichage de plat on retrouve dans un premier temps la page scan(index). Cette page est la première qui s'ouvre lorsque l'on ouvre l'application. Elle a pour but de lancer l'analyse d'une image. Elle se compose de deux boutons. Le premier bouton, "Choisir une image", ouvre la médiathèque du téléphone pour que l'utilisateur sélectionne une image. Quand une image est choisit un menu s'ouvre pour proposé à l'utilisateur de modifier l'iamge en la rognant par exemple. Ensuite, l'image selectionné apparait sur la page scan. L'utilisateur peut ensuite appuyer sur le bouton analyser.  


#pagebreak()

= Application <app>

== Base de données <BDD>

=== Recherche <Recherchebdd>
Afin de connaitre l'impact ecologique d'un plat nous avons choisi dans un premier temps de se servir de la base de données fournie par l'ADEME. La base de l'ADEME sur la consommation CO2 est une immense base regroupant tout les types d'emission de gaz à effet de serre tel que celle du au textiles, à l'industrie ou autres, ainsi que toute les emissions liee à l'alimentation.

En inspectant la base de données nous avons remarqué que toutes les informations liée à la nourriture provenait de deux bases de données qui sont AGRIBALYSE et AGRIBALYSE 2.0. AGRIBALYSE est un programme collectif et innovant qui met à disposition des données de référence sur les impacts environnementaux des produits agricoles et alimentaires à travers une base de données construite selon la méthodologie des Analyses du Cycle de Vie. Il est possible de se servir du site web d'AGRIBALYSE pour connaitre l'impact environnemental d'un aliment ou bien de télécharger leur base de données.

Nous avons donc télécharger la base de données concernant dans un premier temps uniquement les plats ayant nécessité une transformation. Cette base de données etait disponible au format CSV. Afin de traiter de rendre les données utilisable nous avons coder un programme python servant à initialiser une base de données en sql comportant tous les plats décrit dans le CSV.

Le CSV etait construit de la maniere suivante : par plat présent dans la base, il y avait une ligne pour chaque ingredient. Cela signifie qu'on retrouve l'impact écologique d'un ingredient pour que dans chaque plats comportant cette ingredient, mais l'impact différé en fonction de la proportion de cette aliment dans le plat.
En analysant plus precisement nos besoin nous avons remarqué qu'il manqué trop de plats dans la base de données actuel. Afin de pallier a ce probleme nous avons changé une nouvelle fois de base de données pour prendre finalement celle comportant uniquement les ingredients avec l'impact associé par kilo d'aliment.
Pour connaitre l'impact ecologique d'un plat, on doit donc realisé la somme de l'impact de chaque plat et faire un produit en croix pour le ramener à un kilo de nourriture.

Pour connaitre le poids de chaque aliment dans un plat et pour remplir la table sql des plat nous avons choisi de faire confiance au utilisateur de l'application. Une page de l'application permet d'enregistrer la composition d'un plat *voir partie*. Chaque plat nouvellement creer peut etre voter par un utilisateur afin d'etre ajouter par les modérateurs à la base de données comportant tous les plats.

=== Modélisation <Modelisation>

Pour l'application nous avions besoin d'une base de données regroupant d'une part les informations du CSV fournit par AGRIBALYSE ainsi que les nouvelles données tel que les plats, les menus, etc...

#figure(image("Images/E_A.png"), caption: "Schéma du modèle Entité Association de la base de données final") <EA>

Nous avons donc défnini un modèle Entité-Association qui sert à initialiser notre base de données. La @EA représente les différentes tables que comporte la base ainsi que les liaison entre ces dernières.

Après avoir modéliser les deux bases de données, on rédige leur structure dans un fichier .sql qui servira pour leurs implémentations (voir @Implémentation).

=== Implémentation <Implémentation>

Afin de convertir les données d'AGRIBALYSE dans notre base de données décrites dans la partie précedente, nous avons choisi de coder un programme Python. Le but du programme est de créer à partir de 0 la base de données.

Pour cela, on commence par créer le fichier qui contiendra la base de données. Ce fichier aura une extension .db et s'il était déjà existant, il est remplacé. Ensuite on importe le fichier .sql contenant l'agencement des tables décrit dans la partie Modélisation(voir @Modelisation). Cela permet d'initialiser toutes les tables mais elles sont encores vides.

Ensuite, il faut remplir trois tables avec les données fournies par AGRIBALYSE. Les tables à remplir sont les groupes, les sous-groupes et les ingredients. Les données sont dans un tableau Excel comportant plusieurs pages. On commence donc par extraire la bonne page du Excel. Après cela, on commence le remplissage des trois tables par celle des groupes à cause des contraintes de clé étrangère. Pour remplir la deuxième table, parce qu'on a besoin de la clé primaires de la tables des groupes qui viennent d'être ajouté à la base de données, on doit d'abord faire une requete à la base de données. On range les indices et le nom du groupe dans un dictionnaire. Avec les informations du tableau Excel, on associe le noms des sous-groupes avec l'indice de son groupe correspondant. Enfin on ajoute le dictionnaire résultant à la base de données. On recommence ensuite la meme opération afin d'associer les indices des sous-groupes avec les ingredients.

Ce programme permet à la fois de créer la base de données pour l'application de l'utilisateur et pour le serveur. La seule différence entre les deux tables et qu'on utilise pas le même fichier .sql.

Avec ce programme Python, si la base de données d'AGRIBALYSE venait à être mise à jour, il suffirait d'exucter le programme pour obtenir la nouvelle base. Une amélioration possible pour ce programme serait de récupérer les autres données des anciennes bases pour les rajouter aux nouvelles.

== Application utilisateur <userApp>

=== Analyse d'un menu <Scan>

=== Recherche <Recherche>

=== Ajout de plat et vote <add>

=== Design <design>
Nous avons commencé par faire des croquis de l'application sur figma afin de réflechir à quelle fonctinonalité nous allions implémenté. ...

== Fonctionnalités non implémenté

Malgré que l'application soit fonctionnel, plusieurs fonctinonalités non pas pu être implémenté. Ces fonctionnalités non pas été implementé par manque de temps, ou par lacune technique. Nous allons présenter les pistes les plus intéressantes sur lesquels nous pourrions travailler pour une future version de l'application.

Dans la première page du menu, nous souhaitions dans un premier que l'utilisateur puisse choisir entre prendre une photo directement dans l'application ou la séléctionné dans la galerie de son appareil.

Caméra
Localisation
Compte user
Amélioration des suggestions ~

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

