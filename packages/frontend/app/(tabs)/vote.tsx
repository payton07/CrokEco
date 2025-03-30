import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import React, { useCallback, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Vote_display from "@/components/vote_display";
import { useFocusEffect } from "expo-router";
import { getPlat_a_Vote } from "@/utils/other";

export default function Votes() {
  const [plats, setPlats] = useState<any[]>([]);
  const [isloaded , setIsloaded] = useState(false);

  async function loads(){
    // console.log("Call loads de votes");
    const data = await getPlat_a_Vote(false);
    console.log(data.message);
    
    // console.log("la data depuis la page votes :",data);
    setPlats(data);
    setIsloaded(true);
    // console.log("Set du votes");
  }

  useFocusEffect(
    useCallback(()=>{
      loads();
    },[])
  );
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.title}> Page des Votes </Text>
          <View style={styles.RecongnitionContainer}>
            <Text style={styles.title1}> Les plats à voter : </Text>

            {plats.length>0 && isloaded? 
              plats.map((ligne,i)=>{
                return <Vote_display key={i} ligne={ligne} />
              })
              : 
              <Text style={styles.textcenterize}>Aucun Plats</Text>
            }
          </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    top : 20,
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
    alignSelf : "center",
  },
  RecongnitionContainer: {
    alignSelf : 'center',
    alignContent : 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderBlockColor: 'black',
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
    alignSelf : "center",
    top : 100
  },
});
