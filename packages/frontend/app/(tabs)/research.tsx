import { StyleSheet, TextInput } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import React from "react";
import Searcher from "@/components/Searcher";
import Favoris from "@/components/Favoris";

export default function Research(this: any) {
  return (
    <View style={styles.container}>
      <Searcher path="app/(tabs)/research.tsx"/>
      <Favoris path="app/(tabs)/research.tsx"/>
      <EditScreenInfo path="app/(tabs)/research.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor :" black",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
