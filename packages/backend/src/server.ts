import Fastify from 'fastify';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { addPlats_Client, addPlats_Ingredients_Client, getIngredients, getPlats, getPlats_Client } from '../utils/acces_bdd.ts';
import crypto from 'crypto';
import dotenv from 'dotenv';
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
// const IP = '192.168.1.129';
const IP = '172.24.23.198';
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
    const leplat = await getPlats_Client({'ID_plat':result},false,true,1);
    console.log("l'id du plat stocker : ",result);
    
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

// Démarrer le serveur
fastify.listen(port, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});


