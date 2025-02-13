import { StyleSheet} from "react-native";
import { View } from "@/components/Themed";
import React from "react";
import Searcher from "@/components/Searcher";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Suggestion from "@/components/Suggestion";

export default function favoris(this: any) {
  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <Searcher path="app/(tabs)/research.tsx"/>
      <Suggestion path="app/(tabs)/research.tsx"/>
    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : "black"
  },
});
