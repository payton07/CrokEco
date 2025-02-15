import React, { useEffect, useState } from "react";
import {StyleSheet} from "react-native";
import {Image} from "expo-image"
import { Link} from "expo-router";
import { getIngredients } from "@/utils/bdd";

export default function Fav({ id }: { id: any }) {
  const [img, setImg] = useState(require('@/assets/images/image.png'));
  const ide: number = id.id;
  useEffect(() => {
    function change(){   
      const aq ="@/assets/images/";
      const as = id.Ingredient;
      const ze = ".jpg";
      const rese = `${aq}${as}${ze}`;
      setImg(require(rese));
      console.log(as);
    }
    change();
  },[]);
  return (
    <Link href={`/(hidden)/details/${ide}`} style={styles.image}>
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
