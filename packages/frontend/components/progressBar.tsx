import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ProgressBar = ({ progress }: { progress: any[] }) => {
  
  return (
    <View style={styles.progressBar}>
      <View style={{backgroundColor: progress[1] ,...styles.progress, width: `${progress[0]}%`}}>
        <Text style={{fontSize:15}}>{`${progress[0]}%`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: "90%",
    height: 20,
    backgroundColor: "grey",
    borderRadius: 10,
    overflow: "hidden",
    marginLeft: 20,
  },
  progress: {
    height: "100%",
    alignItems: "center",
  },
});

export default ProgressBar;
