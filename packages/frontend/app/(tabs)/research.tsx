import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import Searcher from "@/components/Searcher";
import Favoris from "@/components/Favoris";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Suggestion from "@/components/Suggestion";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Research(this: any) {
  // const [menuVisible, setMenuVisible] = useState(false);
  return (
    <SafeAreaProvider>
    <View style={styles.container}>
          {/* <TouchableOpacity style={styles.header} onPress={() => setMenuVisible(!menuVisible)}>
            <Ionicons name="menu" size={30} color="black" />
          </TouchableOpacity>
        {menuVisible && (
          <View style={styles.absoluteContainer}>
          <View style={styles.overlay}>
          <View style={styles.menu}>
            <Text style={styles.menuText}>Menu</Text>
            <Text style={styles.menuText}>Option 1</Text>
            <Text style={styles.menuText}>Option 2</Text>
            <Text style={styles.menuText}>Option 3</Text>
          </View>
          </View>
          </View>
        )} */}
        <Searcher path="app/(tabs)/research.tsx"/>
        <Favoris path="app/(tabs)/research.tsx"/>
        <Suggestion path="app/(tabs)/research.tsx"/>
    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor : "black",
  },
    header: {
      flexDirection: "row",
      // justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: 20,
      // alignItems: "center",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
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
    absoluteContainer: {
      position: "absolute",
      top: 35,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 10,
    },
    overlay: {
      position: "absolute",
      top: 35,
      left: 0,
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
  });
  