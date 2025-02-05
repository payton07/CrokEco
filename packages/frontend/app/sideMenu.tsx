import React from "react";
import { StyleSheet } from "react-native";

import { ExternalLink } from "../components/ExternalLink";
import { MonoText } from "../components/StyledText";
import { Text, View } from "../components/Themed";

import Colors from "@/constants/Colors";

export default function SideMenu({ path }: { path: string }) {
  console.log("appel à sidemenu");
  
  return (
    <View style={styles.cet}>
      <View style={styles.homeScreenFilename}>
        <Text >
          Ici la side page !!! 
        </Text>
      </View>
      <View style={styles.helpContainer}>
        <ExternalLink
          style={styles.helpLink}
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
        >
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Tap here if your app doesn't automatically update after making
            changes
          </Text>
        </ExternalLink>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cet: {
    position : "relative",
    width: "50%",
    height:"100%",
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
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
