import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addPlats, addPlats_Ingredients, getLastElementPlats, getPlats, initDB,} from "@/utils/bdd";
import Searcher from "@/components/Searcher";
import Favoris from "@/components/Favoris";
import Suggestion from "@/components/Suggestion";
import { change, getDataWithCacheExpiration, updateRequest} from "@/utils/other";
const DO_MAJ_CODE = 3333;
type Plat = {"Certified": number, "ID_plat": string, "Nom_plat": string, "Vote":number};
const ele = { info: { Nom: "Pomme", categorie: "Fruit", Score: "0.5", Unite: "kg CO2 eq/kg de produit", id: 1 }, back: "Green" };
export const DataContext = createContext({ data: [ele], isLoaded: false });




async function setup1() {
  const loa1 = await getPlats(false, true, false);
  const loa2 = await getPlats(false, true, false, 200);
  if (loa1 && loa2) {
    let lod1 = [], lodInter = [] ,lod2 = [];
    for (const a of loa1) {
      if (a.ID_plat) lod1.push(await change(a.ID_plat));
    }
    for (const a of loa2) {
      if (a.ID_plat) lodInter.push(await change(a.ID_plat));
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

  async function init(){
    console.log("je reset !");
    await initDB(true);
    await clearAllCache();
  }

  async function DoUpdates(data : {message:string,code:number,last:string}){
    console.log("Lance la MAJ");
    if(data.code===DO_MAJ_CODE){
      const objet = JSON.parse(data.message);
      const plats : any[]= objet.plats;
      const plats_ingredients : any[]= objet.plats_ingredients;
  
      // Inserer les plats dans la bd de l'appli
      for(const plat of plats){
        await addPlats(plat);
      }

      // Inserer les associations plat - ingredients
      for(const plat_ingredient of plats_ingredients){
        await addPlats_Ingredients(plat_ingredient);
      }

      const last_plat = await getLastElementPlats();
      if(last_plat.ID_plat != data.last){console.log("Pb: Maj pas complete");}
      await clearAllCache();
      console.log("Mise à jour terminée !!!");
    }
    else{
      console.log(data.message);
    }
  }
  
  async function CheckForUpdates(){
    console.log("Demande de maj");
    const el = await getPlats(false,true,false);
    const ele = await getLastElementPlats();
    if(ele != null){
      const data = {'ID_plat':ele?.ID_plat};
      const laMaj = await updateRequest(data);
      if(laMaj) await DoUpdates(laMaj);
    }
    else{
      // TODO : Voir les cas de merde 
      console.log("Y a pas de plats dans ta BD !");
    }
  }

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

  useEffect(() => {
    loadData();
    // CheckForUpdates();
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
                  <TouchableOpacity style={styles.ResetButton} onPress={init}>
                    <Text style={styles.clearButtonText}>Reset BD</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.MaJButton} onPress={CheckForUpdates}>
                    <Text style={styles.clearButtonText}>Demande MàJ</Text>
                  </TouchableOpacity>
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
  }
});
