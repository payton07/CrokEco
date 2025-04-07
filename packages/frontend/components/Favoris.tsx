import React, { useState } from "react";
import {ScrollView, StyleSheet,Text, ActivityIndicator} from "react-native";
import {View } from "./Themed";
import Fav from './Fav';

export default function Favoris({ loads }: { loads: any[] }) {
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>
        <Text style={styles.title2}>   Favoris </Text>
        </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} style={styles.container}>
        {loading ?<ActivityIndicator size="large" color="#0000ff" /> :
      loads.map((a,i) =>( <Fav key={i} out={a}/> ))}
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
    margin : 0,
  },
  title2: {
    fontSize: 18,
    fontWeight: "bold",
    color : "black",
    marginBottom: 5,
    textAlign : "left",
    marginLeft : 50,
    // backgroundColor : "white"
  },
  container: {
    paddingVertical: 10,
  },
});