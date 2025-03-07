import React, { useEffect, useState } from "react";
import {ScrollView, StyleSheet, TextInput,Text, ActivityIndicator} from "react-native";
import {View } from "./Themed";
import Fav from './Fav';

export default function Suggestion({ loads }: { loads : any[] }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>
        <Text style={styles.title2}>   Suggestion</Text>
        </Text>
        {/* contentContainerStyle={styles.container}  */}
      <ScrollView contentContainerStyle={styles.container} horizontal={false} scrollEnabled={true} showsVerticalScrollIndicator={true}>
        <View style={styles.grid}>
          {loads.map((a,i) => (
            <Fav key={i} out={a}/>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
    wrapper: {
      marginBottom: 10,
      backgroundColor : "#C0F3F0",
      // "#C0F3F0",
    },
    title: {
        backgroundColor : "white",
        paddingVertical : 10,
        borderBlockColor : "black",
      },
      title2: {
        fontSize: 18,
        fontWeight: "bold",
        color : "black",
        marginBottom: 5,
        textAlign : "left",
        marginLeft : 5,
        backgroundColor : "white"
      },
    container: {
      paddingVertical: 10,
      flexGrow: 1,
      alignItems: "center",
      backgroundColor : "white",
      // minHeight: "50%",
      // flexDirection: "column",
      // paddingBottom : 100,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      backgroundColor : "#C0F3F0",
    },
  });