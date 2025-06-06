import { Alert, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import React, { useCallback, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Vote_display from "@/components/vote_display";
import { useFocusEffect } from "expo-router";
import { GetPlat_a_Vote } from "@/utils/routes";
import { Fond_vert_clair } from "@/utils/constants";

export default function Votes() {
  const [plats, setPlats] = useState<any[]>([]);
  const [associations, setAssociations] = useState<any[]>([]);
  const [isloaded, setIsloaded] = useState(false);


  // Fonction pour récupérer les plats à voter
  async function loads() {
    const data = await GetPlat_a_Vote(false);
    if (data == null) {
      console.log("Veuillez verifier votre connexion au serveur ");
      Alert.alert(
        "Erreur de connexion",
        "Veuillez verifier votre connexion au serveur",
      );
      return;
    }
    const plats = JSON.parse(data?.plats);
    const assocs = JSON.parse(data?.assocs);
    setPlats(plats);
    setAssociations(assocs);
    setIsloaded(true);
  }

  // useFocusEffect pour charger les données lorsque la page est affichée
  useFocusEffect(
    useCallback(() => {
      loads();
    }, []),
  );
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.title}> Page des Votes </Text>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          {isloaded && plats.length > 0 ? (
            plats.map((ligne, i) => {
              return <Vote_display key={i} ligne={ligne} associations={associations[ligne.ID_plat]}/>;
            })
          ) : (
            <Text style={styles.textcenterize}>Aucun Plats</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "white",
    backgroundColor: `${Fond_vert_clair}`,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    top: 20,
    alignSelf: "center",
    height: "10%",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  title1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    alignSelf: "center",
  },
  RecongnitionContainer: {
    alignSelf: "center",
    alignContent: "center",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    borderBlockColor: "black",
    // borderColor: 'black',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    width: "100%",
    height: "60%",
    // elevation: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    // bottom: 20,
  },
  text: {
    fontSize: 16,
    color: "black",
  },
  textcenterize: {
    fontSize: 16,
    color: "black",
    alignSelf: "center",
    top: 100,
  },
});
