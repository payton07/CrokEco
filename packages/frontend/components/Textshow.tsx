import { Fourchette } from "@/utils/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter} from 'expo-router';
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";

function switchToDetails(ide: number) {
  const router = useRouter();
  router.push({ pathname: `/(hidden)/details/[id]`, params: { id: ide } });
}

export default function Textshow({
  ligne,
}: {
  ligne: { text: string; color: string; id: number | null };
}) {
  function call() {
    if (ligne.id === null) {
      Alert.alert("Ce plat n'existe pas dans nos données");
      return;
    }
    switchToDetails(ligne.id);
  }

  return (
    <View style={styles.reco}>
      <TouchableOpacity style={styles.reco} onPress={call}>
        <Text style={styles.text}>{ligne.text}</Text>
        <FontAwesome
          style={styles.star}
          name="star"
          size={24}
          color={ligne.color}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: Fourchette,
  },
  star: {
    right: 40,
  },
  reco: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
