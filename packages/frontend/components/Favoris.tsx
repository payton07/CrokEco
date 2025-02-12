import React, { useState } from "react";
import {StyleSheet, TextInput,} from "react-native";
import {View } from "./Themed";
import Fav from "./Fav";

export default function Favoris({ path }: { path: string }) {
    // const load = fetchfavoris({});
    const loads = {"first":"21"};
  return (<>
            {
            <>
            <Fav value={loads?.first} /></>}
            </>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    // alignItems: "center",
    marginHorizontal: 5,
  }
});
const styles1 = StyleSheet.create({
  homeScreenFilename:{
      margin: 20,
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
});