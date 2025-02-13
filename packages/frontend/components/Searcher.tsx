import React, { useState } from "react";
import {StyleSheet, TextInput,} from "react-native";
import {View } from "./Themed";

export default function Searcher({ path }: { path: string }) {
  const [text, setText] = useState("");
  return (
      <View>
          <View style={styles.getStartedContainer}>
            <TextInput style={styles1.homeScreenFilename} onChangeText={setText} value={text} placeholder="Search..." />
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    marginHorizontal: 5,
    alignItems: 'center',
  }
});
const styles1 = StyleSheet.create({
  homeScreenFilename:{
      margin: 20,
      paddingHorizontal: 15,
      borderRadius: 25,
      borderWidth: 3,
      alignItems: 'center',
      borderColor: '#000',
      width : 380,
      height : 40,
      position : "relative",
      backgroundColor : "white",
  },
});