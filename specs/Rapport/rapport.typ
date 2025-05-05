#import "@preview/modern-report-umfds:0.1.2": umfds
#import "@preview/wrap-it:0.1.1": wrap-content
// #let wi = "60pt" ;
// #let he = "150pt";

#show : umfds.with(lang: "fr", title: "Crok'eco
Projet de Programmation 2", authors: ("BATATAY Mallory
KEGLO Partice",), abstract: "Crok'eco est une application collaborative permettant à chacun de s'informer sur l'imapct écologique d'un plat.", date: "2024 - 2025", department: [Informatique], img: image("Images/logo_vf.png", width: 60%))

#text(1.5em)[*Remerciements*]

Nous tenons à exprimer notre sincère gratitude envers toutes les personnes qui ont contribué à la réussite de ce projet. Leur soutien et leur encadrement ont été d'une importance capitale tout au long de la création de cette application.

Nous souhaitons exprimer nos sincères remerciements à M. Eric Bourreau pour nous avoir permis de travailler sur ce sujet. Sa confiance et son soutien nous ont permis de le réaliser avec succès. Nous lui sommes reconnaissants pour cette opportunité qui nous a permis d'acquérir une expérience en génie logiciel.

Nous souhaitons tout particulièrement remercier Ewen PHILIPOT, pour nous avoir aidés à initier le projet malgré qu'il soit parti au cours de cette année scolaire. Ses connaissances approfondies nous ont permis d'avoir une base solide pour l'application.

Je tiens également à exprimer ma gratitude envers Mme Elisabeth BAERT, responsable de la licence 3 Informatique, pour nous avoir permis de réaliser ces projets durant le second semestre.

Enfin, j'aimerais remercier chaleureusement toutes les personnes qui m'ont aidé dans la création de l'application ainsi que dans la rédaction de ce rapport et qui ont relu ce dernier. Leur soutien et leurs précieux commentaires ont grandement amélioré la qualité de ce travail.

#pagebreak()

#show outline.entry.where(
  level: 1
): set block(above: 1.2em)

#outline(title: "Table des matières")

#pagebreak()

= Introduction

Nous réalisons ce projet dans le cadre de notre troisième année en Licence Informatique. Le projet a débuté en décembre 2024 et nous a accompagnés tout au long de notre 2e semestre. Le sujet que nous avons choisi est celui de Monsieur Bourreau. Le but du projet est de créer une application permettant de noter l'impact écologique avec une couleur. Celle-ci peut être de couleur Verte, Orange ou Rouge, respectivement d'une empreinte carbone faible à élevée.

Ce projet a été réalisé avec KEGLO Patrice, BARATAY Mallory et PHILIPOT Ewen. PHILIPOT Ewen ayant arrêté la Licence avant les vacances de février, nous avons réalisé la majeure partie du projet à deux.

#pagebreak()

= Spécification du sujet

== Enjeux climatiques

Selon l'INSEE, en 2018, l'alimentation a représenté 22% de l'empreinte carbone de la France
#cite(<insee2>)
. Que ce soit lié au transport de la nourriture, à l'élevage des animaux, à la quantité d'eau utilisée tout au long de la production, il y a beaucoup de facteurs polluants pour amener la nourriture dans nos assiettes. Une majorité de la population n'est pas informée sur ce sujet et ne pense pas à l'impact que sa nourriture a sur la planète.

Des solutions existent déjà pour réduire l'émission de gaz à effet de serre liée à notre alimentation. En effet, tous les aliments ne se valent pas en matière d'impact environnemental. Certains aliments tels que la viande et le poisson ont un impact écologique bien plus important que les fruits, légumes ou céréales. Le fait de consommer des produits de saison et locaux permet aussi de réduire l'émission due à notre alimentation.

Entre 2009 et 2019, la quantité de viande consommée a baissé de 5 % en France métropolitaine selon l'INSEE
#cite(<insee1>)
. On constate donc une volonté en France de consommer plus écologiquement, et la demande concernant des applications permettant de se renseigner devient de plus en plus grande. On note également une augmentation de projets allant dans ce sens, que ce soit avec la nourriture mais également d'autres produits du quotidien comme les cosmétiques et les textiles, qui sont des domaines eux aussi très polluants.

