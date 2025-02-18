import React, { useEffect, useState } from "react";
import {StyleSheet} from "react-native";
import {Image} from "expo-image"
import { Link} from "expo-router";
import { getIngredients } from "@/utils/bdd";
import {images} from "@/utils/picture";

export default function Fav({ id }: { id: any }) {
  const [img, setImg] = useState(images.github);
  const ide: number = id?.id;
  // useEffect(() => {
  //   /**
  //    * TODO Faire un gros import des images pour aleger le chargement 
  //    * EXEMPLE : 
  //    */
  //   function change(){   
  //     const as : string = id?.Ingredient;
  //     setImg(images.carotte);
  //     console.log(as);
  //   }
  //   change();
  // },[]);
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
