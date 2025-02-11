import React, { useState } from "react";
import {StyleSheet} from "react-native";
import {View,Text } from "./Themed";
import {Image, useImage} from "expo-image"

export default function Fav({ value }: { value: string }) {
      const img = require('@/assets/images/image.png');
  return ( <Image style={styles1.image} source={img}/> );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 5,
  }
});
const styles1 = StyleSheet.create({
  homeScreenFilename:{
      margin: 100,
      paddingHorizontal: 10,
      paddingBottom: 10,
      borderRadius: 25,
      borderWidth: 1,
      alignItems: 'center',
      borderColor: '#000',
      width : 300,
    //   top : 10,
      bottom : 100,
      position : "relative",
  },
  image: {
    flex: 1/2,
    width: '100%',
    height:'50%',
    backgroundColor: 'black',
  },
});