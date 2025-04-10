import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { View } from "./Themed";

export default function Searcher({ path }: { path: string }) {
  const [text, setText] = useState("");
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <TextInput
          style={styles1.homeScreenFilename}
          onChangeText={setText}
          value={text}
          placeholder="Search..."
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    // alignItems: "center",
    marginHorizontal: 5,
  },
});
const styles1 = StyleSheet.create({
  homeScreenFilename: {
    margin: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 25,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#000",
    width: 300,
    top: 10,
    bottom: 100,
    position: "relative",
  },
});
