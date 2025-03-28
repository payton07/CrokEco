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


///////////////////////////////////////////////////
/////////////////////////////////////////////////// 
/////////////////////////////////////////////////// 
/////////////////////////////////////////////////// 

import { StyleSheet , Alert, Image as RNImage, TouchableOpacity, TextInput, TouchableWithoutFeedback, FlatList} from "react-native";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import Tesseract from "tesseract.js";
import * as ImagePicker from "expo-image-picker";
import TextRecognition from "@react-native-ml-kit/text-recognition";
import { addMenus_Historique, addRecherches_Historique, addRestaurants_Historique, getPlats, getRestaurants } from "@/utils/bdd";
import { ajouterMenu, ajouterRecherche, ajouterResto, change } from "@/utils/other";
import Textshow from "@/components/Textshow";

import {useEffect } from "react";
import {  Button } from "react-native";
import * as Location from "expo-location";


interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface TextBlock {
  text: string;
  frame?: BoundingBox; 
}

function sortRecognizedText(blocks: TextBlock[]): string{
  return blocks
    .filter((block) => block.frame) // Filtrer les blocs sans frame
    .sort((a, b) => {
      if (!a.frame || !b.frame) return 0;

      // Trier d'abord par position verticale (Y)
      if (Math.abs(a.frame.y - b.frame.y) > 20) {
        return a.frame.y - b.frame.y;
      }

      // Si les lignes sont proches, trier par position horizontale (X)
      return a.frame.x - b.frame.x;
    })
    .map((block) => block.text)
    .join("\n"); // Ajouter des sauts de ligne entre les blocs
};


export default function Index(){
  const [data ,setData] = useState<any[]>([]);
  const imagePath = require('../../assets/ingImages/image11.png'); 
  const [filled,setFilled] = useState(false);
  const [done, setDone] = useState(false);
  const [imageUri , setImageUri] = useState(RNImage.resolveAssetSource(imagePath).uri);
  const [nomResto , setNomResto] = useState("");
  const [Adresse , setAdresse] = useState("");
  const [RestosList , setRestosList] = useState([]);
  const [filteredRestos , setfilteredRestos] = useState<any[]>([]);
  const [RestosData , setRestosData] = useState<string[]>([]);
  // RNImage.resolveAssetSource(imagePath).uri
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loc, setLoc] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function getLocation(){
    // Demande de permission
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission de localisation refusée");
      Alert.alert("Erreur", "Autorisez la localisation pour continuer");
      return;
    }

    // Récupération de la position
    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
    setLoc(true);
  };

  useEffect(() => {
    getLocation();
  }, []);

  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== "granted") {
      alert("Permission refusée !");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      console.log("Image URI :", imageUri);
    } else {
      alert("Vous n'avez selectionner aucune image.");
    }
  };

async function FormatDataPlatReconnu(data : string[]){
  const lines = [];
  for (const ligne of data) {
    const query = `${ligne}`;
    try {
      const res = await getPlats({Nom_plat: query},false,true,1);
      if(res != undefined && res.length > 0 && res != null){
        const id = res[0].ID_plat;
        const color = await change(id);
        lines.push({"text":ligne,color:color?.back,"id":id});
      }
      else{
        lines.push({"text":ligne,color:"black","id":null});
      }
    }
    catch (error) {
      console.error("Erreur lors de la récupération des plats:", error);
    }
  }
  return lines;
}

async function LoadLocAndInsertClient_SendDataToServeur(){
  // SEND RESTO AU SERVEUR ET IL FAUT DONC LA LOC
  let Longitude = null ;
  let Latitude = null ;
  if(!loc){
    getLocation();
  }
  if(location){
    Longitude = location.coords.longitude;
    Latitude = location.coords.latitude;
  const data1 = {'NomResto':nomResto,'Latitude':Latitude,'Longitude':Longitude,'Adresse':Adresse};
  const resH = await addRestaurants_Historique(data1);
  const r1 = await ajouterResto(data1);

  // TODO : FAUT GERER LE NOM DU MENU
  const data2 = {'NomMenu':'menu','ID_restaurant':r1};
  const mH = await addMenus_Historique(data2);
  const r2 = await ajouterMenu(data2);

  const data3 = {'Text_request':data,'ID_menu':r2,'Date':new Date().toLocaleDateString("fr-FR")};
  const recH = await addRecherches_Historique(data3);
  await ajouterRecherche(data3);
  setNomResto('');
  }
  else{
    console.log("y a pas de loc on fait quoi ?");
  }
}
  
