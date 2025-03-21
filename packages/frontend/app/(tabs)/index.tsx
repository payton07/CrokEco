import { StyleSheet , Alert, Image as RNImage, TouchableOpacity} from "react-native";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import Tesseract from "tesseract.js";
import * as ImagePicker from "expo-image-picker";
import TextRecognition from "@react-native-ml-kit/text-recognition";
import { getPlats } from "@/utils/bdd";
import { change } from "@/utils/other";
import Textshow from "@/components/Textshow";

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
  // RNImage.resolveAssetSource(imagePath).uri

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
async function setRecoData(){
  if(!filled && imageUri){
    const data = await recognizeText();
    if(data != undefined){    
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
      setData(lines);
      setFilled(true);
      setDone(true);
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


    return (
      <SafeAreaProvider>
        <Text style={styles.title}> Scanner page </Text>
      <View style={styles.container}>

        {done ?<View style={styles.RecongnitionContainer}>
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
        {!done ?<>
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

      <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
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
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderBlockColor: 'black',
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "80%",
    height: "50%",
    elevation: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    bottom: 20,
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
    width: "70%",
    height: "40%",
    borderRadius: 10,
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  imageButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
