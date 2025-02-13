import React, { useState } from "react";
import {StyleSheet, View,Text, Dimensions, Pressable, TouchableOpacity} from "react-native";
import {Image} from "expo-image"
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, Stack, useLocalSearchParams } from "expo-router";

export default function details({ value }: { value: string | undefined}) {
  const [img, setImg] = useState(require('@/assets/images/image.png'));
  const [info, setInfo] = useState(" hello ici les infos de cet element !!! :)");
  const { id } = useLocalSearchParams();

  // getinfo par id 

  function change(){
    setImg(value)
  }
  return (
      <>
        <Stack.Screen options={{ title: "Oops!" }} />
        <Link href="/(tabs)/research" style={styles.link}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Link>
        <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>
        <Image style={styles.image} source={img}/>
        <Text>
          {info}
        </Text>
        </View>
      </>
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
  },
    container: {
      flex: 1,
      alignItems: "center",
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    link: {
      top : 40,
      marginTop: 15,
      margin : 20,
      paddingVertical: 15,
    }, 
});