async function setRecoData(){
  if(!filled && imageUri){
    const data = await recognizeText();
    if(data != undefined){    
      const lines = await FormatDataPlatReconnu(data);
      setData(lines);
      setFilled(true);
      setDone(true);
      
      // SEND RESTO AU SERVEUR ET IL FAUT DONC LA LOC
      await LoadLocAndInsertClient_SendDataToServeur();
    }
    else{
      setData([]);
      setFilled(false);
      setDone(false);
    }

  }
  else{
    setData([]);
    setFilled(false);
    setDone(false);
  }
}

  async function recognizeText(): Promise<string[]|undefined> {
    try {
      const result = await TextRecognition.recognize(imageUri);
      const inter : TextBlock[] = result.blocks;
      const sortedText = sortRecognizedText(inter || []); 
      const lines = []
      for (const ligne of sortedText.split("\n")) {
        const v = ligne.split("*");
        lines.push(v[0]);
      }
      return lines ;
    } catch (error) {
      Alert.alert('Erreur', 'Échec de la reconnaissance de texte');
      console.error("Erreur OCR :", error);
    }
}

function inter(ingredient: string){
  if (ingredient.trim()) {
    setNomResto(ingredient.trim());
    setfilteredRestos([]); 
  }
}
  async function Alter_RestosFromBdd(text:string){
    const query = `%${text}%`;
    const data = await getRestaurants({'NomResto':query},true,true,30); 
    console.log("J'ai eu la data resto", data?.length);
    if(data !== undefined){
      const Ing : string[]= [];
      for (const ele of data) {
        if(!Ing.includes(ele.Nom_Resto)) Ing.push(ele.Nom_Resto);
      }
      setRestosData(Ing);
    }
    
  }

async function filterRestos(text:string){
  setNomResto(text);
  await Alter_RestosFromBdd(text);
  if (text.trim() === '') {
      setfilteredRestos([]);
    } else {
        const filtered = RestosData.filter(Element =>
            Element.toLowerCase().startsWith(text.toLowerCase())
        );
        setfilteredRestos(filtered);
    }
}


    return (
      <SafeAreaProvider>
        <Text style={styles.title}> Scanner page </Text>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
        {!done ? 
          <View>
            <Text style={styles.label}>Restaurants :</Text>
            <TextInput
              style={styles.input2}
              placeholder="Taper le nom du resto"
              value={nomResto}
              onChangeText={filterRestos}
            />
            {filteredRestos.length > 0 && (
              <View style={styles.suggestionsBox}>
                <FlatList
                  data={filteredRestos}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => inter(item)}>
                      <View style={styles.suggestionItem}>
                        <Text style={styles.suggestionText}>{item}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                />
              </View>
            )}
            <Text style={styles.label}>Adresse :</Text>
            <TextInput
              style={styles.input2}
              placeholder="Taper l'adresse du resto "
              value={Adresse}
              onChangeText={setAdresse}
            />
          </View>
          : 
          <></>
        }
        {done ?
            <View style={styles.RecongnitionContainer}>
              <Text style={styles.title1}>Text Reconnu : </Text>

              {data ? 
                data.map((ligne,i)=>{
                  return <Textshow key={i} ligne={ligne} />
                })
                : 
                <Text style={styles.text}>Aucun texte reconnu</Text>
              }
            </View>
          : 
            <Text style={styles.text}></Text>
        }
        {imageUri && !done? (
          <RNImage source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <></>
        )}
        {!done ?
          <>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Text style={styles.imageButtonText}>📷 Choisir une image</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{...styles.imageButton,top:10}} onPress={setRecoData}>
              <Text style={styles.imageButtonText} onPress={setRecoData}> Analyser </Text>
            </TouchableOpacity>
          </>
          :
          <TouchableOpacity style={styles.imageButton} onPress={setRecoData}>
            <Text style={styles.imageButtonText} onPress={setRecoData} > retour </Text>
          </TouchableOpacity>
        }
      </View>
      </View>
      </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    top : 20,
    alignSelf: "center",
    height: "10%",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  title1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    alignSelf : "center",
  },
  RecongnitionContainer: {
    alignSelf : 'center',
    alignContent : 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderBlockColor: 'black',
    // borderColor: 'black',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    width: "100%",
    height: "60%",
    // elevation: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    // bottom: 20,
  },
  text: {
    fontSize: 16,
    color: "black",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  star : {
    right : 40,
  },
  reco : {
    flexDirection : "row",
    justifyContent : "space-between",
    alignItems : "center",
    width : "100%",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  image: {
    width: "100%",
    height: "60%",
    borderRadius: 10,
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    top : 4,
  },
  imageButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    backgroundColor: '#f7f7f7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    width : "80%",
    height : "95%"
    // flexDirection: 'row',
  },
  label: {
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input2: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    // width:"60%"
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  addButton: {
    backgroundColor: '#2ecc71',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
  suggestionsBox: {
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
    maxHeight: 200,
    // width: '45%',
  },
  suggestionItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  suggestionText: {
    color: '#333',
  },
});