#figure(image("Images/repas.png", width: 90%), caption: [Emission de kg de CO2 en fonction du type de rapas\ 
Source: ADEME #cite(<ademe>)])

== Approche du sujet
\

Afin d'aider la population à faire des gestes écologiques, il est important de lui donner les outils permettant d'atteindre ses objectifs. La composition d'un plat étant la première cause de l'impact écologique du plat, il serait intéressant de pouvoir être informé de l'empreinte écologique du plat que l'on souhaite manger.
Afin de pallier ce problème, nous avons imaginé plusieurs solutions : 

Afin de proposer une solution aux étudiants, dans un premier temps, il serait possible de s'accorder avec le Crous ou les gérants des restaurants de la Faculté des Sciences pour faire afficher sur les téléviseurs l'impact écologique de chaque plat. L'affichage pourrait se faire à l'aide d'une pastille de couleur correspondant au degré de pollution.

Sinon, nous pourrions afficher le résultat à l'aide d'un QR Code. Le QR Code redirigerait vers une page qui détaillerait l'empreinte carbone de chaque plat.

Cette solution avait déjà été envisagée l'année dernière, mais sans succès, car, comme la première, elle présente un problème. En effet, elle nécessite un accord avec les gérants des restaurants qui sont assez réticents à voir l'impact écologique de leurs plats révélé. #text(red)[De plus, même s'il avait été possible d'avoir l'accord pour les restaurants de la Faculté des Sciences, ces solutions demanderaient énormément d'efforts pour être déployées à l'échelle de la France, car elles nécessiteraient l'accord de chaque restaurant.]

Nous avons donc choisi de faire une application collaborative qui calcule l'impact écologique de tous les plats en scannant leurs noms sur un menu. Le but de cette dernière méthode est de permettre à tout le monde de participer à améliorer l'écologie en rendant l'application collaborative. Cette méthode peut fonctionner dans n'importe quel restaurant traditionnel et peut être étendue au self et cantine scolaire.

#pagebreak()

= Gestion du projet

#h(1em) Le projet s'est déroulé en 4 grandes étapes, comme le decrit la @diagGant ci dessous, qui sont, la mise en place de la base de données, le développement des différentes fonctionnalités de l'application, la création du serveur distant ainsi qu'une base de données permettant de stocker et d'effectuer des mises à jour de données et enfin l'Implémentation complete et finition du design de l'application ainsi que les tests de fonctinonalités.

Globalement, le temps estimé pour chaque étapes du projet a été respecté selon nos prévisions, à part pour la base données que nous avons dû retravailler au cours du projet à cause du manque de pertinence des données, ce qui a necessité une réadaptation du code de différentes parties de l'application.

#figure(image("Images/Diagramme de Gantt.png",height: 40%, width: 90%), caption: "Diagramme de Gantt")
<diagGant>

#pagebreak()

= Choix technique
\

Le développement de l'application a été réalisé avec Expo, un framework open-source basé sur React Native et TypeScript, un sur-ensemble typé de JavaScript, afin de bénéficier d'un typage statique, d'une meilleure lisibilité du code et d'une maintenance facilitée.

Le dévéloppement avec Expo nous permet d'avoir une application multi-plateformes (Android et iOS) et même en version web. \

#h(-1em)*Outils et bibliothèques principaux :*

- Pandas(Python) pour la gestion de données en CSV \
- Text-recognition de react-native-ml-kit , pour la reconnaissance de text sur une image\
- Crypto-js pour encrypter les messages et assurer une sécurité dans le transfert de données entre notre serveur et l'application\
- Netinfo de react-native-community pour mettre en place des mise à jour automatique de données entre l'application de notre serveur, en permettant de connaitre l'etat de l'utilisateur (Connecté ou non Connecté)\
- fastify pour mettre en place une api pour notre backend.\
- Yup qui permet de verifier les formulaires \
- Jest pour tester les différentes fonctinonalités de notre application \
- ainsi que d'autres librairies d'expo et de react-native.

#h(1em) L'application a été testé à la fois sur simulateurs Android via Android Studio et sur appareils physiques pour s'assurer d'une bonne compatibilité et d'une expérience utilisateur fluide. 

