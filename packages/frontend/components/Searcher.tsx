import React, { useEffect, useState } from "react";
import {Button, FlatList, StyleSheet, TextInput, TouchableWithoutFeedback,Text} from "react-native";
import {View } from "./Themed";
import { getPlats } from "@/utils/bdd";
import { router } from "expo-router";

export default function Searcher() {
  const [text, setText] = useState("");
  const [filteredPlats, setFilteredPlats] = useState<any[]>([]);

    function setSres(text: string) {
      setText(text);
      search(text);
    }
    
    function inter(plat: any){
      setFilteredPlats([]); 
      router.push({ pathname: `/(hidden)/details/[id]`, params: { id: plat.ID_plat}});
    }
    async function search(e:string) {
      let s = `%${e}%`;
      
      const Plats = await getPlats({Nom_plat: s},false,true,30);
      
      if(Plats === undefined || Plats.length === 0) {setFilteredPlats([]); return;}
      
      const filtered : any[] = Plats.filter(Element =>{        
        if(Element.Nom_plat.toLowerCase().startsWith(text.toLowerCase())) return Element;
      }
      );
      console.log("filtered taille","query :",s, filtered.length);
      
      setFilteredPlats(filtered);
    }
    
  return (
      <View style={styles.container}>
          <View style={styles.getStartedContainer}>
            <TextInput style={styles.homeScreenFilename} onChangeText={setSres} placeholder="  Search..."></TextInput>
          </View>
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
  );
}

const styles = StyleSheet.create({
  container : {
    backgroundColor: 'white',
  },
  getStartedContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  homeScreenFilename:{
      marginTop: 10,
      marginBottom: 10,
      // color : "black",
      // marginLeft: 20,
      // paddingHorizontal: 15,
      borderRadius: 15,
      borderWidth: 1,
      alignItems: 'center',
      borderColor: '#000',
      width : "85%",
      // left : 10,
      height : 40,
      position : "relative",
      backgroundColor : "white",
  },
  suggestionsBox: {
    backgroundColor: 'white',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
    maxHeight: 200,
    zIndex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  suggestionItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'white',
    borderRadius: 9,
  },
  suggestionText: {
    color: '#333',
  }
});