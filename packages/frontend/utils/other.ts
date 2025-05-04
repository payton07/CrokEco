import { getIngredients, getPlats, getPlats_Ingredients } from "./bdd";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { info_t, TextBlock } from "../utils/type";
import { blue, good, ok, bad, LAST_UPDATE_KEY } from "./constants";
import { Ping } from "./routes";
import NetInfo from '@react-native-community/netinfo';
import { Alert } from "react-native";
import * as Location from "expo-location";
/**
 * 
 * @param idplat : number
 * @param plat : any
 * @param Assocs : any[]
 * @description Fonction qui permet de formater les informations d'un plat
 *  et de ses ingredients
 * @returns un objet contenant les informations du plat, la couleur et les ingredients
 */
export async function FormatInfoPlatIngredients(idplat: number,plat=null,Assocs=null) : Promise<{info : info_t | undefined, color : string | undefined, ingredients : any[]}> {
  if (idplat != undefined) {
    // on recupere les lignes de l'association entre les plats et les ingredients
    let plat_ingredients: any[]|undefined = [];
    // Si on a deja les associations, on les utilise
    // sinon on les recupere de la base de données
    if(Assocs != null) {
      plat_ingredients = Assocs;
    }
    else{
      plat_ingredients = await getPlats_Ingredients(
        { ID_plat: idplat },
        true,
        false,
        false,
      );
    }
    // Definition des variables score et ingredients_data
    let score: number = 0;
    let ingredients_data: any[] = [];

    // On recupere les ingredients de chaque ligne
    // on les stocke dans ingredients_data  et on calcule le score
    if (plat_ingredients != undefined) {
      for (const ligne of plat_ingredients) {
        const res = await getIngredients(
          { Code_AGB: ligne.ID_ingredient },
          false,
          true,
          1
        );
        ingredients_data.push(res?.at(0));
        score += res?.at(0).Score_unique_EF;
      }

      // Pour chaque ingredient, on recupere le nom et on calcule le pourcentage dans le plat et la couleur 
      // on les stocke dans un tableau
      const obj_ingredient_out = [];
      for (const ingredient of ingredients_data) {
        const obj = [
          ingredient.Nom_Francais,
          [
            ((ingredient.Score_unique_EF / score) * 100).toPrecision(3),
            Qualite_color(ingredient.Score_unique_EF),
          ],
        ];
        obj_ingredient_out.push(obj);
      }

      // Si le plat est null, on le recupere de la base de données
      // sinon on le prend tel quel
      let objetPlat: any[] | undefined = [];
      if(plat != null) { objetPlat = [plat];}
      else {objetPlat = await getPlats({ ID_plat: idplat }, false, false, 1);}

      // on cree l'objet qui contient les infos du plat qui seront affichés
      const info: info_t = {
        Nom: objetPlat?.at(0).Nom_plat,
        Score: score.toPrecision(3),
        Unite: "mPt / kg de produit",
        id: idplat,
      };

      // on cree l'objet qui contient les infos du plat et des ingredients qu'il contient
      const out = {
        info: info,
        color: Qualite_color(score),
        ingredients: obj_ingredient_out,
      };
      return out;
    } else {
      return { info: undefined, color: undefined, ingredients: [] };
    }
  }
  return { info: undefined, color: undefined, ingredients: [] };
}

/**
 * 
 * @param score : number
 * @returns 
 * @description Fonction qui retourne la couleur en fonction du score, 
 * 0 : bleu ,
 * < 1 : vert ,
 * 1-5 : orange ,
 * sinon : rouge 
 */
export function Qualite_color(score: number) {
  if (score == 0) {
    return blue;
  }
  if (score <= 1) {
    return good;
  }
  if (score > 1 && score <= 5) {
    return ok;
  }
  return bad;
}

/**
 * 
 * @param key : string
 * @param CallFunction : () => {}
 * @param expirationTimeInMinutes : number par défaut 30 minutes
 * @description Fonction qui permet de récupérer des données en cache avec une expiration
 *  Si les données sont dans le cache et qu'elles ne sont pas expirées,
 *  on les retourne, sinon on appelle la fonction pour récupérer les données
 * @returns any
 * @throws Erreur si la récupération des données échoue
 */
