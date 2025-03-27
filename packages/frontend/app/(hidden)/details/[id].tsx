import React, { useEffect, useState } from "react";
import {StyleSheet, View,Text, ScrollView} from "react-native";
import { Image} from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import { getIngredients, getPlats, getSous_Groupes } from "@/utils/bdd";
import { images } from "@/utils/picture";
import * as FileSystem from 'expo-file-system';
import { set } from "zod";
import ProgressBar from "@/components/progressBar";
import Info from '../../(tabs)/vote';
type info_t =  {Nom : string ,categorie : string , Score : string , Unite : string};
// const imagePath = FileSystem.documentDirectory;
// const end = ".png";

function Qualite(score : number) {
  if (score <= 1) {
    return "Green";
  }
  if (score >1 && score <=5) {
    return "Orange";
  }
  return "Red";
}
// boeuf
export default function details() {
  const [img, setImg] = useState<string|null>("@/assets/ingImage.image.png");
  const [info, setInfo] = useState<info_t>();
  const [ing,setIng] = useState([]);
  const [back, setBack] = useState("black");
  // {}
  const params = useLocalSearchParams(); 
  function retour() {
    router.push({ pathname: `/(tabs)/research`});
  }
  useEffect(() => {
    // console.log("sur details id : ",params.id);
    
    /**
     * TODO Faire un gros import des images pour aleger le chargement 
     * EXEMPLE : 
     */
    async function change(){
      const ras = await getPlats({Ciqual_AGB : params.id},false,true);
      const res = await getIngredients({Ciqual_AGB : ras?.at(0)?.Ciqual_AGB},true);
      const sous_groupe = await getSous_Groupes({ID_sous_groupe : ras?.at(0)?.ID_sous_groupe});
      
      // console.log("Ingredient : ", res?.at(0));
      
      if(res !=undefined){
        // Nom 
        // categorie Sous-groupe d'aliment
        // Score Score unique EF
        // Unite ???
        let score : number = 0;
        let obj : any = [];
        for (const ele of res) {
          score += ele.Changement_climatique;
        }
        for (const ele of res) {
          obj.push([ele.Ingredient,[((ele.Changement_climatique / score )*100).toPrecision(3),Qualite(ele.Changement_climatique)]]);
        }
        // console.log("l'objet est : ",obj);
        
        setIng(obj);
        
        const info :info_t = {Nom: ras?.at(0).Nom_Francais, categorie: sous_groupe?.at(0).Sous_groupe_d_aliment, Score: score.toPrecision(3), Unite:"kg CO2 eq/kg de produit"};
        const as = res?.at(0).Ingredient;
        setInfo(info);
        // console.log("je set info ",info);
        setBack(Qualite(score));
        

        // const name = images.ele; 
        
        // const n = "Carotte";
        // console.log(as);
        // const fin = `${imagePath}${as}${end}`;
        // // const imageUrl = "@/assets/ingImages/"+as;
        // const imageUrl = "http://localhost:8888/"+as;
        // // const fin = require(imageUrl);
        // // setImg(fin);

        // const fileInfo = await FileSystem.getInfoAsync(fin);
        // // TODO : ligne de delete à enlever potentielement
        // await FileSystem.deleteAsync(fin, { idempotent: true }); 
        // // await reloadImage(fin,imageUrl)
        // if (fileInfo.exists) {
        //   console.log("l'image exists",fileInfo.size);
        //   setImg(fin);
        //   return ;
        // }

        // console.log("Suppression de l'ancienne image...");
        // await FileSystem.deleteAsync(fin, { idempotent: true });
  
        // console.log("Téléchargement de l'image...");
        // const downloadResumable = FileSystem.createDownloadResumable(imageUrl, fin);
  
        // try {
        //   const { uri } = await downloadResumable.downloadAsync();
        //   console.log("Téléchargement terminé :", uri);
        //   setImg(uri);
        // } catch (error) {
        //   console.error("Erreur lors du téléchargement :", error);
        // }
      }
      else{
        console.log("Erreur : pas de score");
      }
    }

    change();
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
        {img != null ? <></>: <Image style={styles.image} source={img}/>}
        <View style={{ backgroundColor: back === "Green" ? "#4CAF50" : back === "Orange" ? "orange" :"red", ...styles.Info}}>
        <Text style={styles.title}>{info?.Nom}</Text>
        <Text style={styles.text}>{info?.categorie}</Text>
        <Text style={{...styles.title}}>{info?.Score}</Text>
        <Text style={styles.text}>{info?.Unite}</Text>
        </View>
        <View style={styles.Ingres}>
          <Text style={styles.text1}>Impact Score par Ingredient :</Text>
          <ScrollView horizontal={false} contentContainerStyle={styles.containerElement} showsVerticalScrollIndicator={true}>
            {ing.map((a,i) =>(
              <View key={i}><Text style={styles.ing}key={i}>{a[0]} :</Text> 
              <Text key={i+1} style={styles.ing}><ProgressBar progress={a[1]} /></Text></View>
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
    backgroundColor : 'white',
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
    alignItems: "center",
    backgroundColor : "white",
    flexDirection : "column",
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
      display: "flex",
      flexDirection : "row",
      alignItems : "center",
      fontSize : 15,
      fontWeight : "bold",
      marginLeft : "5%",
      marginTop : 10,
      marginBottom : "2%",
    },
});
