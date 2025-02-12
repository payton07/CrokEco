import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import {Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import SideMenu from '@/app/sideMenu';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

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
          headerRight: () => (
            <Link href="../sideMenu" asChild>
            <Pressable>
            {({pressed})=>(
              pressed ?<>
              <SideMenu path="app/(tabs)/index.tsx" />
              </> : <>
              <Ionicons name="menu" size={24} color="black" />
              </>
          )}
            </Pressable> 
            </Link>
            ),
        }}
      />
      <Tabs.Screen
        name="research"
        options={{
          title: "Research ",
          tabBarIcon: ({ color }) => <Ionicons name="search-sharp" size={24} color={color} />,
          headerRight: () => (
            <Link href="../sideMenu" asChild>
            <Pressable>
            {({pressed})=>(
              pressed ?<>
              <SideMenu path="app/(tabs)/scanner.tsx" />
              </> : <>
              <Ionicons name="menu" size={24} color="black" />
              </>
          )}
            </Pressable> 
            </Link>
            ),
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: "info",
          tabBarIcon: ({ color }) => <FontAwesome5 name="info-circle" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
