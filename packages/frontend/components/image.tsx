import { StyleSheet, View } from 'react-native';
import { Image, ImageBackground, type ImageSource } from 'expo-image';
import { ReactNode } from 'react';

type Props = {
  imgSource: string;
  styleContainer: {}
  children: ReactNode;
};

export default function ImageViewer({ imgSource, styleContainer, children }: Props) {
  return <View style={styleContainer}><ImageBackground source={{uri:imgSource}} contentFit='contain'><View style={styles.children}>{children}</View></ImageBackground></View>;
}

const styles = StyleSheet.create({
  containerTest: {
    top: "5%",
    width:"80%",
    height: '80%',
  },
  children: {
    top:0,
    left:0,
    width: '100%',
    height: '100%',
    //backgroundColor:'red',
  },
});
