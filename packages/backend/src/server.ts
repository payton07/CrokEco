import Fastify from 'fastify';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { addMenus_Client, addPlats_Client, addPlats_Ingredients_Client, addRecherches_Client, addRestaurant_Client, getElementsPlatsAfter, getIngredients, getLastElementPlats, getMenus_Client, getPlats, getPlats_Client, getRecherches_Client, getRestaurant_Client } from '../utils/acces_bdd.ts';
import crypto from 'crypto';
import dotenv from 'dotenv';

type resto = {'NomResto':string,'Latitude':number,'Longitude':number};
type menu = {'NomMenu':string,'ID_restaurant':number};
type recherche = {'Text_request':string[],'ID_menu':number,'Date':string};
export type FormsDatas = {
  name: string;
  ingredients: Ingredient[];
};
export type Ingredient = {
  name: string;
  weight: string;
};
  
// Charger les variables d'environnement depuis le fichier .env
dotenv.config(); 

const SECRET_KEY = process.env.SECRET_KEY || 'defaultSecretKey';

function verifyHMACSignature(method : string, table: string, data : any, timestamp: string, clientSignature: string) {
  const body = JSON.stringify(data);
  
  const message = `${method}\n/api/${table}\n${body}\n${timestamp}`;
  
  const computedSignature = crypto.createHmac('sha256', SECRET_KEY).update(message).digest('hex');
  
  return computedSignature === clientSignature;
}
const IP = '192.168.1.129';
// const IP = '172.24.23.198';
const fastify = Fastify();
const port = {port :3000,host: IP};



// Route de base Entre 
fastify.get('/', async (request, reply) => {
  console.log("Le hello world");
  return { message: 'Hello, World!' };
});


// Récupérer tous les plats
fastify.get('/api/plats', async (request, reply) => {
  
  console.log("get plats");
  try {
    const data = await getPlats(false, true, false);
    console.log("la data",data);
    
    return reply.send(data);
  } catch (err) {
    console.error("Erreur lors de la récupération des plats:", err);
    return reply.status(500).send({ error: 'Erreur interne du serveur' });
  }
});

// Recuperer un plat en particulier
fastify.get('/api/plats/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const { id } = request.params; 
  console.log(`get plat avec id: ${id}`);

  try {
    const ide = {ID_plat : id}
    const data = await getPlats(ide,false,false,1);
    
    if (!data) {
      return reply.status(404).send({ error: 'Plat non trouvé' });
    }
    return reply.send(data);
  } catch (err) {
    console.error("Erreur lors de la récupération du plat:", err);
    return reply.status(500).send({ error: 'Erreur interne du serveur' });
  }
});

// Récupérer tous les Ingredients
fastify.get('/api/ingredients', async (request, reply) => {
  console.log("get Ingredients");
  try {
    const data = await getIngredients(false, true, false);
    
    return reply.send(data);
  } catch (err) {
    console.error("Erreur lors de la récupération des ingredients:", err);
    return reply.status(500).send({ error: 'Erreur interne du serveur' });
  }
});

// Recuperer un Ingredient en particulier
fastify.get('/api/ingredients/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const { id } = request.params; 
  console.log(`get Ingredient avec id: ${id}`);

  try {
    const ide = {Code_AGB : id}
    const data = await getIngredients(ide,false,false,1);
    
    if (!data) {
      return reply.status(404).send({ error: 'Ingredient non trouvé' });
    }
    return reply.send(data);
  } catch (err) {
    console.error("Erreur lors de la récupération de l'ingredient:", err);
    return reply.status(500).send({ error: 'Erreur interne du serveur' });
  }
});

// Ajouter un Plats
fastify.post('/api/plats', async (request, reply) => {
  const data = request.body as FormsDatas;
  const {name,ingredients} = data;
  console.log(`Tentative d'ajout d'un nouveau plat avec Nom_plat: ${name}`);

  const clientSignature = request.headers['x-signature'] as string;
  const timestamp = request.headers['x-timestamp'] as string;

  if (!verifyHMACSignature('POST', 'plats', data, timestamp, clientSignature)) {
    return reply.status(400).send({ status: 'error', message: 'Signature invalide' });
  }

  try {
    const plat = {'Nom_plat' : name ,'Certified' : 0,'Vote' : 0};
    const result = await addPlats_Client(plat);
    const leplat = await getPlats_Client({'ID_plat':result},true,false,1);
    const platres = leplat != undefined ? leplat[0] : {};
    console.log("nom du plat: ",platres);
    
    if (!result) {
      return reply.status(400).send({ error: "Échec de l'ajout du Plat" });
    }
    for (const obj of ingredients){
      const ingredient = await getIngredients({Nom_Francais:obj.name},false,true,1);
      if(!ingredient){
        return reply.status(400).send({ error: "Échec de l'ajout de l'association Plat_ingrédient, Ingredient inconnu" });
      }
      const data = {ID_plat: result,ID_ingredient: ingredient?.[0].Code_AGB,Quantite : obj.weight};
      const plat_ingredient = await addPlats_Ingredients_Client(data);
      if(!plat_ingredient){
        return reply.status(400).send({ error: "Échec de l'ajout de l'association Plat_ingrédient" });  
      }
    }
    return reply.status(201).send({ message: 'Plat ajouté avec succès', code : result });
  } catch (err) {
    console.error("Erreur lors de l'ajout du Plat:", err);
    return reply.status(500).send({ error: 'Erreur interne du serveur' });
  }
});

