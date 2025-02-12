import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import React, { useRef } from "react";

import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture, CameraViewProps } from 'expo-camera';
import { useState } from 'react';
import { Button, TouchableOpacity, TranslateXTransform, View, Image, Text} from 'react-native';

let h = 200
let w = 200

export default function Scanner() {
// Référence à la caméra
const cameraRef = useRef<CameraView | null>(null);
const [photoUri, setPhotoUri] = useState('');
const [pictureSize, setPictureSize] = useState('');
const [pictureHeight, setPictureHeight] = useState(480);
const [pictureWitdh, setPictureWidth] = useState(480);

// Fonction pour prendre une photo
const takePicture = async () => {
  getPictureSize();
  try {
    if (cameraRef.current) {
      // Utilisation de la méthode takePictureAsync seulement si la référence est prête
      const picture = await cameraRef.current.takePictureAsync({
        quality: 1, // Haute qualité
        base64: true, // Inclure la version base64 de l'image
      });
      if (picture && picture.uri) {
        setPhotoUri(picture.uri); // Stocke l'URI de la photo
        setPictureHeight(picture.height);
        h = pictureHeight;
        setPictureWidth(picture.width);
        w = pictureWitdh;
        console.log(pictureHeight);
        console.log(pictureWitdh);
      } else {
        console.error("Erreur: la photo n'a pas été prise correctement");
      }
    } else {
      console.error("La caméra n'est pas prête");
    }
  } catch (error) {
    setPhotoUri("");
    console.error("Erreur lors de la prise de photo:", error);
  }
};

const getPictureSize = async () => {
  try {
    if (cameraRef.current) {
      // Utilisation de la méthode takePictureAsync seulement si la référence est prête
      const size = await cameraRef.current.getAvailablePictureSizesAsync();
      if (size) {
        setPictureSize("640x480"); // Stocke l'URI de la photo
        console.log(pictureSize);
      } else {
        console.error("Erreur: taille photo non recuperable");
      }
    } else {
      console.error("La caméra n'est pas prête");
    }
  } catch (error) {
    console.error("Erreur lors de la recuperation de la taille:", error);
  }
};


function resetPhotoUri(){
  setPhotoUri('');
  console.log("Reset PhotoUri");
}

if(photoUri!=''){
  return (
    <View style={styles.container}>
      {/* Affichage de l'image capturée si disponible */}
      {photoUri ? (
        <View style={styles.photoContainer}>
          <Text>Photo prise avec succès: </Text>
          <Image source={{ uri: photoUri }} style={styles.photo} width={pictureWitdh/20} height={pictureHeight/16} />
        </View>
      ) : null}
      <Button title="Reset" onPress={resetPhotoUri}/>
    </View>
  );
}
else{
  return(
    <View style={styles.container}>
      <CameraView
          ref={cameraRef}
          style={styles.camera}
          onCameraReady={() => console.log("La caméra est prête")}
        />
      {/* Bouton pour prendre la photo */}
      <Button title="Prendre une photo" onPress={takePicture} />
    </View>
  );
}

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
    marginTop: 10,
    borderRadius: 10,
  },
});