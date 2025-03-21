import Fastify from 'fastify';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { getIngredients, getPlats } from './acces_bdd.ts';

const fastify = Fastify();
const port = 3000;

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// Interface pour le body des utilisateurs
interface User {
  name: string;
  email: string;
}

// Middleware pour parser le JSON (Fastify gère déjà le JSON par défaut)
fastify.addContentTypeParser('application/json', { parseAs: 'string' }, (req: FastifyRequest, body: string) => {
  return JSON.parse(body);
});

// Route de base
fastify.get('/', async (request, reply) => {
  console.log("Le hello world");
  return { message: 'Hello, World!' };
});

// Route pour récupérer tous les utilisateurs
fastify.get('/api/users', async (request, reply) => {
  console.log("Les Users gets");
  return users;
});

// Récupérer tous les plats
fastify.get('/api/plats', async (request, reply) => {
  console.log("get plats");
  try {
    const data = await getIngredients(false, true, false);
    return reply.send(data);
  } catch (err) {
    console.error("Erreur lors de la récupération des plats:", err);
    return reply.status(500).send({ error: 'Erreur interne du serveur' });
  }
});

fastify.get('/api/plats/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const { id } = request.params; 
  console.log(`get plat avec id: ${id}`);

  try {
    const ide = {code_AGB : id}
    const data = await getIngredients(ide,false,false,1);
    
    if (!data) {
      return reply.status(404).send({ error: 'Plat non trouvé' });
    }
    return reply.send(data);
  } catch (err) {
    console.error("Erreur lors de la récupération du plat:", err);
    return reply.status(500).send({ error: 'Erreur interne du serveur' });
  }
});

// Ajouter un utilisateur
fastify.post('/api/users', async (request, reply) => {
  const { name, email }: User = request.body as User;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  return reply.code(201).send(newUser);
});

// Démarrer le serveur
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
