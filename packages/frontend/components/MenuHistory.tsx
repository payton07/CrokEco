import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View,TouchableOpacity,Text} from "react-native";

function switchToMenu(objet : any[]){
  router.push({ pathname: `/(hidden)/menus/[id]`, params: { id: objet.at(0), ID_menu: objet.at(0), ID_restaurant: objet.at(1)}});
}

export default function MenuHistory({ligne} : {ligne: {ID_menu: number, ID_restaurant : number, NomMenu : string}}){

  function call(){
    if(ligne.ID_menu === null) return;
    switchToMenu([ligne.ID_menu,ligne.ID_restaurant]);
  }
  
  return (<View style={styles.reco}>
              <TouchableOpacity style={styles.reco} onPress={call}>
              <Text style={styles.text}>{ligne.NomMenu}{ligne.ID_menu}</Text><FontAwesome style={styles.star} name="star" size={24} color="black" />
              </TouchableOpacity>
          </View>
  );
}

const styles = StyleSheet.create({
text: {
    fontSize: 16,
    color: "black",
    },
star : {
    right : 40,
    },
reco : {
    flexDirection : "row",
    justifyContent : "space-between",
    alignItems : "center",
    width : "100%",
    },
});