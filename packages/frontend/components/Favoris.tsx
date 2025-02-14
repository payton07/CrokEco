import React, { useEffect, useState } from "react";
import {ScrollView, StyleSheet, TextInput,Text} from "react-native";
import {View } from "./Themed";
import Fav from './Fav';
import { getIngredients } from "@/utils/libs";

export default function Favoris({ path }: { path: string }) {
  const [loads ,setloads] = useState<any[]>([]);
  useEffect(() => {
    async function setup() {
      const loa = await getIngredients();
      setloads(loa);
      console.log(loa.length);
    }
    setup();
  }, []);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>
        <Text style={styles.title2}>   Favoris </Text>
        </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.container}>
      {loads.map((a) => (
        <Fav key={a.ID_ingredient} id={a.ID_ingredient}/>
      ))}
    </ScrollView>
  </View>
  );
}



const styles = StyleSheet.create({
  wrapper: {
    backgroundColor : "#C0F3F0",
  },
  title: {
    backgroundColor : "white",
    paddingVertical : 10,
    borderBlockColor : "black",
    margin : 0,
    marginVertical : 10
    // marginLeft : 16
  },
  title2: {
    fontSize: 18,
    fontWeight: "bold",
    color : "black",
    marginBottom: 5,
    textAlign : "left",
    marginLeft : 50,
    backgroundColor : "white"
  },
  container: {
    paddingVertical: 10,
  },
});