// Ajout resto 
fastify.post('/api/restaurants', async (request, reply) => {
  const data = request.body as resto;
  const {NomResto,Latitude,Longitude} = data;
  NomResto && Latitude && Longitude ? console.log(""): console.log("Pas les bonnes valeurs pour insert Restaurants");
  console.log(`Tentative d'ajout d'un nouveau resto avec NomResto: ${NomResto}`);

  const clientSignature = request.headers['x-signature'] as string;
  const timestamp = request.headers['x-timestamp'] as string;

  if (!verifyHMACSignature('POST', 'restaurants', data, timestamp, clientSignature)) {
    return reply.status(400).send({ status: 'error', message: 'Signature invalide' });
  }

  try {
    const result = await addRestaurant_Client(data);
    const leresto = await getRestaurant_Client({'ID_restaurant':result},true,false,1);
    const platres = leresto != undefined ? leresto[0] : {};
    console.log("le resto: ",platres);
    
    if (!result) {
      return reply.status(400).send({ error: "Échec de l'ajout du resto" });
    }
    
    return reply.status(201).send({ message: 'Resto ajouté avec succès', code : result });
  } catch (err) {
    console.error("Erreur lors de l'ajout du Resto:", err);
    return reply.status(500).send({ error: 'Erreur interne du serveur' });
  }
});

// Ajout Menu 
fastify.post('/api/menus', async (request, reply) => {
  const data = request.body as menu;
  const {NomMenu,ID_restaurant} = data;
  NomMenu && ID_restaurant ? console.log(""): console.log("Pas les bonnes valeurs pour insert menus");
  
  console.log(`Tentative d'ajout d'un nouveau menu avec NomMenu: ${NomMenu}`);

  const clientSignature = request.headers['x-signature'] as string;
  const timestamp = request.headers['x-timestamp'] as string;

  if (!verifyHMACSignature('POST', 'menus', data, timestamp, clientSignature)) {
    return reply.status(400).send({ status: 'error', message: 'Signature invalide' });
  }

  try {
    const result = await addMenus_Client(data);
    const lemenu = await getMenus_Client({'ID_menu':result},true,false,1);
    const platres = lemenu != undefined ? lemenu[0] : {};
    console.log("le menu: ",platres);
    
    if (!result) {
      return reply.status(400).send({ error: "Échec de l'ajout du Menu" });
    }
    
    return reply.status(201).send({ message: 'Menu ajouté avec succès', code : result });
  } catch (err) {
    console.error("Erreur lors de l'ajout du Menu:", err);
    return reply.status(500).send({ error: 'Erreur interne du serveur' });
  }
});

// Ajout recherche
fastify.post('/api/recherches', async (request, reply) => {
  const data = request.body as recherche;
  const {Text_request,ID_menu,Date} = data;
  Text_request && ID_menu && Date? console.log(""): console.log("Pas les bonnes valeurs pour insert Recherches ");
  
  console.log(`Tentative d'ajout d'une nouvelle recherche avec ID_Menu: ${ID_menu}`);

  const clientSignature = request.headers['x-signature'] as string;
  const timestamp = request.headers['x-timestamp'] as string;

  if (!verifyHMACSignature('POST', 'recherches', data, timestamp, clientSignature)) {
    return reply.status(400).send({ status: 'error', message: 'Signature invalide' });
  }

  try {
    const result = await addRecherches_Client(data);
    const larecherche = await getRecherches_Client({'ID_Recherche':result},true,false,1);
    const platres = larecherche != undefined ? larecherche[0] : {};
    console.log("la recherches: ",platres);
    
    if (!result) {
      return reply.status(400).send({ error: "Échec de l'ajout de La Recherche" });
    }
    
    return reply.status(201).send({ message: 'La Recherche ajouté avec succès', code : result });
  } catch (err) {
    console.error("Erreur lors de l'ajout La Recherche:", err);
    return reply.status(500).send({ error: 'Erreur interne du serveur' });
  }
});

// UpdateRequest 
fastify.post('/api/updates', async (request, reply) => {
  const data = request.body as { ID_plat: any};
  const {ID_plat} = data;
  ID_plat? console.log(""): console.log("Pas les bonnes valeurs pour Update");
  
  console.log(`Tentative de mise à jour `);

  const clientSignature = request.headers['x-signature'] as string;
  const timestamp = request.headers['x-timestamp'] as string;

  if (!verifyHMACSignature('POST', 'updates', data, timestamp, clientSignature)) {
    return reply.status(400).send({ status: 'error', message: 'Signature invalide' });
  }

  try {
    const LastPlatList : any[] | undefined = await getLastElementPlats();
    const lastPlat = LastPlatList != undefined ? LastPlatList[0] : {};

    if(lastPlat.ID_plat == ID_plat){
      return reply.status(201).send({ message: 'La BD est à jour !', code : lastPlat.ID_plat});
    }
    
    if(lastPlat.ID_plat > ID_plat){
      const platsAfter = await getElementsPlatsAfter({ ID_plat: ID_plat});

      return reply.status(201).send(JSON.stringify(platsAfter));
    }

    return reply.status(400).send({ error: "Échec de la mise à jour y a une incoherence des BDs!" });
    
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err);
    return reply.status(500).send({ error: 'Erreur interne du serveur' });
  }
});

// Démarrer le serveur
fastify.listen(port, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});