export async function getDataWithCacheExpiration(
  key: string,
  CallFunction: () => {},
  expirationTimeInMinutes = 30
) {
  try {
    const cachedData = await AsyncStorage.getItem(key);
    if (cachedData !== null) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < expirationTimeInMinutes * 60 * 1000) {
        console.log(`Données récupérées depuis le cache (${key})`);
        return data;
      }
    }
    console.log(`Appel API pour récupérer ${key}`);
    const apiData = await CallFunction();
    await AsyncStorage.setItem(
      key,
      JSON.stringify({ data: apiData, timestamp: Date.now() })
    );
    return apiData;
  } catch (error) {
    console.error("Erreur dans getDataWithCacheExpiration :", error);
  }
}

/**
 * 
 * @param data : string[]
 * @description Fonction qui permet de formater les données des plats reconnus
 *  en appelant la fonction getPlats et FormatInfoPlatIngredients
 *  pour chaque plat reconnu
 * @returns [] liste des plats reconnus avec leur couleur et leur id
 * @throws Erreur si la récupération des plats échoue
 */
export async function FormatDataPlatReconnu(data: string[]) {
  const lines: any[] = [];
  for (const ligne of data) {
    const query = `${ligne}`;
    try {
      const plats = await getPlats({ Nom_plat: query }, false, true, 1);
      if (plats && plats.length > 0) {
        const id = plats[0].ID_plat;
        const obj = await FormatInfoPlatIngredients(id);
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

/**
 * 
 * @param strings : string[]
 * @description Fonction qui permet de trouver la chaîne de caractères la plus fréquente
 *  dans un tableau de chaînes de caractères
 * @returns string | null
 */
export function MostOccurent(strings: string[]): string | null {
  if (strings.length === 0) return null;

  const countMap: Record<string, number> = {};

  for (const str of strings) {
    countMap[str] = (countMap[str] || 0) + 1;
  }

  let maxCount = 0;
  let mostFrequent: string | null = null;

  for (const str in countMap) {
    if (countMap[str] > maxCount) {
      maxCount = countMap[str];
      mostFrequent = str;
    }
  }
  return mostFrequent;
}

/**
 * 
 * @param data : any , c'est les données à envoyer au serveur
 * @param SendFunction : Function , c'est la fonction qui va envoyer les données au serveur
 * @description Fonction qui permet d'envoyer des données au serveur
 *  lorsque le serveur est prêt ou que l'utilisateur est connecté , sinon elle attend la reconnexion
 * @returns Promise<any>
 */
export async function DoSomethingWhenServerReady(data: any,SendFunction : Function): Promise<any> {
  const isConnected = await NetInfo.fetch().then(state => state.isConnected);

  if (isConnected && await Ping()) {
    if (data == null) {return await SendFunction();}
    else {return await SendFunction(data);}
  } else {
    console.log('Serveur ou réseau indisponible. En attente de reconnexion...');

    return new Promise<any>((resolve) => {
      const interval = setInterval(async () => {
        const online = await NetInfo.fetch().then(state => state.isConnected);
        const serverUp = await Ping();

        if (online && serverUp) {
          clearInterval(interval);
          let res ;
          if (data == null) {res = await SendFunction();}
          else {res = await SendFunction(data);}
          resolve(res);
        }
      }, 5000);
    });
  }
}

/**
 * 
 * @param UpdateFonction : Function
 * @description Fonction qui permet de vérifier si la mise à jour a été effectuée aujourd'hui
 *  Si ce n'est pas le cas, elle appelle la fonction UpdateFonction
 *  et met à jour la date de la dernière mise à jour
 * @returns Promise<void>
 * @throws Erreur si la mise à jour échoue
 */
export async function checkForDailyUpdate (UpdateFonction : Function ){
  const today = new Date().toISOString().split('T')[0]; // format YYYY-MM-DD
  
  try {
    const lastUpdate = await AsyncStorage.getItem(LAST_UPDATE_KEY);

    if (lastUpdate !== today) {
      // Appelle ton backend ici
      await DoSomethingWhenServerReady(null,UpdateFonction);

      // Mets à jour la date locale
      await AsyncStorage.setItem(LAST_UPDATE_KEY, today);
      console.log('Données mises à jour automatiquement.');
    } else {
      console.log("Mise à jour déjà effectuée aujourd'hui.");
    }
  } catch (error) {
    // console.error('Erreur pendant la mise à jour automatique :', error);
    console.log("Erreur pendant la mise à jour automatique :", error);
  }
};

export function sortRecognizedText(blocks: TextBlock[]): string {
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

export async function getLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Erreur", "Autorisez la localisation pour continuer");
    return;
  }
  return await Location.getCurrentPositionAsync();
}