#import "@preview/pintorita:0.1.3"
#show raw.where(lang: "pintora"): it => pintorita.render(it.text)
Cahier des charges

Explication générale :
Le but est de créer une application permettant de devoiler l'impact écologique de tous les plats que l'on scanne sur un menu dans un restaurant.
L'objectif principal est de pouvoir se rendre compte rapidement de l'impact écologique de notre alimentation, avec 

Outils :
- Android studio (pour télécharger la SDK android)
- React Native
- Expo
- Figma pour le design
- A completer...

Nous avions 4 mois pour réaliser ce projet. Nous l'avons donc decoupé en plusieurs partis :
+ Création d'une *application* complètement *local*
+ Ajout d'un *serveur* pour la collecte de données
+ Calcul et affichage des statistiques en fonction des données utilisateurs
+ A completer

- faire un diagramme de gantt en fonction des mots en gras (il faudrait en faire un rapidement en estimant le temps de chaque tâche puis on en refait un a la fin pour voir la différence)

```pintora
gantt
  title Gantt example

  dateFormat HHTDD-MM-YYYY
  axisFormat DD-MM-YY
  axisInterval 1d

  section Developpement application locale
  "Write grammar"       : t-a, 17-2-2022, 23-2-2022
  "Write artist"        : t-b, 2-23-2022, 15-3-2022

  %% the day I started typing the docs
  markDate 20T15-3-2022

  section Developpement serveur
  "Write docs"          : t-c, 15-3-2022, 5d

  section Calcul et affichage des statistiques
  "Add axisInterval" : 28-3-2022, 04-4-2022

  section Publication
  "Release" : milestone, 06-4-2022, 0d
```

\

Cas d'usage (pour plus tard) :
- explication des cas d'usage
- diagramme des cas d'usage

Modele statique (interactions des composants entre eux):
- A faire si besoin

Modele dynamique (Deplacement entre les differents menu):
- Diagramme
