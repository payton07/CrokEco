import { getIngredients, getPlats, getPlats_Ingredients, getSous_Groupes } from "./bdd";
import AsyncStorage from '@react-native-async-storage/async-storage';

export type info_t =  {Nom : string, Score : string , Unite : string,id:number};
export async function change(ide : number  ) {
  if(ide != undefined){
    //const ras = await getPlats({ID_plat : ide},false,true);
    const ras = await getPlats_Ingredients({ID_plat : ide},true, false, 10);
    let score : number = 0;
    if(ras !=undefined) {
      for (const ele of ras) {
        const res = await getIngredients({Code_AGB : ele.ID_ingredient},false,false);
        score += res?.at(0).Score_unique_EF;
      }
      const plat = await getPlats({ID_plat : ide},false,false);
      const info :info_t = {Nom: plat?.at(0).Nom_plat, Score: score.toPrecision(3), Unite:"mPt / kg de produit",id:ide};
      const out = {info : info, back : Qualite(score)};
      return out;
    }
    else {
      return {info : undefined, back : undefined};
    }
}
}

export function Qualite(score : number) {
  if (score == 0) {
    return "blue";
  }
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