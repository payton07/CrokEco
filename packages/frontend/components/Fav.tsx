import React, { useEffect, useState } from "react";
import {StyleSheet, View,Text} from "react-native";
import {Image} from "expo-image"
import { Link} from "expo-router";
import {images} from "@/utils/picture";

export default function Fav({ out }: { out: any }) {
  const [img, setImg] = useState(images.github);
  const info = out?.info;
  const ide = info?.id;
  const color = out?.color;
  return (
    <Link href={`/(hidden)/details/${ide}`} style={styles.image}>
      <View style={styles.container}>
      {img != null ? <></>: <Image style={styles.image} source={img}/>}
      <View style={{ backgroundColor: color , ...styles.Info}}>
      <Text style={styles.title}>{info?.Nom}</Text>
      <Text style={{...styles.title}}>{info?.Score}</Text>
      <Text style={styles.text}>{info?.Unite}</Text>
      </View>
      </View>
  </Link>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    // marginHorizontal: 5,
    // backgroundColor : 'black',
    margin : 5,
    left : 10,
  },
  text :{
    fontSize: 8,
    fontWeight: "bold",
    left : 1,
    marginTop : 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 9,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft : 5,
    marginRight : 5,
  },
  // title1: {
  //   fontSize: 10,
  //   fontWeight: "bold",
  //   marginTop: 10,
  // },
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  Info : {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
    marginBottom : 10,
  },
});
