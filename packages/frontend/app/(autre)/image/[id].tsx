import ImageViewer from '@/components/image';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Button from '@/components/bouton';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, useDerivedValue } from 'react-native-reanimated';
import { useLocalSearchParams } from 'expo-router';
import { useMemo, useEffect, useState } from 'react';

const margeMin = 125;
const cornerSize = 15;
const defaultMargin = 0;
const xMaxValue = Dimensions.get('window').width * 0.8 - cornerSize;
const yMaxValue = ((xMaxValue + cornerSize) * 16) / 9 - cornerSize;

export default function Index() {
  const params = useLocalSearchParams();
  const imageUri = params.id;
  const cacheDir = FileSystem.cacheDirectory; // C'est le répertoire de cache principal de l'application
  const cacheFilePath = `${cacheDir}ExperienceData/%2540anonymous%252FCo2Score-frontend-cace29ea-b258-41c6-aa7e-18ce77a5f07c/Camera/${imageUri}`; // Exemple de chemin du fichier dans le cache

  const xPosition1 = useSharedValue(defaultMargin);
  const yPosition1 = useSharedValue(defaultMargin);
  const lastPosition1 = useSharedValue([defaultMargin, defaultMargin]);
  const xPosition2 = useSharedValue(xMaxValue - defaultMargin);
  const yPosition2 = useSharedValue(yMaxValue - defaultMargin);
  const lastPosition2 = useSharedValue([xMaxValue - defaultMargin, yMaxValue - defaultMargin]);
  
  const panGesture = Gesture.Pan().onUpdate((e) => {
    if ((e.translationX + lastPosition1.get()[0] - lastPosition2.get()[0]) >= -margeMin) {
      xPosition1.set(lastPosition2.get()[0] - margeMin);
    } else {
      xPosition1.set(e.translationX + lastPosition1.get()[0]);
    }
    if (xPosition1.get() < 0) xPosition1.set(0);
    if ((e.translationY + lastPosition1.get()[1] - lastPosition2.get()[1]) >= -margeMin) {
      yPosition1.set(lastPosition2.get()[1] - margeMin);
    } else {
      yPosition1.set(e.translationY + lastPosition1.get()[1]);
    }
    if (yPosition1.get() < 0) yPosition1.set(0);
    console.log('xPosition1:', xPosition1.get());
  }).onEnd((e) => {
    lastPosition1.set([xPosition1.get(), yPosition1.get()]);
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: xPosition1.get() }, { translateY: yPosition1.get() }],
  }));

  const panGesture2 = Gesture.Pan().onUpdate((e) => {
    if ((e.translationX + lastPosition2.get()[0] - lastPosition1.get()[0]) <= margeMin) {
      xPosition2.set(lastPosition1.get()[0] + margeMin);
    } else {
      xPosition2.set(e.translationX + lastPosition2.get()[0]);
    }
    if (xPosition2.get() > xMaxValue) xPosition2.set(xMaxValue);
    if ((e.translationY + lastPosition2.get()[1] - lastPosition1.get()[1]) <= margeMin) {
      yPosition2.set(lastPosition1.get()[1] + margeMin);
    } else {
      yPosition2.set(e.translationY + lastPosition2.get()[1]);
    }
    if (yPosition2.get() > yMaxValue) yPosition2.set(yMaxValue);
  }).onEnd((e) => {
    lastPosition2.set([xPosition2.get(), yPosition2.get()]);
  });

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateX: xPosition2.get() }, { translateY: yPosition2.get() }],
  }));

  const animatedStyleBox = useAnimatedStyle(() => ({
    left: xPosition1.get(),
    top: yPosition1.get(),
    width: xPosition2.get() - xPosition1.get() + cornerSize,
    height: yPosition2.get() - yPosition1.get() + cornerSize,
  }));

  return (
    <View style={styles.globalContainer}>
      <ImageViewer styleContainer={styles.container} imgSource={cacheFilePath}>
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
        <Button label="Crop a new photo" theme='crop' photoUri={cacheFilePath} ox={xPosition1.get()} oy={yPosition1.get()} w={200} h={400} />
        <Button label="Retake a new photo" theme='primary'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'red',
    top: '5%',
    height: yMaxValue + cornerSize,
    width: xMaxValue + cornerSize,
    overflow: 'hidden',
  },
  cropContainer: {
    position: 'absolute',
    backgroundColor: 'orange',
    opacity: 0.7,
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    marginTop: 40,
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
