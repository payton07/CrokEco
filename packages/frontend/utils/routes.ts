import hmac from "crypto-js/hmac-sha256";
import { resto, menu, recherche } from "./type";
import { IP, port, SECRET_KEY, url } from "./constants";
import { FormData } from "@/utils/type";

// const SECRET_KEY='913580834d7f3d1235c2761b7e20a52ceea8cb864df4f3993ffda91417cb3829';
/**
 * 
 * @param method Décrit le type de la requête (GET, POST)
 * @param table Le nom de la table sur laquelle effectuer la requête
 * @param data Les données à envoyer dans le corps de la requête
 * @returns L'objet contenant la signature et le timestamp
 * @description Cette fonction génère une signature HMAC pour sécuriser les requêtes envoyées à l'API.
 * La signature est calculée en utilisant la méthode HMAC avec la clé secrète et le message formé par la méthode, l'URL de l'API, le corps de la requête et le timestamp.
 * Le timestamp est également inclus dans l'objet retourné.
 */
function genereHMACSignature(method: string, table: string, data: any) {
  const timestamp = Math.floor(Date.now() / 1000);

  const body = JSON.stringify(data);

  const message = `${method}\n/api/${table}\n${body}\n${timestamp}`;

  const signature = hmac(message, SECRET_KEY).toString();

  return { signature, timestamp };
}
/**
 * 
 * @param table Nom de la table sur laquelle effectuer la requête
 * @param id identifiant de l'élément à récupérer (ou false pour récupérer tous les éléments)
 * @description Effectue une requête GET sur l'API
 * @returns la réponse de l'API au format JSON ou null en cas d'erreur
 */
async function GET(table: string, id: string | boolean) {
  const url1 = id ? `${url}${table}/${id}` : `${url}${table}`;
  try {
    const response = await fetch(url1, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // console.log("url de get");
    
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // console.error("Erreur lors de la récupération du plat:", error);
    console.log("Erreur lors de la récupération du plat:", error);
    
    return null;
  }
}

/**
 * @description Effectue une requête POST sur l'API
 * @param table Nom de la table sur laquelle effectuer la requête
 * @param data Données à envoyer dans le corps de la requête
 * @returns La réponse de l'API au format JSON
 */
async function POST(table: string, data: any) {
  const method = "POST";
  const url1 = `${url}${table}`;

  const { signature, timestamp } = genereHMACSignature(method, table, data);

  const headers = {
    "Content-Type": "application/json",
    "X-Signature": signature,
    "X-Timestamp": timestamp.toString(),
  };
  // console.log("appel à POST avec url : ",SECRET_KEY);
  const response = await fetch(url1, {
    method: method,
    headers: headers,
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
}


export async function PostPlatClient(data: FormData) {
  console.log("appel à ajoutPlat");
  const res = await POST("platsClient", data);
  console.log("res :", res);
  return res;
}

export async function GetPlatClient(id: string | boolean) {
  const res = await GET("platsClient", id);
  console.log("Plat récupéré:", res);
}


export async function PostResto(data: resto) {
  console.log("appel à ajoutResto");
  const res = await POST("restaurants", data);
  console.log("res resto :", res);
  return res;
}

export async function PostMenu(data: menu) {
  console.log("appel à ajoutMenu");
  const res = await POST("menus", data);
  console.log("res resto :", res);
  return res;
}

export async function PostRecherche(data: recherche) {
  console.log("appel à ajoutRecherche");
  const res = await POST("recherches", data);
  console.log("res resto :", res);
}

export async function PostUpdateRequest(data: { ID_plat: any }) {
  console.log("Update request");
  const res = await POST("updates", data);
  return res;
}
export async function PostUpdatePlatsRequest(data: { query: any; set: any }) {
  console.log("Update request");
  const res = await POST("updates/plats", data);
  return res;
}

export async function GetPlat_a_Vote(id: string | boolean) {
  const res = await GET("platsClient", id);
  // console.log("Plat client récupéré:", res);
  return res;
}

/**
 * @description Effectue un ping sur le serveur pour vérifier s'il est en ligne
 * @returns null si erreur, sinon le code de la réponse du fetch (201)
 */
export async function Ping() {
  const urll = `http://${IP}:${port}/ping`;
  // console.log(urll);
  
  try {
    const response = await fetch(urll, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return response.status;
    }
    const data = await response.json();
    return data.code;
  } catch (error) {
    // console.error("Erreur lors du ping:", error);
    console.log("Erreur lors du ping:", error);
    
    return null;
  }
}
