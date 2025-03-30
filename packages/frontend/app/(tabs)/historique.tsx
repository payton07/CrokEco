import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TextRecognition from "@react-native-ml-kit/text-recognition";
import { getMenus, getMenus_Historique, getPlats, getRecherches_Historique } from "@/utils/bdd";
import { change } from "@/utils/other";
import Textshow from "@/components/Textshow";
import MenuHistory from "@/components/MenuHistory";
import { useFocusEffect } from '@react-navigation/native';

export default function History() {
  const [menus ,setMenus] = useState<any[]>([]);
  const [isloaded,setIsloaded] = useState(false);
  
  async function getloadsMenus(){
    const MENUS = await getMenus_Historique(false,true,false,false);
    console.log("Menus :",MENUS);
    
    if(MENUS !=undefined) {
      if(MENUS.length > 0) {setMenus(MENUS); setIsloaded(true);}
      else{setMenus([]);setIsloaded(false);}
    }
  }
  
  useFocusEffect(
    useCallback(()=>{
      getloadsMenus();
    },[])
  );

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Page des Historiques </Text>
          <View style={styles.RecongnitionContainer}>
            <Text style={styles.title1}>Vos Menus : </Text>

            {menus && isloaded? 
              menus.map((ligne,i)=>{
                return <MenuHistory key={i} ligne={ligne} />
              })
              : 
              <Text style={styles.textcenterize}>Aucun Menu </Text>
            }
          </View>
      </View>
    </SafeAreaProvider>
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
  textcenterize: {
    fontSize: 16,
    color: "black",
    alignSelf : "center",
    top : 100
  },
});
