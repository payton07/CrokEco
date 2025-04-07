import React, { useEffect, useState } from "react";
import {StyleSheet, View,Text, ScrollView, Alert} from "react-native";
import { Image} from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router,useLocalSearchParams } from "expo-router";
import { images } from "@/utils/picture";
import * as FileSystem from 'expo-file-system';
import ProgressBar from "@/components/progressBar";
import { change} from "@/utils/other";
import { info_t } from "@/utils/type";

export default function details() {
  const [img, setImg] = useState<string|null>("@/assets/ingImage.image.png");
  const [info, setInfo] = useState<info_t>();
  const [ingredients_info,setIngredients_info] = useState<any[]>([]);
  const [color, setColor] = useState("black");
  const params = useLocalSearchParams(); 

  // Fonction pour retourner  à la page de recherche
  function retour() {
      router.push({ pathname: `/(tabs)/research`});
  }

  // Fonction pour charger les infos du plat
  async function load(){
    if (typeof params.id === "string") {
      const ID_plat = parseInt(params.id);
        const obj = await change(ID_plat);
        
        if(obj!=undefined && obj.color != undefined && obj.info !=undefined ){
          setIngredients_info(obj.ingredients);
          setInfo(obj.info);
          setColor(obj.color);
        }
        else{
          Alert.alert('Aucune info de ce plat !');
        }
    }
    else{
      console.log("Pas de bon id de plat route : (Details/[id])");
    }
  }

  useEffect(() => { 
    load();
  },[]);
  return (
      <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.link}>
          <AntDesign name="arrowleft" size={24} color="black" onPress={retour} />
        </View>
      <Text style={styles.headerText}> Details </Text>
      </View>
   
        <View style={styles.container1}>
        {/* {img != null ? <></>: <Image style={styles.image} source={img}/>} */}
        <View style={{ backgroundColor: color, ...styles.Info}}>
        <Text style={styles.title}>{info?.Nom}</Text>
        {/* <Text style={styles.text}>{info?.categorie}</Text> */}
        <Text style={{...styles.title}}>{info?.Score}</Text>
        <Text style={styles.text}>{info?.Unite}</Text>
        </View>
        <View style={styles.Ingres}>
          <Text style={styles.text1}>Impact Score par Ingredient :</Text>
          <ScrollView horizontal={false} scrollEnabled={true} contentContainerStyle={styles.containerElement} showsVerticalScrollIndicator={true}>
            {ingredients_info.map((a,i) =>(
              <View key={i}><Text style={styles.ing}key={i}>{a[0]} :</Text> 
              <ProgressBar progress={a[1]} /></View>
            ))}
          </ScrollView>
        </View>
        </View>
      </View>
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
  header: {
    flexDirection: "row",
    // justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "white",
    // alignItems: "center",
  },
  Info : {
    width: "90%",
    height: "30%",
    borderRadius: 10,
    marginHorizontal: 5,
    // backgroundColor : "white",
    alignItems: "center",
    margin : 5,
    marginBottom : 10,
  },
  Ingres : {
    width: "90%",
    height: "50%",
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor : 'grey',
    margin : 5,
    marginBottom : 10,
    paddingBottom : "8%",
  },
  container : {
    top : "2%",
    height : "100%",
    paddingBottom : "1%",
    marginBottom : "5%",
  },
  containerElement: {
    paddingVertical: 10,
    flexGrow: 1,
    // alignItems: "center",
    backgroundColor : "white",
    // flexDirection : "column",
    // alignItems: "center",
  },
    container1: {
      // top : "1%",
      alignItems: "center",
      height: "100%",
      // padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      // marginTop: 10,
      margin : "3%",
      alignContent: "center",
    },
    link: {
      left : 0,
      right : "100%",
      top : 5,
      marginTop: 15,
      margin : 20,
      paddingVertical: 15,
    },
    headerText : {
      top : 29,
      fontSize: 22,
      fontWeight: "bold",
      margin : 2,
      color : "black",
    },
    text1 :{
      alignContent: "center",
      fontSize: 15,
      fontWeight: "bold",
      marginTop : 10,
      left : 10,
      marginBottom: 10,
    },
    text :{
      alignContent: "center",
      fontSize: 15,
      fontWeight: "bold",
      marginTop : 10,
      marginBottom: 10,
    },
    ing : {
      // display: "flex",
      // flexDirection : "row",
      width: "100%",
      // alignItems : "center",
      fontSize : 15,
      fontWeight : "bold",
      marginLeft : "5%",
      marginTop : 10,
      marginBottom : "2%",
    },
});
