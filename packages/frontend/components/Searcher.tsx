import React, { useEffect, useState } from "react";
import {Button, StyleSheet, TextInput,} from "react-native";
import {View } from "./Themed";
import { getPlats } from "@/utils/bdd";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Searcher({ path }: { path: string }) {
  const [text, setText] = useState("");
    function setSres() {
      search(text);
    }
    async function search(e:string) {
      let s = `%${e}%`;
      const resa = await getPlats({Nom_Francais: s},false,true,10);
      // TODO : A adapter pour les cas ou y a plusieurs resultats
      router.push({ pathname: `/(hidden)/details/[id]`, params: { id: resa?.at(0)?.Ciqual_AGB}});
    }
    
  return (
      <View>
          <View style={styles.getStartedContainer}>
            <TextInput style={styles1.homeScreenFilename} onChangeText={setText} onEndEditing={setSres} placeholder="  Search..."></TextInput>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
const styles1 = StyleSheet.create({
  homeScreenFilename:{
      marginTop: 10,
      marginBottom: 10,
      // color : "black",
      // marginLeft: 20,
      // paddingHorizontal: 15,
      borderRadius: 15,
      borderWidth: 1,
      alignItems: 'center',
      borderColor: '#000',
      width : "85%",
      // left : 10,
      height : 40,
      position : "relative",
      backgroundColor : "white",
  },
});