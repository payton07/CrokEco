import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ProgressBar = ({ progress }: { progress: any[] }) => {
  // console.log("progress",progress);
  
  return (
    <View style={styles.progressBar}>
      <View style={{backgroundColor: progress[1] === "Green" ? "#4CAF50" : progress[1] === "Orange" ? "orange" :"red",...styles.progress, width: `${progress[0]}%` }}><Text style={{marginLeft:15,width:70,fontSize:15}}>{`${progress[0]}%`}</Text></View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: "90%",
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    // backgroundColor: "#4CAF50",
  },
});

export default ProgressBar;
