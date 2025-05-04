Moderation nous mm ? : *OUI on le gere en backend*
- Des qu'il y a ajout , attente de validation : 

*Un compte pour ajouter un menu et autre . :* Euh pour l'instant Non 

= => Search , Menu  deroulante 
On peut cliquer sur le plat passer par la Realité Augmenter 

Page d'ajout de plat :
- Nom du plat
- Ingredients ({nom,poids})

Reste  : Pour faire l'insertion dans la base de donnée => modif de la bdd car on a pas le Ciqual_AGB du plat que l'utilisateur ajoute + Partie de validation de l'ajout du plat

API - IA  : Gemini 


Localisation :

= Commande pour creer le build android :
* Faut avoir brancher le telephone par cable ou soit excecuter sans le install et envoyer l'apk au mec qui veut l'installer*
- npx expo run:android
- cd android && ./gradlew assembleRelease
- adb install android/app/build/outputs/apk/release/app-release.apk

= Pour le build ios :
- npx expo run:ios
- cd ios && pod install
le reste c'est sur xcode , autre possibilité : je verrais plus tard 


= Notes :
== Ajout nom resto sur la page de scan 
== Faudra rajouter un plat ajouter dans la recherche

= Test 
== Mettre en place des tests au moins 

==== (Prise des notes de ewen ) peut-être avoir un mécanisme clé privé/publique ou équivalent pour s'assurer que les clients qui envoient des données au serveurs soient bien nos applis. Fait ()

====== Pour la localisation : localisation ou adresse ?,
====== Liste deroulante pour chosir 
====== Ajouter sinon donc faut add sur la page de add .

* A chaque ouverture de l'appli , on demande au serveur sa version de la bdd actuel, si elle est differente de celle de l'appli , on effectue une mise à jour de la bd. *

Frontend : faut add  resto , gerer mise à jour 

== Faut que lors de l'ajout des plats par le script de mallo , ce soit en autoincrement 


""" ➡️ Description à copier-coller :

Génére un logo vectoriel plat avec :
Un C stylisé et légèrement allongé (main levée, organique, artistique, en vert foncé),
Une feuille verte intégrée dans le C, bien visible et moderne,
Une fourchette bleue foncée à droite du C, légèrement rapprochée mais pas collée (laisse un petit espace visuel propre),
Le tout sur un fond vert clair doux.
Le logo doit rester équilibré, minimaliste, et bien espacé entre chaque élément.
"""