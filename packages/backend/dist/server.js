import express from 'express';
const app = express();
const port = 3000;
// Middleware pour parser le JSON
app.use(express.json());
// Route de base
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Exemple d'API : liste d'utilisateurs
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
];
// Récupérer tous les plats
// app.get('/api/plats', (req: Request, res: Response) => {
//   const data = getPlats();
//   // res.send("bien vue");
//   res.json(data);
// });
// //Récupérer un plat par son ID
// app.get('/api/plats/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   const donne = {id_plat: id};
//   // const data = getPlats(donne,false,false,false);
//   // if (data !== undefined &&data.length > 0) {
//   //   const plat = data[0];
//   //   res.status(201).json(plat);
//   // } else {
//   //   res.status(404).json({ message: 'Plat not found' });
//   // }
//   res.send("bien bien");
// });
// Ajouter un utilisateur
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});
// Lancer le serveur
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
