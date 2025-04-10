import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addPlats,
  addPlats_Ingredients,
  getLastElementPlats,
  getPlats,
  initDB,
} from "@/utils/bdd";
import Searcher from "@/components/Searcher";
import Favoris from "@/components/Favoris";
import Suggestion from "@/components/Suggestion";
import { change, getDataWithCacheExpiration } from "@/utils/other";
import {
  DO_MAJ_CODE,
  Fond_vert_clair,
  Fourchette,
  good,
} from "@/utils/constants";
import { PostUpdateRequest } from "@/utils/routes";
import { View } from "@/components/Themed";
import { Vert_C } from "../../utils/constants";

// Variables globales
const ele = {
  info: {
    Nom: "Pomme",
    categorie: "Fruit",
    Score: "0.5",
    Unite: "kg CO2 eq/kg de produit",
    id: 1,
  },
  back: "Green",
};
export const DataContext = createContext({ data: [ele], isLoaded: false });

// Fonction pour récupérer les plats favoris et suggérés
async function setup1() {
  const plats_favs = await getPlats(false, true, false);
  const plats_suggested = await getPlats(false, true, false, 200);
  if (plats_favs && plats_suggested) {
    let plats_favs_data = [],
      plats_Inter = [],
      plats_suggested_data = [];
    for (const a of plats_favs) {
      if (a.ID_plat) plats_favs_data.push(await change(a.ID_plat));
    }
    for (const a of plats_suggested) {
      if (a.ID_plat) plats_Inter.push(await change(a.ID_plat));
    }
    for (const a of plats_Inter) {
      // TODO remettre la condition
      // if(a?.color == good)
      plats_suggested_data.push(a);
    }
    plats_suggested_data.push(...plats_suggested_data);
    return {
      plats_favoris: plats_favs_data,
      plats_suggest: plats_suggested_data,
    };
  }
  return { plats_favoris: undefined, plats_suggest: undefined };
}

export default function Research() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [platsfavs, setPlatsfavs] = useState([]);
  const [platsuggested, setPlatsuggested] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fonction pour vider le cache
  async function clearAllCache() {
    try {
      await AsyncStorage.clear();
      console.log("Tout le cache a été supprimé !");
      setIsLoaded(false);
      setLoading(true);
      await loadData();
    } catch (error) {
      console.error("Erreur lors de la suppression de tout le cache :", error);
    }
  }

  // Fonction pour reset la base de données
  // et vider le cache
  async function reset() {
    console.log("je reset !");
    await initDB(true);
    await clearAllCache();
  }

  // Fonction qui effectue la mise à jour
  // des plats et des associations plat - ingredients
  async function DoUpdates(data: {
    message: string;
    code: number;
    last: string;
  }) {
    console.log("Lance la MAJ");
    if (data.code === DO_MAJ_CODE) {
      const objet = JSON.parse(data.message);
      const plats: any[] = objet.plats;
      const plats_ingredients: any[] = objet.plats_ingredients;

      console.log("Les plats : ", plats);
      console.log("Les plats ingredients : ", plats_ingredients);

      // Inserer les plats dans la bd de l'appli
      for (const plat of plats) {
        await addPlats(plat);
      }

      // Inserer les associations plat - ingredients
      for (const plat_ingredient of plats_ingredients) {
        const id = await addPlats_Ingredients(plat_ingredient);
        console.log(
          "Ajout de l'association plat - ingredient avec id : ",
          id,
          plat_ingredient.ID_plat,
          plat_ingredient.ID_ingredient,
        );
      }

      const last_plat = await getLastElementPlats();
      if (last_plat.ID_plat != data.last) {
        console.log("Pb: Maj pas complete");
      }
      await clearAllCache();
      console.log("Mise à jour terminée !!!");
    } else {
      console.log(data.message);
    }
  }

  // Fonction pour vérifier les mises à jour
  // et effectuer la mise à jour si nécessaire
  async function CheckForUpdates() {
    console.log("Demande de maj");
    const el = await getPlats(false, true, false);
    const ele = await getLastElementPlats();
    if (ele != null) {
      const data = { ID_plat: ele?.ID_plat };
      const laMaj = await PostUpdateRequest(data);
      if (laMaj) await DoUpdates(laMaj);
    } else {
      // TODO : Voir les cas de merde
      console.log("Y a pas de plats dans ta BD !");
    }
  }

  // Fonction pour charger les données soit depuis le cache
  // soit depuis la base de données
  // et mettre à jour l'état de l'application
  // avec les plats favoris et suggérés
  async function loadData() {
    if (!isLoaded) {
      const donne = await getDataWithCacheExpiration("21", setup1, 30);
      if (donne) {
        setData(donne);
        setPlatsfavs(donne.plats_favoris);
        setPlatsuggested(donne.plats_suggest);
        setIsLoaded(true);
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [isLoaded]);

  return (
    <DataContext.Provider value={{ data, isLoaded }}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
              <Ionicons name="menu" size={30} color={Fourchette} />
            </TouchableOpacity>
            <Text style={styles.text}>Research</Text>
          </View>
          <View
            style={styles.separator}
            lightColor={Vert_C}
            darkColor={Vert_C}
          />
          {menuVisible && (
            <View style={styles.absoluteContainer}>
              <View style={styles.overlay}>
                <View style={styles.menu}>
                  <Text style={styles.menuText}>Menu</Text>
                  <Text style={styles.menuText}>Option 1</Text>
                  <TouchableOpacity style={styles.ResetButton} onPress={reset}>
                    <Text style={styles.clearButtonText}>Reset BD</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.MaJButton}
                    onPress={CheckForUpdates}
                  >
                    <Text style={styles.clearButtonText}>Demande MàJ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={clearAllCache}
                  >
                    <Text style={styles.clearButtonText}>Vider le cache</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          <Searcher />
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <Favoris loads={platsfavs} />
              <Suggestion loads={platsuggested} />
            </>
          )}
        </View>
      </SafeAreaProvider>
    </DataContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    // backgroundColor: "white",
    backgroundColor: `${Fond_vert_clair}`,
    marginBottom: "73%",
    paddingBottom: "83%",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    // backgroundColor: "white",
    backgroundColor: Fond_vert_clair,
  },
  absoluteContainer: {
    position: "absolute",
    top: 100,
    width: "100%",
    height: "100%",
    zIndex: 10,
    backgroundColor: "white",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  menu: {
    width: "50%",
    height: "100%",
    backgroundColor: "white",
    padding: 20,
    elevation: 5,
  },
  menuText: {
    fontSize: 16,
    marginBottom: 10,
    color: "black",
  },
  text: {
    top: -4,
    fontSize: 22,
    fontWeight: "bold",
    margin: 2,
    color: Fourchette,
  },
  separator: {
    marginVertical: 1,
    height: 1,
    width: "90%",
    left: 22,
  },
  clearButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    alignItems: "center",
  },
  MaJButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
    alignItems: "center",
  },
  ResetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    alignItems: "center",
  },
  clearButtonText: {
    color: "white",
    fontSize: 16,
  },
});
