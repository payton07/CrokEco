import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

import React, { ReactNode, useState } from "react";
import { ScrollView, Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { hide } from 'expo-splash-screen';

export default function TabLayout() {
  const colorScheme = useColorScheme();
<MaterialCommunityIcons name="line-scan" size={24} color="black" /> 
  return (
    <Tabs

      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Scanner",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="line-scan" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="research"
        options={{
          title: "Research ",
          tabBarIcon: ({ color }) => <Ionicons name="search-sharp" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: "info",
          tabBarIcon: ({ color }) => <FontAwesome5 name="info-circle" size={24} color="black" />, 
          headerShown: false,
        }}
      />
      {/* <Tabs.Screen
        name="(hidden)"
        options={{
          title: "hidden",
          tabBarIcon: ({ color }) => <FontAwesome5 name="info-circle" size={24} color="black" />, 
          headerShown: false,
          tabBarIconStyle : {display : 'none'}
          // tabBarStyle: {display : 'none'}
          
        }}
      /> */}
    </Tabs>
  );
}


const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    paddingVertical: 10,
    alignItems: "center",
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
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // justifyContent: "flex-end",
    // alignItems: "flex-end",
  },
  menu: {
    width: "50%",
    height: "100%",
    backgroundColor: "white",
    padding: 20,
    elevation: 10,
  },
  menuText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
