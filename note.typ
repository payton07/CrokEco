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

