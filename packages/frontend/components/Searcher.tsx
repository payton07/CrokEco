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
      setFilteredPlats(filtered);
    }
    
  return (
      <View>
          <View style={styles.getStartedContainer}>
            <TextInput style={styles1.homeScreenFilename} onChangeText={setSres} placeholder="  Search..."></TextInput>
          </View>
            {filteredPlats.length > 0 && (
              <View style={styles1.suggestionsBox}>
                <FlatList
                  data={filteredPlats}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => inter(item)}>
                      <View style={styles1.suggestionItem}>
                        <Text style={styles1.suggestionText}>{item.Nom_plat}</Text>
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
  getStartedContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
const styles1 = StyleSheet.create({
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
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
    maxHeight: 200,
    // width: '45%',
  },
  suggestionItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  suggestionText: {
    color: '#333',
  }
});