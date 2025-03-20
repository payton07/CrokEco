import { getIngredients, getPlats, getSous_Groupes } from "./bdd";
import AsyncStorage from '@react-native-async-storage/async-storage';

export type info_t =  {Nom : string ,categorie : string , Score : string , Unite : string,id:number};
export async function change(ide : number  ) {
  let back = "black";
  if(ide != undefined){
    const ras = await getPlats({Ciqual_AGB : ide},false,true);
    const res = await getIngredients({Ciqual_AGB : ras?.at(0)?.Ciqual_AGB},true,false);
    const sous_groupe = await getSous_Groupes({ID_sous_groupe : ras?.at(0)?.ID_sous_groupe},false);
    if(ras !=undefined && res != undefined && sous_groupe != undefined) {
      let score : number = 0;
      for (const ele of res) {
        score += ele.Changement_climatique;
      }
      const info :info_t = {Nom: ras?.at(0).Nom_Francais, categorie: sous_groupe?.at(0).Sous_groupe_d_aliment, Score: score.toPrecision(3), Unite:"kg CO2 eq/kg de produit",id:ide};
      back = Qualite(score);
      const out = {info : info, back : Qualite(score)};
      return out;
    }
    else {
      return {info : undefined, back : undefined};
    }
}
}

export function Qualite(score : number) {
    if (score <= 1) {
      return "green";
    }
    if (score >1 && score <=5) {
      return "orange";
    }
    return "red";
}

export async function getDataWithCacheExpiration(key:string, apiCallFunction : ()=>{}, expirationTimeInMinutes = 30) {
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
    const apiData = await apiCallFunction();
    await AsyncStorage.setItem(
      key,
      JSON.stringify({ data: apiData, timestamp: Date.now() })
    );
    return apiData;
  } catch (error) {
    console.error("Erreur dans getDataWithCacheExpiration :", error);
  }
}