import React, { useState } from "react";
import {ScrollView, StyleSheet, TextInput,Text} from "react-native";
import {View } from "./Themed";

export default function Det({id}:{id:String}) {
    /* TODO getinfo par id */
  return (
    <View style={styles.overlay}>
      <View style={styles.menu}>
        {/* <Text style={styles.title}>Details of {id}</Text> */}
        <Text style={styles.menuText}>Menu</Text>
        <Text style={styles.menuText}>Option 1</Text>
        <Text style={styles.menuText}>Option 2</Text>
        <Text style={styles.menuText}>Option 3</Text>
      </View>
      </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
    image: {
      width: 120,
      height: 120,
      borderRadius: 10,
      marginHorizontal: 5,
      backgroundColor : 'black',
      margin : 5,
    },
      // container: {
      //   flex: 1,
      //   // backgroundColor : "black",
      //   paddingVertical: 60,
      // },
        absoluteContainer: {
          position: "absolute",
          top: 20,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 300,
          backgroundColor : "black"
        },
        overlay: {
          position: "absolute",
          left: 0,
          top : 20,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        menu: {
          width: "50%",
          height: "100%",
          backgroundColor: "white",
          padding: 20,
          elevation: 5,
        },
        menuText: {
          fontSize: 16,
          marginBottom: 10,
        },
        text : {
          fontSize: 22,
          fontWeight: "bold",
          margin : 2
        }
});