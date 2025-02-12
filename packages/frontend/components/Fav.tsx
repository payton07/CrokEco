import React, { useState } from "react";
import {StyleSheet, View,Text, Dimensions} from "react-native";
import {Image} from "expo-image"

export default function Fav({ value }: { value: string }) {
  const imageMargin = 10;
   const imageSize = ((Dimensions.get('screen').width - 5 * imageMargin) / 4);
  const [img, setImg] = useState(require('@/assets/images/image.png'));

  function change(){
    setImg(value)
  }
  return (<View style={{ width: imageSize, height: imageSize, marginRight: imageMargin, marginBottom: imageMargin }}>
    <Image style={{width: imageSize, height: imageSize, backgroundColor: '#EFEFEF'}} source={img}/>
    <Text>{value}</Text>
  </View>);
}


// const styles1 = StyleSheet.create({
//   homeScreenFilename:{
//       margin: 100,
//       paddingHorizontal: 10,
//       paddingBottom: 10,
//       borderRadius: 25,
//       borderWidth: 1,
//       alignItems: 'center',
//       borderColor: '#000',
//       width : 300,
//     //   top : 10,
//       bottom : 100,
//       position : "relative",
//   },
//   image: {
//     flex: 1/4,
//     display:'flex',
//     width: 'auto',
//     height:'25%',
//     backgroundColor: 'black',
//   },
// });