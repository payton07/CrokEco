import React, { useState } from "react";
import {StyleSheet, View,Text, Dimensions, Pressable, TouchableOpacity} from "react-native";
import {Image} from "expo-image"
import { Link, usePathname } from "expo-router";
import { ExternalLink } from "./ExternalLink";

export default function Fav({ id }: { id: string }) {
  const [img, setImg] = useState(require('@/assets/images/image.png'));
  // const [page,setPage] = useState(false);
  const ide: String | number = id;

  function change(){
    setImg(id)
  }
  return (
    // /(hidden)/details/[{id}]"
    <Link href={{
      pathname : "/(hidden)/details/",
      params : {id : []}}
    }
     style={styles.image}>
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
