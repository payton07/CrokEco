import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { View } from './Themed';
import { getPlats } from "@/utils/bdd";
import { router } from "expo-router";
import { Fond_vert_clair } from "@/utils/constants";

export default function Searcher() {
  const [filteredPlats, setFilteredPlats] = useState<any[]>([]);

  async function setSres(input: string) {
    if(input=== "") {
      setFilteredPlats([]);
      return;
    }
    await search(input);
  }

  function inter(plat: any) {
    setFilteredPlats([]);
    router.push({
      pathname: `/(hidden)/details/[id]`,
      params: { id: plat.ID_plat },
    });
  }
  async function search(e: string) {
    let s = `%${e}%`;
    console.log("la query :", s);

    const Plats = await getPlats({ Nom_plat: s }, true, true, 5);

    if (Plats === undefined || Plats.length === 0) {
      setFilteredPlats([]);
      return;
    }

    const filtered: any[] = Plats.filter((Element) => {
      if (Element.Nom_plat.toLowerCase().startsWith(e.toLowerCase())) {
        console.log(
          Element.Nom_plat.toLowerCase(),
          "le text :",
          e.toLowerCase(),
        );
        return Element;
      }
    });
    console.log("filtered taille", "query :", s, filtered.length);

    setFilteredPlats(filtered);
  }

  return (
    <View style={styles.container}>
      <View style={styles.getStartedContainer}>
        <TextInput
          style={styles.homeScreenFilename}
          onChangeText={setSres}
          placeholder="Search..."
        />
      </View >
      <View style={styles.flottante}>
      {filteredPlats.length > 0 && (
        <View style={styles.suggestionsBox}>
          <FlatList
            data={filteredPlats}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => inter(item)}>
                <View style={styles.suggestionItem}>
                  <Text style={styles.suggestionText}>{item.Nom_plat}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Fond_vert_clair,
    zIndex: 10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginLeft: 10,
    // backgroundColor: '#fff',
    backgroundColor: Fond_vert_clair,
    // backgroundColor: 'red',
  },
  homeScreenFilename: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    // marginLeft: 10,
    // color : "black",
    // marginLeft: 20,
    // paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#000",
    width: "95%",
    // left : 10,
    height: 40,
    position: "relative",
    backgroundColor: 'white',
  },
  suggestionsBox: {    
    backgroundColor: "transparent",
    borderRadius: 9,
    borderColor: "#ddd",
    maxHeight: 200,
    zIndex: 1,
    width: "95%",
    alignSelf: "center",
  },
  suggestionItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "white",
    borderRadius: 9,
    zIndex: 1,
  },
  suggestionText: {
    color: "#333",
    zIndex: 1,
  },
  flottante :{
    position : "absolute",
    zIndex : 10,
    width : "98%",
    top : 50,
    left : 10,
    backgroundColor : "transparent",

  }
});
