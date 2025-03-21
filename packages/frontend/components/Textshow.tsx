import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View,TouchableOpacity,Text} from "react-native";
import { set } from 'zod';

function switchToDetails(ide : number){
  router.push({ pathname: `/(hidden)/details/[id]`, params: { id: ide}});
}

export default function Textshow({ligne} : {ligne: {text: string, color: string,id : number | null}}){

  function call(){
    if(ligne.id === null) return;
    switchToDetails(ligne.id);
  }
  
  return (<View style={styles.reco}>
              <TouchableOpacity style={styles.reco} onPress={call}>
              <Text style={styles.text}>{ligne.text}</Text><FontAwesome style={styles.star} name="star" size={24} color={ligne.color} />
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