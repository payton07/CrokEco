import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import React, { useCallback, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  getMenus_Historique,
  getPlats,
  getRecherches_Historique,
} from "@/utils/bdd";
import MenuHistory from "@/components/MenuHistory";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Form } from "react-hook-form";
import { FormatDataPlatReconnu } from "@/utils/other";
import { MostOccurent } from "../../utils/other";
import { Fond_vert_clair, Fourchette } from "@/utils/constants";

export default function History() {
  const [menus, setMenus] = useState<any[]>([]);
  const [isloaded, setIsloaded] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);

  async function getloadsMenus() {
    const MENUS = await getMenus_Historique(false, true, false, false);
    const Menus_update = [];
    if (MENUS !== undefined) {
      for (const menu of MENUS) {
        const recherche = await getRecherches_Historique(
          { ID_menu: menu.ID_menu },
          true,
          false,
          false,
        );
        const date = recherche?.at(0)?.Date;
        const textrequested = JSON.parse(recherche?.at(0)?.Text_request);
        const formatData = await FormatDataPlatReconnu(textrequested);
        const colors = formatData.map((item) => item.color);
        const mostOccurent = MostOccurent(colors);

        let lacolor = "";
        if (mostOccurent !== null) {
          lacolor = mostOccurent;
        } else {
          lacolor = "black";
        }
        const m = { ...menu, Date: date, color: lacolor };
        Menus_update.push(m);
      }
    }

    if (Menus_update.length > 0) {
      // Tri des menus par date
      // const sortAsc = true; // true pour trier par date croissante, false pour décroissante
      Menus_update.sort((a, b) => {
        const parseDate = (str: string) => {
          const [day, month, year] = str.split("/");
          return new Date(`${year}-${month}-${day}`);
        };

        const dateA = parseDate(a.Date);
        const dateB = parseDate(b.Date);

        return sortAsc
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });

      setMenus(Menus_update);
      setIsloaded(true);
    } else {
      setMenus([]);
      setIsloaded(true);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getloadsMenus();
    }, []),
  );

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Historiques</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setSortAsc(!sortAsc);
            getloadsMenus();
          }}
        >
          <Text style={styles.filterButtonText}>
            Trier par date : {sortAsc ? "Plus anciens" : "Plus récents"}
          </Text>
        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          {isloaded && menus.length > 0 ? (
            menus.map((ligne, i) => <MenuHistory key={i} ligne={ligne} />)
          ) : isloaded && menus.length === 0 ? (
            <Text style={styles.textcenterize}>Aucun Menu</Text>
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    backgroundColor: Fond_vert_clair,
    paddingHorizontal: 16,
    // paddingTop: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: Fourchette,
    margin: 20,
    marginBottom: 30,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  textcenterize: {
    fontSize: 16,
    color: "black",
    alignSelf: "center",
    marginTop: 100,
  },
  filterButton: {
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: Fourchette,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    width: "60%",
    right: "-20%",
  },

  filterButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});
