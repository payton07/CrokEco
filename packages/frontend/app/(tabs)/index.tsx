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
  ActivityIndicator,
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
import Textshow from "@/components/Textshow";
import * as Location from "expo-location";
import {
  FormatDataPlatReconnu,
  DoSomethingWhenServerReady,
  sortRecognizedText,
  getLocation,
} from "@/utils/other";
import { Ping, PostResto, PostMenu, PostRecherche } from "@/utils/routes";
import { TextBlock } from "@/utils/type";
import Button from "@/components/Button";
import {
  Fond_vert_clair,
  Fourchette,
  Vert_C,
  Vert_feuille,
} from "@/utils/constants";

export default function Index() {
  const [data, setData] = useState<any[]>([]);
  const imagePath = require("../../assets/ingImages/imageDefault.jpg");
  const [filled, setFilled] = useState(false);
  const [done, setDone] = useState(false);
  const [imageUri, setImageUri] = useState(
    RNImage.resolveAssetSource(imagePath).uri,
  );
  const [nomResto, setNomResto] = useState("");
  const [Adresse, setAdresse] = useState("");
  // cette variable est utilisee , au cas où on a les restaurants
  const [RestosList, setRestosList] = useState([]);
  //
  const [filteredRestos, setfilteredRestos] = useState<any[]>([]);
  const [RestosData, setRestosData] = useState<string[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [loc, setLoc] = useState(false);

  async function setterLocation() {
    const loc = await getLocation();
    if (loc !== undefined) {
      setLocation(loc);
      setLoc(true);
    }
  }

  useEffect(() => {
    setterLocation();
  }, []);

  // Choisir une image depuis la galerie de l'utilisateur
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
      Alert.alert("","Vous n'avez selectionner aucune image.");
    }
  }

  // Charger les données de localisation , Insert les données en local ensuite les envoyer au serveur
  async function LoadLocAndInsertClient_SendDataToServeur(lines: any[]) {
    let Longitude = 0;
    let Latitude = 0;
    if (!loc) {
      await getLocation();
    }
    if (location) {
      Longitude = location.coords.longitude;
      Latitude = location.coords.latitude;

      // Pas besoin de tout mettre sous forme cle : valeur , car ceux qui ne le sont pas , sont explicites par leur nom
      // equivalent à la clé
      const resto = {
        NomResto: nomResto,
        Latitude,
        Longitude,
        Adresse,
      };

      // Insertion des données dans la base de données locale
      const idresto = await addRestaurants_Historique(resto);

      const menu = { NomMenu: nomResto, ID_restaurant: idresto };
      const res = await addMenus_Historique(menu);

      const textReconnu = JSON.stringify(lines);
      const recherche = {
        Text_request: textReconnu,
        ID_menu: res,
        Date: new Date().toLocaleDateString("fr-FR"),
      };
      await addRecherches_Historique(recherche);

      setNomResto("");
      const res1 = await DoSomethingWhenServerReady(resto, PostResto);
      const menuPost = { NomMenu: nomResto, ID_restaurant: res1.code };
      const res2 = await DoSomethingWhenServerReady(menuPost, PostMenu);
      const recherchePost = {
        Text_request: textReconnu,
        ID_menu: res2.code,
        Date: new Date().toLocaleDateString("fr-FR"),
      };
      // Envoi des données au serveur si la connexion est ok sinon on attend la reconnexion puis l'envoie
      await DoSomethingWhenServerReady(recherchePost, PostRecherche);
    }
  }

  // Reconnaissance du  texte de l'image , formattage des données
  // et envoi des données au serveur
  // Si l'image est vide , on remet les données à zéro
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

  // Fonction de reconnaissance de texte de
  async function recognizeText(): Promise<string[] | undefined> {
    try {
      const result = await TextRecognition.recognize(imageUri);
      const inter: TextBlock[] = result.blocks;
      const sortedText = sortRecognizedText(inter || []);
      const lines: string[] = [];
      for (const ligne of sortedText.split("\n")) {
        const v = ligne.split("*");
        const v1 = v.map((item) => {
          const res = item.trim().split(",");
          return res[0];
        });
        v1.forEach((item) => {
          if (
            !parseFloat(item) &&
            isNaN(parseInt(item)) &&
            item !== "" &&
            item !== " " &&
            isNaN(parseFloat(item))
          ) {
            lines.push(item.trim());
          }
        });
      }
      return lines;
    } catch (error) {
      Alert.alert("Erreur", "Échec de la reconnaissance de texte");
      console.error("Erreur OCR :", error);
    }
  }

  // Fonction appelée pour choisir un ingredient dans la liste des suggestions
  function Choose(ingredient: string) {
    if (ingredient.trim()) {
      setNomResto(ingredient.trim());
      setfilteredRestos([]);
    }
  }

  // Fonction pour recuperer les restaurants de la base de données
  // en fonction du nom du restaurant
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

  // Fonction pour filtrer les restaurants en fonction du texte
  // tapé par l'utilisateur
  // Si le texte est vide , on remet les restaurants à zéro
  // Sinon on filtre les restaurants en fonction du texte
  async function filterRestos(text: string) {
    setNomResto(text);
    await Alter_RestosFromBdd(text);
    if (text.trim() === "") {
      setfilteredRestos([]);
    } else {
      const filtered = RestosData.filter((Element) =>
        Element.toLowerCase().startsWith(text.toLowerCase()),
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
          {/* <ScrollView contentContainerStyle={styles.scrollContainer}> */}
          {/* <Text style={styles.title}>Scanner</Text> */}
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              {done ? (
                <View style={styles.RecongnitionContainer}>
                  <Text style={styles.title1}>Text (Plats) Reconnu(s) :</Text>
                  {data ? (
                    data.map((ligne, i) => <Textshow key={i} ligne={ligne} />)
                  ) : (
                    <Text style={styles.text}>Aucun texte reconnu</Text>
                  )}
                </View>
              ) : null}

              {imageUri && !done && (
                <View style={styles.imageContainer}>
                  <RNImage source={{ uri: imageUri }} style={styles.image} />
                </View>
              )}

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
                            onPress={() => Choose(item)}
                          >
                            <View style={styles.suggestionItem}>
                              <Text style={styles.suggestionText}>{item}</Text>
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

              {!done ? (
                <>
                  <TouchableOpacity style={styles.imageButton}>
                    <Button
                      theme="primary"
                      label="Choisir une image "
                      onPress={pickImage}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ ...styles.imageButton, top: 10 }}
                    // onPress={setRecoData}
                  >
                    <Button
                      theme="primary"
                      label="Analyser"
                      onPress={setRecoData}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity style={styles.imageButton}>
                  <Button
                    theme="primary"
                    label="Retour "
                    onPress={setRecoData}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/* </ScrollView> */}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    // flexGrow: 1,
    // paddingBottom: 40,
  },
  imageContainer: {
    // flex: 1,
    height: "60%",
    width: "auto",
    borderBlockColor: Fourchette,
    borderWidth: 5,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    // backgroundColor : Vert_C,
    // backgroundColor : Fond_vert_clair,
  },
  inputContainer: {
    width: "100%",
    height: "100%",
    padding: 16,
    marginBottom: 10,
    // backgroundColor: "white",
    // backgroundColor : Vert_C,
    backgroundColor: Fond_vert_clair,
    // borderRadius: 20,
    // marginTop: 20,
    borderBlockColor: Fourchette,
    borderWidth: 5,
  },
  title: {
    marginTop: 20,
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: Fourchette,
  },
  title1: {
    fontSize: 20,
    fontWeight: "bold",
    color: Fourchette,
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
    width: "98%",
  },
  text: {
    fontSize: 16,
    color: Fourchette,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    marginBottom: 20,
    resizeMode: "cover",
  },
  imageButton: {
    top: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 6,
  },
  imageButtonText: {
    color: Fourchette,
    fontWeight: "bold",
  },
  label: {
    color: Fourchette,
    marginTop: 12,
    marginBottom: 4,
  },
  input2: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    color: Fourchette,
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
    color: Fourchette,
  },
});
