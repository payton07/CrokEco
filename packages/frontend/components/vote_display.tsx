import { PostUpdatePlatsRequest } from "@/utils/routes";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export default function Vote_display({
  ligne, associations
}: {
  ligne: {
    ID_plat: number | null ;
    Certified: string;
    Like: number;
    DisLike: number;
    Nom_plat: string;
  };
  associations:any[];
}) {
  const router = useRouter();
  // console.log("dans vote display");
  const [isloaded, setIsloaded] = useState(false);
  const [Liked, setLiked] = useState(ligne.Like);
  const [DisLiked, setDisLiked] = useState(ligne.DisLike);
  const [isDone, setIsDone] = useState(false);

  const query = { ID_plat: ligne.ID_plat };
  function call() {
    if (ligne.ID_plat === null) return;
  }
  async function dislike() {
    // const router = useRouter();
    call();
    if(!isDone) {
      setIsDone(true);
      const set = { DisLike: ligne.DisLike + 1 };
      await PostUpdatePlatsRequest({ query: query, set: set });
      setDisLiked(DisLiked + 1);
      router.reload();
    }
  }
  async function like() {
    // const router = useRouter();
    call();
    if(!isDone) {
      setIsDone(true);
      const set = { Like: ligne.Like + 1 };
      await PostUpdatePlatsRequest({ query: query, set: set });
      setLiked(Liked + 1);
      router.reload();
    }
  }

  function goDetails() {
    call();
    if (ligne.ID_plat == null ||ligne.ID_plat === null) {return;}
    else{
        router.push({
          pathname: `/(hidden)/details/[id]`,
          params: {
            id: ligne.ID_plat,
            Plat: JSON.stringify(ligne),
            assocs: JSON.stringify(associations),
          },
        });
      }
  }

  return (
    <View style={styles.reco}>
      <TouchableOpacity onPress={goDetails}>
        <Text style={styles.text}>{ligne.Nom_plat}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.reco1} onPress={like}>
        <AntDesign name="like2" size={24} color="blue" />
        <Text>{Liked}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.reco1} onPress={dislike}>
        <AntDesign name="dislike2" size={24} color="red" />
        <Text>{DisLiked}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "black",
  },
  star: {
    right: 40,
  },
  reco: {
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 60,
    borderStyle: "solid",
    borderBlockColor: "black",
    borderRadius: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 12,
  },
  reco1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "10%",
    right: 30,
  },
});
