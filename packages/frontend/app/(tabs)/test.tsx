import ImageViewer from '@/components/image';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

import Button from '@/components/bouton';
import { useState } from 'react';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { rgbaColor } from 'react-native-reanimated/lib/typescript/Colors';

const nom = 'image-d2.png'
const path = '@/assets/'
const margeMin = 125
const cornerSize = 15
const defaultMargin = 0
const xMaxValue = Dimensions.get('window').width*0.8-cornerSize
const yMaxValue = Dimensions.get('window').height*0.8-cornerSize-40
const PlaceholderImage = require(path+nom);

export default function Index() {
  const xPosition1 = useSharedValue(defaultMargin);
  const yPosition1 = useSharedValue(defaultMargin);
  const lastPosition1 = useSharedValue([defaultMargin, defaultMargin]);
  const xPosition2 = useSharedValue(xMaxValue-defaultMargin);
  const yPosition2 = useSharedValue(yMaxValue-defaultMargin);
  const lastPosition2 = useSharedValue([xMaxValue-defaultMargin, yMaxValue-defaultMargin]);

  //const [photoUri, setPhotoUri] = useState('');

  const panGesture = Gesture.Pan().onUpdate((e) => {
    if ((e.translationX + lastPosition1.value[0] - lastPosition2.value[0])>=-margeMin){
      xPosition1.value = lastPosition2.value[0]-margeMin;
    }
    else{
      xPosition1.value = e.translationX + lastPosition1.value[0];
    }
    if (xPosition1.value < 0) xPosition1.value=0;
    if ((e.translationY + lastPosition1.value[1] - lastPosition2.value[1])>=-margeMin){
      yPosition1.value = lastPosition2.value[1]-margeMin;
    }
    else{
      yPosition1.value = e.translationY + lastPosition1.value[1];
    }
    if (yPosition1.value < 0) yPosition1.value=0;
  }).onEnd((e) => {
    lastPosition1.value[0] = xPosition1.value;
    lastPosition1.value[1] = yPosition1.value;
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: xPosition1.value}, {translateY: yPosition1.value}],
  }));

  const panGesture2 = Gesture.Pan().onUpdate((e) => {
    if ((e.translationX + lastPosition2.value[0] - lastPosition1.value[0])<=margeMin){
      xPosition2.value = lastPosition1.value[0]+margeMin;
    }
    else{
      xPosition2.value = e.translationX + lastPosition2.value[0];
    }
    if (xPosition2.value > xMaxValue) xPosition2.value=xMaxValue;
    if ((e.translationY + lastPosition2.value[1] - lastPosition1.value[1])<=margeMin){
      yPosition2.value = lastPosition1.value[1]+margeMin;
    }
    else{
      yPosition2.value = e.translationY + lastPosition2.value[1];
    }
    if (yPosition2.value > yMaxValue) yPosition2.value=yMaxValue;
  }).onEnd((e) => {
    lastPosition2.value[0] = xPosition2.value;
    lastPosition2.value[1] = yPosition2.value;
  });

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateX: xPosition2.value}, {translateY: yPosition2.value}],
  }));

  const animatedStyleBox = useAnimatedStyle(() => ({
    left: xPosition1.value,
    top: yPosition1.value,
    width: xPosition2.value - xPosition1.value + cornerSize,
    height: yPosition2.value - yPosition1.value + cornerSize,
  }));

  /*return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage}/>
      </View>
      
    </View>
  );*/

  return (
    <View style={styles.globalContainer}>
      <ImageViewer imgSource={PlaceholderImage}>
        <GestureHandlerRootView>
          <Animated.View style={[animatedStyleBox]}>
              {/* Coin haut-gauche */}
              <View style={[styles.cornerL, { top: 0, left: 0 }]}>
                <View style={styles.verticalLine} />
                <View style={styles.horizontalLine} />
              </View>
              {/* Coin haut-droit */}
              <View style={[styles.cornerL, { top: 0, right: 0 }]}>
                <View style={[styles.verticalLine, { right: 0 }]} />
                <View style={[styles.horizontalLine, { top: 0, right: 0 }]} />
              </View>

              {/* Coin bas-gauche */}
              <View style={[styles.cornerL, { bottom: 0, left: 0 }]}>
                <View style={[styles.verticalLine, { bottom: 0 }]} />
                <View style={[styles.horizontalLine, { bottom: 0 }]} />
              </View>

              {/* Coin bas-droit */}
              <View style={[styles.cornerL, { bottom: 0, right: 0 }]}>
                <View style={[styles.verticalLine, { bottom: 0, right: 0 }]} />
                <View style={[styles.horizontalLine, { bottom: 0, right: 0 }]} />
              </View>
          </Animated.View>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.cornerTop, animatedStyle]} />
          </GestureDetector>
          <GestureDetector gesture={panGesture2}>
            <Animated.View style={[styles.cornerBottom, animatedStyle2]} />
          </GestureDetector>
        </GestureHandlerRootView>
      </ImageViewer>

      <View style={styles.footerContainer}>
        
        <Button label="Retake a new photo" />
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  globalContainer:{
    flex:1,
    alignItems:'center',
  },
  container: {
    height:'80%',
    width:'80%',
    backgroundColor: 'yellow',
    overflow:'hidden',
    opacity:0.5,
    // borderRadius: '8%',
    //alignItems: 'center',
  },
  cropContainer:{
    position: 'absolute',
    backgroundColor: 'orange',
    opacity: 0.7,
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    marginTop:10,
    flex: 1 / 3,
    alignItems: 'center',
  },
  cornerTop: {
    position: 'absolute',
    height: cornerSize,
    width: cornerSize,
  },
  cornerBottom: {
    height: cornerSize,
    position: 'absolute',
    width: cornerSize,
  },

  // Coin en "L"
  cornerL: {
    position: 'absolute',
    width: 20, // Taille du L
    height: 20, 
  },

  // Partie verticale du L
  verticalLine: {
    position: 'absolute',
    width: 4, // Épaisseur de la ligne
    height: 20, // Hauteur de la ligne
    backgroundColor: '#FFFFFF',
  },

  // Partie horizontale du L
  horizontalLine: {
    position: 'absolute',
    width: 20, // Largeur de la ligne
    height: 4, // Épaisseur de la ligne
    backgroundColor: '#FFFFFF',
  },
});
