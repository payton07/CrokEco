import React, { useEffect, useState } from "react";
import {StyleSheet, View,Text} from "react-native";
import { Image} from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { getIngredients } from "@/utils/bdd";
import { images } from "@/utils/picture";
import * as FileSystem from 'expo-file-system';

const imagePath = FileSystem.documentDirectory;
const end = ".png";
export default function details() {
  const [img, setImg] = useState<string|null>("@/assets/ingImage.image.png");
  const [info, setInfo] = useState(" hello ici les infos de cet element !!! :)");
  const params = useLocalSearchParams(); 
  useEffect(() => {
    /**
     * TODO Faire un gros import des images pour aleger le chargement 
     * EXEMPLE : 
     */
    async function change(){
      const res = await getIngredients({ID_ingredient : params.id});
      if(res !=undefined){
        const ele= res[0];
        const as = ele.Ingredient;
        setInfo(ele.Ingredient);
        // const name = images.ele;
        // const n = "Carotte";
        console.log(as);
        const fin = `${imagePath}${as}${end}`;
        // const imageUrl = "@/assets/ingImages/"+as;
        const imageUrl = "http://localhost:8888/"+as;
        // const fin = require(imageUrl);
        // setImg(fin);

        const fileInfo = await FileSystem.getInfoAsync(fin);
        await FileSystem.deleteAsync(fin, { idempotent: true });
        // await reloadImage(fin,imageUrl)
        if (fileInfo.exists) {
          console.log("l'image exists",fileInfo.size);
          setImg(fin);
          return ;
        }

        console.log("Suppression de l'ancienne image...");
        await FileSystem.deleteAsync(fin, { idempotent: true });
  
        console.log("Téléchargement de l'image...");
        const downloadResumable = FileSystem.createDownloadResumable(imageUrl, fin);
  
        try {
          const { uri } = await downloadResumable.downloadAsync();
          console.log("Téléchargement terminé :", uri);
          setImg(uri);
        } catch (error) {
          console.error("Erreur lors du téléchargement :", error);
        }
      }
    }

    change();
  },[]);
  return (
      // <View>
      <>
        <Stack.Screen options={{ title: "Oops!" }} />
        <Link href="/(tabs)/research" style={styles.link}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Link>
        <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>
        <Image style={styles.image} source={img}/>
        <Text>
          {info}
        </Text>
        </View>
      {/*  </View> */}
      </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor : 'black',
    margin : 5,
  },
    container: {
      flex: 1,
      alignItems: "center",
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    link: {
      top : 40,
      marginTop: 15,
      margin : 20,
      paddingVertical: 15,
    }, 
});
