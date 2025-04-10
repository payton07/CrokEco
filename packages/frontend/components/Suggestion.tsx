import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  ActivityIndicator,
} from "react-native";
import { View } from "./Themed";
import Fav from "./Fav";
import { Fond_vert_clair, Vert_C } from "@/utils/constants";

export default function Suggestion({ loads }: { loads: any[] }) {
  // console.log("Suggestion loads",loads);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>
        <Text style={styles.title2}> Suggestion</Text>
      </Text>
      {/* contentContainerStyle={styles.container}  */}
      <ScrollView
        contentContainerStyle={styles.container}
        style={{ maxHeight: 500 }}
        horizontal={false}
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.grid}>
          {loads.map((a, i) => (
            <Fav key={i} out={a} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
    // backgroundColor : "#C0F3F0",
    backgroundColor: `${Fond_vert_clair}`,
    // "#C0F3F0",
  },
  title: {
    backgroundColor: Vert_C,
    paddingVertical: 10,
    borderBlockColor: "black",
  },
  title2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
    textAlign: "left",
    marginLeft: 5,
    backgroundColor: Vert_C,
  },
  container: {
    paddingVertical: 10,
    // flexGrow: 1,
    alignItems: "center",
    backgroundColor: `${Fond_vert_clair}`,
    // minHeight: "50%",
    // flexDirection: "column",
    // paddingBottom : 100,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    backgroundColor: `${Fond_vert_clair}`,
  },
});
