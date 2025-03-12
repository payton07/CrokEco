import { StyleSheet , Alert, Image as RNImage} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Tesseract from 'tesseract.js';
import TextRecognition from "@react-native-ml-kit/text-recognition";

export default function Scanner(){
const [text ,setText] = useState('Rien');
const imagePath = require('../../assets/ingImages/image4.png'); 
const imageUri = RNImage.resolveAssetSource(imagePath).uri;

async function recognizeText(){
  try {
    const result = await TextRecognition.recognize(imageUri);
    setText(result.text);
    console.log("Text :",text,"result :", result.text);
    
  } catch (error) {
    Alert.alert('Erreur', 'Échec de la reconnaissance de texte');
    console.log("Erreur OCR :", error);
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
