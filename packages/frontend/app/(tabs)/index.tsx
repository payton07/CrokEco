import { StyleSheet , Alert, Image as RNImage} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import Tesseract from "tesseract.js";
import { Frame } from "@react-native-ml-kit/text-recognition";
import TextRecognition , {TextRecognitionScript, }from "@react-native-ml-kit/text-recognition";

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface TextBlock {
  text: string;
  frame?: BoundingBox; // Vérification que frame existe
}

const sortRecognizedText = (blocks: TextBlock[]): string => {
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


export default function Scanner(){
const [text ,setText] = useState('Rien');
const imagePath = require('../../assets/ingImages/image11.png'); 
const imageUri = RNImage.resolveAssetSource(imagePath).uri;

async function recognizeText(){
  try {
    const result = await TextRecognition.recognize(imageUri);
    // console.log("Résultat OCR brut :", result); 
    const inter : TextBlock[] = result.blocks;// 🔍 Debug
    const sortedText = sortRecognizedText(inter || []); // Assurer que blocks existe
    setText(sortedText);
    console.log("\nresult :\n",sortedText);
  } catch (error) {
    Alert.alert('Erreur', 'Échec de la reconnaissance de texte');
    console.error("Erreur OCR :", error);
  }
};

  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <Text style={styles.title} onPress={recognizeText}> Scanner page </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/scanner.tsx" />
    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
