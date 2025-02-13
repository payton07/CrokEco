import React, { useState } from "react";
import {ScrollView, StyleSheet, TextInput,Text} from "react-native";
import {View } from "./Themed";
import Fav from './Fav';

export default function Suggestion({ path }: { path: string }) {
    // const loads = fetchSuggestion({});
    const loads  = [{"first":"1"},{"first":"2"},{"first":"3"},{"first":"4"},{"first":"5"},{"first":"6"},{"first":"7"},{"first":"8"},{"first":"9"}];
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>
        <Text style={styles.title2}>   Suggestion</Text>
        </Text>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {loads.map((a) => (
            <Fav key={a.first} value={""} />
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
      alignItems: "center",
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 10,
      margin: 5,
    },
  });