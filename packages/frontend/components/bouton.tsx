import { StyleSheet, View, Pressable, Text, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { useImageManipulator } from 'expo-image-manipulator';
import { useState } from 'react';

type Props = {
  label: string;
  theme?: 'primary' | 'crop';
  oy?: Float;
  ox?: Float;
  w?: Float;
  h?: Float;
  photoUri?: string;
};

export default function Button({ label, theme, ox, oy, w, h, photoUri }: Props) {
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);

  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={() => alert('You pressed a button.')}>
          <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  if (theme === 'crop') {
    const maFonction = () => {
      alert("Cropping Image !");
      console.log(photoUri);
      console.log(h);
      console.log(w);
      console.log(ox);
      console.log(oy);

      if (photoUri) {
        Image.getSize(photoUri, (width, height) => {
          setImageSize({ width, height });
          console.log(`Image size: ${width}x${height}`);

          if (h && w && ox && oy) {
            const imageContext = useImageManipulator(photoUri);
            imageContext.crop({ height: h, width: w, originX: ox, originY: oy });
          } else {
            alert("Missing information to crop the image !");
          }
        }, (error) => {
          console.error(`Failed to get image size: ${error}`);
        });
      } else {
        alert("No photo to crop !");
      }
    };

    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={() => maFonction()}>
          <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  buttonIcon: {
    paddingRight: 8,
  },
});

