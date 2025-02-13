import React, { useState } from "react";
import {StyleSheet, View,Text, Dimensions, Pressable, TouchableOpacity} from "react-native";
import {Image} from "expo-image"
import { Link } from "expo-router";

export default function Fav({ id }: { id: string }) {
  const [img, setImg] = useState(require('@/assets/images/image.png'));
  // const [page,setPage] = useState(false);

  function change(){
    setImg(id)
  }
  return (
    <Link href={"/(hidden)/details/[{id}]"} style={styles.image}>
    <Image style={styles.image} source={img}/>
  </Link>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor : 'black',
    margin : 5,
  }
});
