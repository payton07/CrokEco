import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import React, { useEffect, useRef } from "react";

import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture, CameraViewProps, Camera } from 'expo-camera';
import { useState } from 'react';
import { Button, TouchableOpacity, TranslateXTransform, View, Image, Text} from 'react-native';
import { Link } from "expo-router";

let h = 200
let w = 200

export default function Scanner() {
// Référence à la caméra
const cameraRef = useRef<CameraView | null>(null);
const [photoUri, setPhotoUri] = useState('');
const [pictureSize, setPictureSize] = useState('640x480');
const [pictureHeight, setPictureHeight] = useState(480);
const [pictureWitdh, setPictureWidth] = useState(480);
const [permission, requestPermission] = useCameraPermissions();


  // Fonction pour prendre une photo
  const takePicture = async () => {
  // getPictureSize();
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
    setPhotoUri('');
    console.error("Erreur lors de la prise de photo:", error);
  }
};

const getPictureSize = async () => {
  try {
    if (cameraRef.current) {
      // Utilisation de la méthode takePictureAsync seulement si la référence est prête
      const size = await cameraRef.current.getAvailablePictureSizesAsync();
      console.log("Size:"+size)
      if (size) {
        setPictureSize("176x144"); // Stocke l'URI de la photo
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


if (!permission) {
  // Camera permissions are still loading.
  return <View />;
}

if (!permission.granted) {
  // Camera permissions are not granted yet.
  return (
    <View style={styles.container}>
      <Text style={styles.message}>We need your permission to show the camera</Text>
      <Button onPress={requestPermission} title="Grant permission" />
    </View>
  );
}

if(photoUri!=''){
  console.log(photoUri.split('/').pop());
  return (
    <View style={styles.container}>
      {/* Affichage de l'image capturée si disponible */}
      <View style={styles.photoContainer}>
          <Text>Photo prise avec succès: </Text>
          <Image source={{ uri: photoUri }} style={styles.photo} width={pictureWitdh/10} height={pictureHeight/10} />
        </View>
      <Button title="Reset" onPress={resetPhotoUri}/>
      <Link href={`../(autre)/image/${photoUri.split('/').pop()}`}>zrhbzi</Link>
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
          ratio="16:9"
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
    width:"100%",
    height:"100%",
    backgroundColor:'red'
  },
  camera: {
    width: '80%',
    height: '80%',
  },
  photoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  photo: {
    marginTop: 10,
    borderRadius: 10,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
});