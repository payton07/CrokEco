import { StyleSheet , Alert, Image as RNImage, TouchableOpacity} from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import Tesseract from "tesseract.js";
import * as ImagePicker from "expo-image-picker";
import TextRecognition from "@react-native-ml-kit/text-recognition";
import { set } from "zod";

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
  const [text ,setText] = useState('');
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


  async function recognizeText(){
    if(!filled && imageUri){
    try {
      const result = await TextRecognition.recognize(imageUri);
      const inter : TextBlock[] = result.blocks;
      const sortedText = sortRecognizedText(inter || []); 
      setText(sortedText);
      setFilled(true);
      setDone(true);
    } catch (error) {
      Alert.alert('Erreur', 'Échec de la reconnaissance de texte');
      console.error("Erreur OCR :", error);
    }
  }
  else{
    setFilled(false);
    setText('');
    setDone(false);
  }
  };

    return (
      <SafeAreaProvider>
        <Text style={styles.title}> Scanner page </Text>
      <View style={styles.container}>

        {done ?<View style={styles.RecongnitionContainer}>
          <Text style={styles.title1}>Text Reconnu : </Text>
          <Text style={styles.text}>{text}</Text>
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
      <TouchableOpacity style={{...styles.imageButton,top:10}} onPress={recognizeText}>
      <Text style={styles.imageButtonText} onPress={recognizeText}> Analyser </Text>
      </TouchableOpacity>
        </>
      :
      <TouchableOpacity style={styles.imageButton} onPress={recognizeText}>
      <Text style={styles.imageButtonText} onPress={recognizeText} > retour </Text>
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
