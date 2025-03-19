import { StyleSheet , Alert, Image as RNImage, TouchableOpacity} from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import Tesseract from "tesseract.js";
import * as ImagePicker from "expo-image-picker";
import TextRecognition from "@react-native-ml-kit/text-recognition";

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
  const [text ,setText] = useState('Rien');
  const imagePath = require('../../assets/ingImages/image11.png'); 
  const [filled,setFilled] = useState(false);
  const [imageUri , setImageUri] = useState(RNImage.resolveAssetSource(imagePath).uri);

  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== "granted") {
      alert("Permission refusée !");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      console.log("Image URI :", imageUri);
    } else {
      alert('You did not select any image.');
    }
  };


  async function recognizeText(){
    if(!filled){
    try {
      const result = await TextRecognition.recognize(imageUri);
      // console.log("Résultat OCR brut :", result); 
      const inter : TextBlock[] = result.blocks;// 🔍 Debug
      const sortedText = sortRecognizedText(inter || []); // Assurer que blocks existe
      setText(sortedText);
      setFilled(true);
    } catch (error) {
      Alert.alert('Erreur', 'Échec de la reconnaissance de texte');
      console.error("Erreur OCR :", error);
    }
  }
  else{
    setFilled(false);
    setText('Rien');
  }
  };

    return (
      <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.title} onPress={recognizeText}> Scanner page </Text>
        <Text style={styles.text}>{text}</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        {imageUri ? (
          <RNImage source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text>Aucune image sélectionnée</Text>
        )}

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>📷 Choisir une image</Text>
      </TouchableOpacity>

        <EditScreenInfo path="app/(tabs)/index.tsx" />
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
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
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
    width: 200,
    height: 200,
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
