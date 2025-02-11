import React, { useState } from "react";
import {StyleSheet} from "react-native";
import {View,Text } from "./Themed";
import {Image} from "expo-image"

export default function Fav({ value }: { value: string }) {
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  return (
      <View>
          <View style={styles.getStartedContainer}>
          <Image
            style={styles1.image}
            source="https://picsum.photos/seed/696/3000/2000"
            placeholder={{ blurhash }}
            contentFit="fill"
            transition={1000}/>
            <Text>
                {value}
            </Text>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    // alignItems: "center",
    marginHorizontal: 5,
  }
});
const styles1 = StyleSheet.create({
  homeScreenFilename:{
      margin: 100,
      paddingHorizontal: 10,
      paddingBottom: 10,
      borderRadius: 25,
      borderWidth: 1,
      alignItems: 'center',
      borderColor: '#000',
      width : 300,
    //   top : 10,
      bottom : 100,
      position : "relative",
  },
  image: {
    flex: 1,
    width: '10%',
    backgroundColor: '#000',
  },
});