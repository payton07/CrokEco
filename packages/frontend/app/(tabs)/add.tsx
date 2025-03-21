import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AddDishForm from "@/components/AddPlatForm";

export default function Add() {
  return (
    <SafeAreaProvider>
    <AddDishForm />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
container:{
    paddingTop: 10,
    backgroundColor: "white",
    // marginBottom: "73%",
    // paddingBottom: "83%",
},
  text: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 2,
    color: "black",
    alignSelf: "center",
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
});
