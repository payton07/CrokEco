import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getIngredients, getPlats, getSous_Groupes } from "@/utils/bdd";
import Searcher from "@/components/Searcher";
import Favoris from "@/components/Favoris";
import Suggestion from "@/components/Suggestion";
import { change, getDataWithCacheExpiration} from "@/utils/other";

const ele = { info: { Nom: "Pomme", categorie: "Fruit", Score: "0.5", Unite: "kg CO2 eq/kg de produit", id: 1 }, back: "Green" };
export const DataContext = createContext({ data: [ele], isLoaded: false });

async function clearAllCache() {
  try {
    await AsyncStorage.clear();
    console.log("Tout le cache a été supprimé !");
  } catch (error) {
    console.error("Erreur lors de la suppression de tout le cache :", error);
  }
}

async function setup1() {
  const loa1 = await getPlats(false, true, false);
  const loa2 = await getPlats(false, true, false, 100);
  if (loa1 && loa2) {
    let lod1 = [], lodInter = [] ,lod2 = [];
    for (const a of loa1) {
      if (a.Ciqual_AGB) lod1.push(await change(a.Ciqual_AGB));
    }
    for (const a of loa2) {
      if (a.Ciqual_AGB) lodInter.push(await change(a.Ciqual_AGB));
    }
    for (const a of lodInter){
      if(a?.back =="green") lod2.push(a)
    }
    return { loads1: lod1, loads2: lod2 };
  }
  return { loads1: undefined, loads2: undefined };
}

export default function Research() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [loads1, setLoads1] = useState([]);
  const [loads2, setLoads2] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!isLoaded) {
        const donne = await getDataWithCacheExpiration("21", setup1, 30);
        if (donne) {
          setData(donne);
          setLoads1(donne.loads1);
          setLoads2(donne.loads2);
          setIsLoaded(true);
        }
        setLoading(false);
      }
    }
    loadData();
  }, [isLoaded]);

  return (
    <DataContext.Provider value={{ data, isLoaded }}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
              <Ionicons name="menu" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.text}>Research</Text>
          </View>
          {menuVisible && (
            <View style={styles.absoluteContainer}>
              <View style={styles.overlay}>
                <View style={styles.menu}>
                  <Text style={styles.menuText}>Menu</Text>
                  <Text style={styles.menuText}>Option 1</Text>
                  <Text style={styles.menuText}>Option 2</Text>
                  <Text style={styles.menuText}>Option 3</Text>
                  <TouchableOpacity style={styles.clearButton} onPress={clearAllCache}>
                    <Text style={styles.clearButtonText}>Vider le cache</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          <Searcher path="app/(tabs)/research.tsx" />
          {loading ? <ActivityIndicator size="large" color="#0000ff" />: <><Favoris loads={loads1} /><Suggestion loads={loads2} /></>}
        </View>
      </SafeAreaProvider>
    </DataContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: "white",
    marginBottom: "73%",
    paddingBottom: "83%",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "white",
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
    fontSize: 22,
    fontWeight: "bold",
    margin: 2,
    color: "black",
  },
  clearButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    alignItems: "center",
  },
  clearButtonText: {
    color: "white",
    fontSize: 16,
  }
});