Nous avons utilisé GitHub comme plateforme de gestion de version tout au long du projet afin de collaborer efficacement, et d'avoir un historique clair des modifications. Les branches ont été utilisées pour séparer le développement des différentes fonctionnalités, ce qui a facilité l'intégration progressive des différentes parties de l'application dans la branche principale (Branche MAIN).

Les données que nous utilisons pour notre base de données proviennent toutes du programme de collecte de données #link("https://doc.agribalyse.fr/documentation")[AGRIBALYSE 2.0.]

#pagebreak()

= Architectures

== Architectures de l'application

#figure(image("Images/Architecture de l'application.png"), caption: "Architecture de l'application") <Architecture>

La @Architecture illustre l'architecture de notre application du point de vue de l'utilisateur.
L'application s'organise autour de la barre de navigation qui permet d'atteindre les 5 pages principales (Scan, Historique, Recherche, Votes, add). Ces 5 pages peuvent être redivisé en 2 catégories. Les pages permettant de rechercher et d'afficher la composition d'un plat et la partie permettant d'ajouter un plat à la base de données .

Dans la partie de recherche et d'affichage de plat on retrouve dans un premier temps la page scan(index). Cette page est la première qui s'ouvre lorsque l'on ouvre l'application. Elle a pour but de lancer l'analyse d'une image. Elle se compose de deux boutons. Le premier bouton, "Choisir une image", ouvre la médiathèque du téléphone pour que l'utilisateur sélectionne une image. Quand une image est choisit un menu s'ouvre pour proposé à l'utilisateur de modifier l'image en la rognant par exemple. Ensuite, l'image selectionné apparait sur la page scan. L'utilisateur peut ensuite appuyer sur le bouton analyser.  

== Modele Dynamique

Lorsque l'utilisateur se sert de l'application, celle-ci communique avec le serveur afin de traiter les requêtes émises. Le diagramme de séquence(@diagramme) ci-dessous illustre les échanges entre l'application et le serveur en fonction des actions réalisé par l'utilisateur.

#figure(image("Images/Diagramme de séquence.png"), caption:"Diagramme de séquence") <diagramme>

Les différentes requêtes présentes sur ce diagramme sont détaillés dans le @userApp.

#pagebreak()

= Application <app>

== Base de données <BDD>

=== Recherche <Recherchebdd>
#let fig1 = figure(image("Images/logoAGRIBALISE.png", width: 45%), caption: "Logo AGRIBALYSE")
#let body = [
Afin de connaitre l'impact ecologique d'un plat nous avons choisi dans un premier temps de se servir de la base de données fournie par l'ADEME. La base de l'ADEME sur la consommation CO2 est une immense base regroupant tout les types d'emission de gaz à effet de serre tel que celle du au textiles, à l'industrie ou autres, ainsi que toute les emissions liee à l'alimentation.

En inspectant la base de données nous avons remarqué que toutes les informations liée à la nourriture provenait de deux bases de données qui sont AGRIBALYSE et AGRIBALYSE 2.0. AGRIBALYSE est un programme collectif et innovant qui met à disposition des données de référence sur les impacts environnementaux des produits agricoles et alimentaires à travers une base de données construite selon la méthodologie des Analyses du Cycle de Vie. Il est possible de se servir du site web d'AGRIBALYSE pour connaitre l'impact environnemental d'un aliment ou bien de télécharger leur base de données.]

#wrap-content(fig1, body, align: top+right)

Nous avons donc télécharger la base de données concernant dans un premier temps uniquement les plats ayant nécessité une transformation. Cette base de données etait disponible au format CSV. Afin de traiter de rendre les données utilisable nous avons coder un programme python servant à initialiser une base de données en sql comportant tous les plats décrit dans le CSV.

Le CSV etait construit de la maniere suivante : par plat présent dans la base, il y avait une ligne pour chaque ingredient. Cela signifie qu'on retrouve l'impact écologique d'un ingredient pour que dans chaque plats comportant cette ingredient, mais l'impact différé en fonction de la proportion de cette aliment dans le plat.

En analysant plus precisement nos besoins, nous avons remarqué un manque de plats trop important dans la base de données actuelle. Pour résoudre ce problème, nous avons changé une nouvelle fois de base de données, cette fois-ci comportant uniquement les ingredients avec l'impact écologique associé par kilo d'aliment. Les données étaient fournies sous forme d'un fichier Excel comportant plusieurs onglets, dont un dédié uniquement aux ingrédients. Chaque ingredient est associé vers un code Ciqual
#cite(<ciqual>)
qui sert d'indetifiant unique. 

