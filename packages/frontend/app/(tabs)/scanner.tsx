import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import React, { useRef } from "react";

import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture, CameraViewProps } from 'expo-camera';
import { useState } from 'react';
import { Button, TouchableOpacity, TranslateXTransform, View, Image, Text} from 'react-native';


export default function Scanner() {
// Référence à la caméra
const cameraRef = useRef<CameraView | null>(null);
const [photoUri, setPhotoUri] = useState('');

// Fonction pour prendre une photo
const takePicture = async () => {
  try {
    if (cameraRef.current) {
      // Utilisation de la méthode takePictureAsync seulement si la référence est prête
      const picture = await cameraRef.current.takePictureAsync({
        quality: 1, // Haute qualité
        base64: true, // Inclure la version base64 de l'image
      });
      if (picture && picture.uri) {
        setPhotoUri(picture.uri); // Stocke l'URI de la photo
      } else {
        console.error('Erreur: la photo n\'a pas été prise correctement');
      }
    } else {
      console.error('La caméra n\'est pas prête');
    }
  } catch (error) {
    setPhotoUri('');
    console.error('Erreur lors de la prise de photo:', error);
  }
};

return (
  <View style={styles.container}>
    {/* Affichage de la vue de la caméra */}
    <CameraView
      ref={cameraRef}
      style={styles.camera}
      onCameraReady={() => console.log('La caméra est prête')}
    />
    {/* Bouton pour prendre la photo */}
    <Button title="Prendre une photo" onPress={takePicture} />
    {/* Affichage de l'image capturée si disponible */}
    {photoUri ? (
      <View style={styles.photoContainer}>
        <Text>Photo prise avec succès: </Text>
        <Image source={{ uri: photoUri }} style={styles.photo} />
      </View>
    ) : null}
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
camera: {
  width: '100%',
  height: '70%',
},
photoContainer: {
  marginTop: 20,
  alignItems: 'center',
},
photo: {
  width: 200,
  height: 200,
  marginTop: 10,
  borderRadius: 10,
},
});