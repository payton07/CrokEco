import React, { useEffect, useState } from "react";
import {StyleSheet, View,Text, ScrollView} from "react-native";
import { Image} from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import Textshow from "@/components/Textshow";
import { change} from "@/utils/other";
import { getPlats, getRecherches_Historique, getRestaurants_Historique } from "@/utils/bdd";
type info_t =  {Nom : string ,categorie : string , Score : string , Unite : string};

export default function menus() {
  // const [img, setImg] = useState<string|null>("@/assets/ingImage.image.png");
  const [isloaded, setIsloaded] = useState(false);
  const [plats , setPlats] = useState<any[]>([]);
  // {}
  const params = useLocalSearchParams(); 
  function retour() {
    router.push({ pathname: `/(tabs)/research`});
  }
  async function FormatDataPlatReconnu(data : string[]){
    const lines = [];
    for (const ligne of data) {
      const query = `${ligne}`;
      try {
        const res = await getPlats({Nom_plat: query},false,true,1);
        if(res != undefined && res.length > 0 && res != null){
          const id = res[0].ID_plat;
          const color = await change(id);
          lines.push({"text":ligne,color:color?.back,"id":id});
        }
        else{
          lines.push({"text":ligne,color:"black","id":null});
        }
      }
      catch (error) {
        console.error("Erreur lors de la récupération des plats:", error);
      }
    }
    return lines;
  }

  async function loadsplats(){
    console.log("CALL LoadsPlat");
    
    if (typeof params.ID_menu === "string" && typeof params.ID_restaurant === "string") {
      console.log("TYPE CORRECT");
      
      const ID_menu = parseInt(params.ID_menu);
      const ID_restaurant = parseInt(params.ID_restaurant);
      const resto = await getRestaurants_Historique({'ID_restaurant':ID_restaurant},true,false,1);
      console.log("GETTED RESTO");
      
      const recherche = await getRecherches_Historique({'ID_restaurant':ID_restaurant,'ID_menu':ID_menu});

      console.log("GETTED recherche");
      const textrequested = recherche?.at(0).Text_request;
      console.log("GO analyse");
      
      const lines = await FormatDataPlatReconnu(textrequested);

      console.log("LE SETT");
      
      setPlats(lines);
      console.log("SET");
      
    }
    else{
      console.log('PB de type');
    }
  }

  // useEffect(()=>{
  //   loadsplats();
  // },[]);

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.link}>
            <AntDesign name="arrowleft" size={24} color="black" onPress={retour} />
          </View>
          <Text style={styles.headerText}> Menu {params.id}</Text>
        </View>

        {isloaded ?
            <View style={styles.RecongnitionContainer}>
              <Text style={styles.title1}>Text Reconnu : </Text>

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
    alignItems: "center",
    justifyContent: "center",
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
    alignSelf : 'center',
    alignContent : 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderBlockColor: 'black',
    // borderColor: 'black',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    width: "100%",
    height: "60%",
    // elevation: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    // bottom: 20,
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
    // title: {
    //   fontSize: 20,
    //   fontWeight: "bold",
    //   // marginTop: 10,
    //   margin : "3%",
    //   alignContent: "center",
    // },
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
