import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Route de base
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Exemple d'API : liste d'utilisateurs
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// Récupérer tous les utilisateurs
app.get('/api/users', (req: Request, res: Response) => {
  res.json(users);
});

// Ajouter un utilisateur
app.post('/api/users', (req: Request, res: Response) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