Pour connaitre le poids de chaque aliment dans un plat et pour remplir la table sql des plats nous avons choisi de faire confiance au utilisateur de l'application. Une page de l'application permet d'enregistrer la composition d'un plat (voir @add). Connaissant le poids de chaque aliment et son impact écologique, il devient alors possible de calculer l’impact environnemental de chaque ingrédient au sein d’un plat, mais également l’impact écologique global du plat lui-même. Pour cela, on doit donc realisé la somme de l'impact de chaque ingredient dans le palt et faire un produit en croix pour le ramener à un kilogramme de nourriture.

=== Modélisation <Modelisation>

Pour l'application nous avions besoin d'une base de données regroupant d'une part les informations du CSV fournit par AGRIBALYSE ainsi que les nouvelles données tel que les plats ou les menus.

#figure(image("Images/E_A.png"), caption: "Schéma du modèle Entité Association de la base de données final") <EA>

Nous avons donc défnini un modèle Entité-Association (E-A) afin de représenter la structure de notre base de données. La @EA met en évidence les différentes tables que comporte la base ainsi que les liaisons entre elles.

Les données que nous récupérons via la le fichier Excel sont rangés dans la table ingredients. Afin de trier les ingredients par catégories on retrouve les tables groupes et sous-groupes. Chaque ingredient a une clé étrangère qui mène vers un sous groupes lequel possédant à son tour une clé étrangère menant vers la tables des groupes.

Ensuite, les plats sont composé de plusieurs ingredients et un ingredient peut être présent dans plusieurs plat. On a donc une table intermediaire entre les plats et les ingredients. Cette table est composé d'une clé étrangère menant vers l'ID des ingredients 

Après avoir modéliser les deux bases de données, on rédige leur structure dans un fichier .sql qui servira pour leurs implémentations (voir @Implémentation).

=== Implémentation <Implémentation>

Afin de convertir les données d'AGRIBALYSE dans notre base de données décrites dans la partie précedente, nous avons choisi de coder un programme Python. Le but du programme est de créer à partir de 0 la base de données.

Pour cela, on commence par créer le fichier qui contiendra la base de données. Ce fichier aura une extension .db et s'il était déjà existant, il est remplacé. Ensuite on importe le fichier .sql contenant l'agencement des tables décrit dans la partie Modélisation(voir @Modelisation). Cela permet d'initialiser toutes les tables mais elles sont encores vides.

Ensuite, il faut remplir trois tables avec les données fournies par AGRIBALYSE. Les tables à remplir sont les groupes, les sous-groupes et les ingredients. Les données sont dans un tableau Excel comportant plusieurs pages. On commence donc par extraire la bonne page du Excel. Après cela, on commence le remplissage des trois tables par celle des groupes à cause des contraintes de clé étrangère. Pour remplir la deuxième table, parce qu'on a besoin de la clé primaires de la tables des groupes qui viennent d'être ajouté à la base de données, on doit d'abord faire une requête à la base de données. On range les indices et le nom du groupe dans un dictionnaire. Avec les informations du tableau Excel, on associe le noms des sous-groupes avec l'indice de son groupe correspondant. Enfin on ajoute le dictionnaire résultant à la base de données. On recommence ensuite la meme opération afin d'associer les indices des sous-groupes avec les ingredients.

Ce programme permet à la fois de créer la base de données pour l'application de l'utilisateur et pour le serveur. La seule différence entre les deux tables et qu'on utilise pas le même fichier .sql.

Avec ce programme Python, si la base de données d'AGRIBALYSE venait à être mise à jour, il suffirait d'exucter le programme pour obtenir la nouvelle base. Une amélioration possible pour ce programme serait de récupérer les autres données des anciennes bases pour les rajouter aux nouvelles.

== Application utilisateur <userApp>

Dans cette partie, nous allons decrire et expliquer les différentes parties ainsi que les différentes fonctionnalités implementées tout en montrant leur fonctionnement avec des images. 

=== Analyse d'un menu <Scan>

