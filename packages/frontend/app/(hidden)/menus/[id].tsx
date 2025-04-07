import React, {useEffect, useState } from "react";
import {StyleSheet, View,Text,} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, useLocalSearchParams } from "expo-router";
import Textshow from "@/components/Textshow";
import { FormatDataPlatReconnu} from "@/utils/other";
import {getRecherches_Historique, getRestaurants_Historique } from "@/utils/bdd";

export default function menus() {
  const [isloaded, setIsloaded] = useState(false);
  const [plats , setPlats] = useState<any[]>([]);
  const params = useLocalSearchParams(); 

  // Fonction pour retourner à la page précédente
  // ou à la page d'historique
  function retour() {
      router.push({ pathname: `/(tabs)/historique`});
  }

  // Fonction pour charger les plats reconnus dans le menu
  async function loadsplats(){
    if (typeof params.ID_menu === "string" && typeof params.ID_restaurant === "string") {
      
      const ID_menu = parseInt(params.ID_menu);
      const ID_restaurant = parseInt(params.ID_restaurant);
      const resto = await getRestaurants_Historique({'ID_restaurant':ID_restaurant},true,false,1);
      
      const recherche = await getRecherches_Historique({'ID_menu':ID_menu});
      
      const textrequested : any[]= JSON.parse(recherche?.at(0).Text_request);

      const texts = [];
      for(const obj of textrequested){texts.push(obj.text);}
      const lines = await FormatDataPlatReconnu(texts);
      
      setPlats(lines);
      setIsloaded(true);
      
    }
    else{
      console.log('PB de type');
    }
  }

  useEffect(()=>{
    loadsplats();
  },[]);

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.link}>
            <AntDesign name="arrowleft" size={24} color="black" onPress={retour} />
          </View>
          <Text style={styles.headerText}> Menu </Text>
          {/* <Text style={styles.headerText}> Menu {params.ID_menu}</Text> */}
        </View>

        {isloaded ?
            <View style={styles.RecongnitionContainer}>
              <Text style={styles.title1}>Plats : </Text>

              {plats ? 
                plats.map((ligne,i)=>{
                  return <Textshow key={i} ligne={ligne} />
                })
                : 
                <Text style={styles.text}>Aucun texte reconnu</Text>
              }
            </View>
          : 
            <Text style={styles.text}></Text>
        }
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  title1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    alignSelf : "center",
  },
  RecongnitionContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 12,
    width: "80%",
    height: "auto",
  },
  text: {
    fontSize: 16,
    color: "black",
  },
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
  // container : {
  //   top : "2%",
  //   height : "100%",
  //   paddingBottom : "1%",
  //   marginBottom : "5%",
  // },
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
    link: {
      left : 0,
      right : "100%",
      top : 0,
      marginTop: 15,
      margin : 20,
      flexDirection: "row",
      paddingVertical: 15,
    },
    headerText : {
      top : 24,
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
    // text :{
    //   alignContent: "center",
    //   fontSize: 15,
    //   fontWeight: "bold",
    //   marginTop : 10,
    //   marginBottom: 10,
    // },
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
