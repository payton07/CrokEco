import React from "react";
import { StyleSheet } from "react-native";

import { ExternalLink } from "./ExternalLink";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

import Colors from "@/constants/Colors";

export default function SideMenu({ path }: { path: string }) {
  console.log("appel à sidemenu");
  
  return (
    <View style={styles.cet}>
      <View style={styles.homeScreenFilename}>
        <Text >
          Ici la side page !!! 
          Ici la side page !!! 
          Ici la side page !!! 
          Ici la side page !!! 
          Ici la side page !!! 
          Ici la side page !!! 
          Ici la side page !!! 
          Ici la side page !!! 
          Ici la side page !!! 
          Ici la side page !!! 
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cet: {
    position :"fixed",
    width: 200,
    height:2000,

  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
    color : "yellow"
  },
  homeScreenFilename: {
    marginVertical: 7,
    alignItems : "center"
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