Cette fonctionnalité est visible sur la premiere page de notre application, elle consiste, dans un premier temps, à reconnaitre le text contenu sur une image choisie par l'utilisateur depuis sa galerie decrit par la figure @2. Pour cela l'utilisateur appuis sur le bouton *Choisir une image*. Par defaut, il y a une image d'un menu du restaurant administratif, confer @1. Les images de sa galerie s'affichent puis il clique sur celle qu'il veut analyser. Si une fois les images de la galerie affichées, il (l'utilisateur) ne clique sur aucune image et referme l'affichage, un message d'alert s'affiche indiquant qu'aucune image n'a été selectionné confer @3, sinon l'image est mise à jour confer @4.

*A revoir (update l'image)*

L'utilisateur, peut rentrer le nom du restaurant dont il va analyser le menu ainsi que l'adresse s'il l'a. Ces deux informations ne sont pas obligatoires.

#figure(table(columns: 3)[#figure(image("Images/scanpage.png",width: auto,height: 300pt),caption: "page scan")<1>][#figure(image("Images/selectImage.png",width: auto,height: 300pt),caption: "Choisir une photo")<2>][#figure(image("Images/ImageNotselected.png",width: auto,height: 300pt),caption: "image non selectionné")<3>],caption: "Analyse menu")

Une fois ceci fait, il peut cliquer sur le bouton *Analyser*. On effectue l'analyse textuelle de l'image et on recupere le nom des plats du menu ou du moins le texte reconnu. Une fois les noms recuperés, on verifie pour chaque plat, s'il existe dans notre base de données pour pouvoir ensuite recuperer la liste des ingredients, leurs quantités dans le plat et effectuer le calcule de score. En fonction du score du plat, on lui attribue une couleur qui sera la même que celle de la pastille qui sera affiche pour ce plat, comme l'indique le @couleur.


Le score d'un plat est la somme des Score unique EF
#cite(<ef>)
(EF = Environmental Footprint) = Somme (impact catégorie $*$ facteur de pondération) de chacun de ses ingredients.

#figure(table(columns: 3,
table.header([*Intervale de score*],[*Couleur*],[*Niveau d'Impact*]))[score >=0 et score <= 1][#text(green)[Verte]][Faible][score > 1 et score <= 5][#text(orange)[Orange]][Moyen][score >5][#text(red)[Rouge]][Elevé],caption: "Tableau descriptif de l'attribution des couleurs")<couleur>
\
Apres l'analyse, on affiche la liste des plats avec une pastille en forme d'etoile juste devant le nom ayant une couleur descriptif de l'impact ecologique du plat comme l'indique la @5. 
\
\

#figure(table(columns: 2)[#figure(image("Images/platReconnu.png",width:auto,height: 300pt),caption: "Mise à jour de l'image")<4>][#figure(image("Images/platReconnu.png",width:auto,height: 300pt),caption: "Apres analyse d'un menu")<5>],caption: "Update image et resultat de l'analyse")

#pagebreak()
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

= Conclusion

Pour conclure, l'application Crok'eco répond efficacement aux objectifs fixés en permettant aux utilisateurs de s'informer sur l'impact écologique des plats qu'ils consomment. Grâce à son approche collaborative et à l'utilisation de bases de données fiables comme AGRIBALYSE, elle offre une solution innovante et accessible pour sensibiliser le public à l'empreinte carbone de leur alimentation.

Cependant, certaines fonctionnalités prévues n'ont pas pu être implémentées, comme l'intégration de la caméra ou la gestion des comptes utilisateurs. Ces éléments représentent des pistes d'amélioration pour les futures versions de l'application. Malgré ces limitations, le projet a permis de développer des compétences techniques variées, allant de la gestion de bases de données à l'utilisation de frameworks modernes comme Expo.

Enfin, ce projet nous a permis de mettre en pratique nos connaissances acquises en Licence Informatique mais aussi de développer de nouvelles compétences essentielles pour la suite de notre parcours.

#pagebreak()

= Bibliographie


#bibliography("works.bib", style: "american-institute-of-aeronautics-and-astronautics")

#outline(
  title: [Tables des figures],
  target: figure,
)


#pagebreak()

enlever le numero de la pgae d'entete \
CORRIGER L'ORTHOGRAPHE \
si on en a besoin
#footnote[test] \
partie a finir : 
+ statistiques
+ fonctinonalités non implementé
+ design
+ recherche
+ ajout de plat et vote