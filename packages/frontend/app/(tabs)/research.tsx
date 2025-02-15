import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import React, { useEffect, useState } from "react";
import Searcher from "@/components/Searcher";
import Favoris from "@/components/Favoris";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Suggestion from "@/components/Suggestion";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SQLiteProvider } from "expo-sqlite";

export default function Research(this: any) {
  const [menuVisible, setMenuVisible] = useState(false);
  useEffect(()=>{

  },[menuVisible])
  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <Ionicons name="menu" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.text}> Research</Text>
      </View>
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
        )}
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
    paddingVertical: 60,
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
      top: 100,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 10,
      backgroundColor : "black"
    },
    overlay: {
      position: "absolute",
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
    text : {
      fontSize: 22,
      fontWeight: "bold",
      margin : 2
    }
  });
  