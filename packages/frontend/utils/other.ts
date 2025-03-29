import hmac from 'crypto-js/hmac-sha256';
import { getIngredients, getPlats, getPlats_Ingredients, getSous_Groupes } from "./bdd";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
const SECRET_KEY = Constants.expoConfig?.extra?.SECRET_KEY ?? "default_secret_key";
// console.log(SECRET_KEY); 

export type info_t =  {Nom : string, Score : string , Unite : string,id:number};
export async function change(idplat : number  ) {
  if(idplat != undefined){
    //const ras = await getPlats({ID_plat : idplat},false,true);
    const plat_ingredients = await getPlats_Ingredients({ID_plat : idplat},true, false, 10);
    let score : number = 0;
    let ingredients_data = [];
    if(plat_ingredients !=undefined) {
      for (const ligne of plat_ingredients) {
        const res = await getIngredients({Code_AGB : ligne.ID_ingredient},false,false,1);
        ingredients_data.push(res?.at(0));
        score += res?.at(0).Score_unique_EF;
      }
      const plat = await getPlats({ID_plat : idplat},false,false);
      const info :info_t = {Nom: plat?.at(0).Nom_plat, Score: score.toPrecision(3), Unite:"mPt / kg de produit",id:idplat};
      const out = {info : info, back : Qualite(score),ingredients : ingredients_data};
      return out;
    }
    else {
      return {info : undefined, back : undefined,ingredients :[]};
    }
  }
  return {info : undefined, back : undefined,ingredients :[]};
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

export async function getDataWithCacheExpiration(key:string, CallFunction : ()=>{}, expirationTimeInMinutes = 30) {
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


/////////////////////////////////////////////
//////////////////// API ////////////////////
/////////////////////////////////////////////
export type Ingredient = {
  name: string;
  weight: string;
};

export type FormData = {
  name: string;
  ingredients: Ingredient[];
};
const port = 3000;
const IP = '192.168.1.129';
// const IP = '172.24.23.198';
const url = `http://${IP}:${port}/api/`;

function genereHMACSignature(method: string, table: string, data: any) {
  const timestamp = Math.floor(Date.now() / 1000); 
  
  const body = JSON.stringify(data);
  
  const message = `${method}\n/api/${table}\n${body}\n${timestamp}`;
  
  const signature = hmac(message, SECRET_KEY).toString();
  
  return { signature, timestamp };
}

async function GET(table: string ,id:string| boolean){
  const url1 = id ? `${url}${table}/${id}` : `${url}${table}`;
  try {
    const response = await fetch(url1, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data ;
  } catch (error) {
    console.error("Erreur lors de la récupération du plat:", error);
    return null ;
  }
}

async function POST(table: string, data: any) {
  const method = "POST";
  const url1 = `${url}${table}`;
  
  const { signature, timestamp } = genereHMACSignature(method, table, data);
  
  const headers = {
    "Content-Type": "application/json",
    "X-Signature": signature,  
    "X-Timestamp": timestamp.toString(),
  };
  console.log("appel à POST avec url : ",url1);
  const response = await fetch(url1, {
    method: method,
    headers: headers,
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
}

/**
 *  OPE suf PLAT 
 * @param data 
 */
export async function ajouterPlat(data: FormData) {
  console.log("appel à ajoutPlat");
  const res = await POST("plats", data);
  console.log("res :",res);
  return res;
}

export async function getPlat(id: string | boolean) {
  const res = await GET('plats',id);
  console.log("Plat récupéré:", res);
}

/**
 *  ANALYSE 
 * @param data 
 */
type resto = {'NomResto':string,'Latitude':number,'Longitude':number};
type menu = {'NomMenu':string,'ID_restaurant':number};
type recherche = {'Text_request':string,'ID_menu':number,'Date':string};

export async function ajouterResto(data: resto) {
  console.log("appel à ajoutResto");
  const res = await POST("restaurants", data);
  console.log("res resto :",res);
  return res;
}

export async function ajouterMenu(data: menu) {
  console.log("appel à ajoutResto");
  const res = await POST("menus", data);
  console.log("res resto :",res);
  return res;
}

export async function ajouterRecherche(data: recherche) {
  console.log("appel à ajoutResto");
  const res = await POST("recherches", data);
  console.log("res resto :",res);
}


export async function updateRequest(data:{ ID_plat: any}){
  console.log("Update request");
  const res = await POST("updates",data);
  return res;
}
