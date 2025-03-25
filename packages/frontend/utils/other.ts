import hmac from 'crypto-js/hmac-sha256';
import { getIngredients, getPlats, getPlats_Ingredients, getSous_Groupes } from "./bdd";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SECRET_KEY} from '@env'; // C'EST NORMAL QU'IL SIGNALE UNE ERREUR (IGNOREZ) !!!

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
const url = `http://${IP}:${port}/api/`;

function genereHMACSignature(method: string, table: string, data: any) {
  console.log("Secret key",SECRET_KEY);
  
  const timestamp = Math.floor(Date.now() / 1000); 
  const body = JSON.stringify(data);
  
  const message = `${method}\n/api/${table}\n${body}\n${timestamp}`;
  
  const signature = hmac(message, SECRET_KEY).toString();
  
  return { signature, timestamp };
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
  console.log("J'ai eu resultat de POST");

  const res = await response.json();
  return res;
}

export async function ajouterPlat(data: FormData) {
  console.log("appel à ajout");
  const res = await POST("plats", data);
  console.log(res);
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

export async function getPlat(id: string | boolean) {
  const res = await GET('plats',id);
  console.log("Plat récupéré:", res);
}

