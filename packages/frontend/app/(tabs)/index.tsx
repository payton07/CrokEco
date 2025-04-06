import {
  StyleSheet,
  Alert,
  Image as RNImage,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { Text, View } from "@/components/Themed";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import TextRecognition from "@react-native-ml-kit/text-recognition";
import {
  addMenus_Historique,
  addRecherches_Historique,
  addRestaurants_Historique,
  getPlats,
  getRestaurants,
} from "@/utils/bdd";
import {
  Ping,
  PostMenu,
  PostRecherche,
  PostResto,
  change,
} from "@/utils/other";
import Textshow from "@/components/Textshow";
import * as Location from "expo-location";

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface TextBlock {
  text: string;
  frame?: BoundingBox;
}

function sortRecognizedText(blocks: TextBlock[]): string {
  return blocks
    .filter((block) => block.frame)
    .sort((a, b) => {
      if (!a.frame || !b.frame) return 0;
      if (Math.abs(a.frame.y - b.frame.y) > 20) {
        return a.frame.y - b.frame.y;
      }
      return a.frame.x - b.frame.x;
    })
    .map((block) => block.text)
    .join("\n");
}

export default function Index() {
  const [data, setData] = useState<any[]>([]);
  const imagePath = require("../../assets/ingImages/image11.png");
  const [filled, setFilled] = useState(false);
  const [done, setDone] = useState(false);
  const [imageUri, setImageUri] = useState(
    RNImage.resolveAssetSource(imagePath).uri
  );
  const [nomResto, setNomResto] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [RestosList, setRestosList] = useState([]);
  const [filteredRestos, setfilteredRestos] = useState<any[]>([]);
  const [RestosData, setRestosData] = useState<string[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [loc, setLoc] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Erreur", "Autorisez la localisation pour continuer");
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
    setLoc(true);
  }

  useEffect(() => {
    getLocation();
  }, []);

  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission refusée !");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    } else {
      alert("Vous n'avez selectionner aucune image.");
    }
  }

  async function FormatDataPlatReconnu(data: string[]) {
    const lines: any[] = [];
    for (const ligne of data) {
      const query = `${ligne}`;
      try {
        const plats = await getPlats({ Nom_plat: query }, false, true, 1);
        if (plats && plats.length > 0) {
          const id = plats[0].ID_plat;
          const obj = await change(id);
          lines.push({ text: ligne, color: obj?.color, id: id });
        } else {
          lines.push({ text: ligne, color: "black", id: null });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des plats:", error);
      }
    }
    return lines;
  }

  async function LoadLocAndInsertClient_SendDataToServeur(lines: any[]) {
    let Longitude = 0;
    let Latitude = 0;
    if (!loc) {
      await getLocation();
    }
    if (location) {
      Longitude = location.coords.longitude;
      Latitude = location.coords.latitude;

      const resto = {
        NomResto: nomResto,
        Latitude,
        Longitude,
        Adresse,
      };
      const idresto = await addRestaurants_Historique(resto);

      const menu = { NomMenu: "menu", ID_restaurant: idresto };
      const res = await addMenus_Historique(menu);

      const textReconnu = JSON.stringify(lines);
      const recherche = {
        Text_request: textReconnu,
        ID_menu: res,
        Date: new Date().toLocaleDateString("fr-FR"),
      };
      await addRecherches_Historique(recherche);

      setNomResto("");
      const resultat = await Ping();
      if (resultat == 201) {
        const res1 = await PostResto(resto);
        const menuPost = { NomMenu: "menu", ID_restaurant: res1.code };
        const res2 = await PostMenu(menuPost);
        const recherchePost = {
          Text_request: textReconnu,
          ID_menu: res2.code,
          Date: new Date().toLocaleDateString("fr-FR"),
        };
        await PostRecherche(recherchePost);
      } else {
        Alert.alert("Veuillez vous connecter à internet");
      }
    }
  }

  async function setRecoData() {
    if (!filled && imageUri) {
      const recognizedTexts = await recognizeText();
      if (recognizedTexts != undefined) {
        const lines = await FormatDataPlatReconnu(recognizedTexts);
        setData(lines);
        setFilled(true);
        setDone(true);
        await LoadLocAndInsertClient_SendDataToServeur(lines);
      } else {
        setData([]);
        setFilled(false);
        setDone(false);
      }
    } else {
      setData([]);
      setFilled(false);
      setDone(false);
    }
  }

  async function recognizeText(): Promise<string[] | undefined> {
    try {
      const result = await TextRecognition.recognize(imageUri);
      const inter: TextBlock[] = result.blocks;
      const sortedText = sortRecognizedText(inter || []);
      const lines: string[] = [];
      for (const ligne of sortedText.split("\n")) {
        const v = ligne.split("*");
        lines.push(v[0]);
      }
      return lines;
    } catch (error) {
      Alert.alert("Erreur", "Échec de la reconnaissance de texte");
      console.error("Erreur OCR :", error);
    }
  }

  function inter(ingredient: string) {
    if (ingredient.trim()) {
      setNomResto(ingredient.trim());
      setfilteredRestos([]);
    }
  }

  async function Alter_RestosFromBdd(text: string) {
    const query = `%${text}%`;
    const restos = await getRestaurants({ NomResto: query }, true, true, 30);
    if (restos !== undefined) {
      const restoData: string[] = [];
      for (const ele of restos) {
        if (!restoData.includes(ele.Nom_Resto)) restoData.push(ele.Nom_Resto);
      }
      setRestosData(restoData);
    }
  }

  async function filterRestos(text: string) {
    setNomResto(text);
    await Alter_RestosFromBdd(text);
    if (text.trim() === "") {
      setfilteredRestos([]);
    } else {
      const filtered = RestosData.filter((Element) =>
        Element.toLowerCase().startsWith(text.toLowerCase())
      );
      setfilteredRestos(filtered);
    }
  }

  return (
    <SafeAreaProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Scanner page</Text>
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                {!done ? (
                  <>
                    <Text style={styles.label}>Restaurants :</Text>
                    <TextInput
                      style={styles.input2}
                      placeholder="Taper le nom du resto"
                      value={nomResto}
                      onChangeText={filterRestos}
                    />
                    {filteredRestos.length > 0 && (
                      <View style={styles.suggestionsBox}>
                        <FlatList
                          data={filteredRestos}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item }) => (
                            <TouchableWithoutFeedback
                              onPress={() => inter(item)}
                            >
                              <View style={styles.suggestionItem}>
                                <Text style={styles.suggestionText}>
                                  {item}
                                </Text>
                              </View>
                            </TouchableWithoutFeedback>
                          )}
                        />
                      </View>
                    )}
                    <Text style={styles.label}>Adresse :</Text>
                    <TextInput
                      style={styles.input2}
                      placeholder="Taper l'adresse du resto"
                      value={Adresse}
                      onChangeText={setAdresse}
                    />
                  </>
                ) : null}

                {done ? (
                  <View style={styles.RecongnitionContainer}>
                    <Text style={styles.title1}>Text Reconnu :</Text>
                    {data ? (
                      data.map((ligne, i) => (
                        <Textshow key={i} ligne={ligne} />
                      ))
                    ) : (
                      <Text style={styles.text}>Aucun texte reconnu</Text>
                    )}
                  </View>
                ) : null}

                {imageUri && !done && (
                  <RNImage source={{ uri: imageUri }} style={styles.image} />
                )}

                {!done ? (
                  <>
                    <TouchableOpacity
                      style={styles.imageButton}
                      onPress={pickImage}
                    >
                      <Text style={styles.imageButtonText}>
                        Choisir une image
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ ...styles.imageButton, top: 10 }}
                      onPress={setRecoData}
                    >
                      <Text style={styles.imageButtonText}>Analyser</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    style={styles.imageButton}
                    onPress={setRecoData}
                  >
                    <Text style={styles.imageButtonText}>Retour</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  title: {
    marginTop: 20,
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  title1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    alignSelf: "center",
    marginBottom: 12,
  },
  RecongnitionContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 12,
  },
  text: {
    fontSize: 16,
    color: "black",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "cover",
  },
  imageButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 6,
  },
  imageButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    width: "85%",
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginTop: 20,
  },
  label: {
    color: "#666",
    marginTop: 12,
    marginBottom: 4,
  },
  input2: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  suggestionsBox: {
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 8,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  suggestionText: {
    color: "#333",
  },
});
