import Fastify from "fastify";
import { addMenus_Client, addPlats, addPlats_Client, addPlats_Ingredients, addPlats_Ingredients_Client, addRecherches_Client, addRestaurant_Client, deletePlats_Client, deletePlats_Ingredients_Client, getElementsPlatsAfter, getIngredients, getLastElementPlats, getMenus_Client, getPlats, getPlats_Client, getPlats_Ingredients, getPlats_Ingredients_Client, getRecherches_Client, getRestaurant_Client, getUsers, updatePlats_Client, } from "../utils/acces_bdd.js";
import crypto from "crypto";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fastifyStatic from "@fastify/static";
import bcrypt from "bcrypt";
const DO_MAJ_CODE = 3333;
// Charger les variables d'environnement depuis le fichier .env
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY ?? '';
// const HOST = '0.0.0.0';
const HOST = '172.24.10.219';
const PORT = process?.env?.PORT ? parseInt(process.env.PORT) : 3000;
function verifyHMACSignature(method, table, data, timestamp, clientSignature) {
    const body = JSON.stringify(data);
    const message = `${method}\n/api/${table}\n${body}\n${timestamp}`;
    const computedSignature = crypto
        .createHmac("sha256", SECRET_KEY)
        .update(message)
        .digest("hex");
    console.log("message : ", message, "clientsignature:", clientSignature, "compted :", computedSignature);
    return computedSignature === clientSignature;
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fastify = Fastify();
const port = { port: PORT, host: HOST };
fastify.register(fastifyStatic, {
    root: path.join(__dirname),
    prefix: "/", // Accès direct aux fichiers
});
// Route pour la page d'accueil
fastify.get("/", async (request, reply) => {
    console.log("Le hello world");
    return reply.send({ message: "hello world !" });
});
fastify.get("/accueil", async (request, reply) => {
    console.log("Dans accueil");
    return reply.sendFile("accueil.html");
});
fastify.get("/ping", async (request, reply) => {
    return reply.code(201).send({ message: "ping reussi !", code: 201 });
});
fastify.post("/login", async (request, reply) => {
    // const name = "admin";
    // const mdpadmin = "123";
    // bcrypt.hash(mdpadmin, 10, async (err, hash) => {
    //   if (err) {
    //         console.error("Erreur de hachage :", err);
    //         return;
    //     }
    //     const user = {'Nom':name,'Mdp':hash};
    //     const res =await addUsers(user);
    //     console.log("user inserer : id ", res);
    // });
    const { nom, mdp } = request.body;
    console.log("le nv mdp ,", mdp);
    try {
        // Récupère les utilisateurs (supposons que getUsers() retourne une liste d'objets utilisateurs)
        const res1 = await getUsers(false, true, true, false);
        // Si l'utilisateur est trouvé et que le nom correspond
        if (res1 !== undefined && nom === res1.at(0).Nom) {
            // Utilisation de la version asynchrone de bcrypt.compare avec await
            const isMatch = await bcrypt.compare(mdp, res1.at(0).Mdp);
            if (isMatch) {
                console.log("Le mot de passe est correct !");
                return reply
                    .code(201)
                    .send({ message: "Connexion réussie !", code: 201 });
            }
            else {
                console.log("Le mot de passe est incorrect.");
                return reply.code(404).send({
                    message: "Nom utilisateur ou mot de passe incorrect !",
                    code: 404,
                });
            }
        }
        else {
            console.log("Utilisateur non trouvé.");
            return reply.code(404).send({
                message: "Nom utilisateur ou mot de passe incorrect !",
                code: 404,
            });
        }
    }
    catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs :", err);
        return reply
            .code(500)
            .send({ message: "Erreur interne du serveur", code: 500 });
    }
});
// Récupérer tous les plats
fastify.get("/api/plats", async (request, reply) => {
    console.log("get plats");
    try {
        const data = await getPlats(false, true, false);
        console.log("la data", data);
        return reply.send(JSON.stringify(data));
    }
    catch (err) {
        console.error("Erreur lors de la récupération des plats:", err);
        return reply.status(500).send({ error: "Erreur interne du serveur" });
    }
});
fastify.get("/api/platsClient", async (request, reply) => {
    console.log("get platsClient");
    try {
        const data = await getPlats_Client(false, true, false);
        console.log("la data", data?.length, data);
        return reply.send(JSON.stringify(data));
    }
    catch (err) {
        console.error("Erreur lors de la récupération des plats clients:", err);
        return reply.status(500).send({ error: "Erreur interne du serveur" });
    }
});
// Recuperer un plat en particulier
fastify.get("/api/plats/:id", async (request, reply) => {
    const { id } = request.params;
    console.log(`get plat avec id: ${id}`);
    try {
        const ide = { ID_plat: id };
        const data = await getPlats(ide, false, false, 1);
        if (!data) {
            return reply.status(404).send({ error: "Plat non trouvé" });
        }
        return reply.send(JSON.stringify(data));
    }
    catch (err) {
        console.error("Erreur lors de la récupération du plat:", err);
        return reply.status(500).send({ error: "Erreur interne du serveur" });
    }
});
// Récupérer tous les Ingredients
fastify.get("/api/ingredients", async (request, reply) => {
    console.log("get Ingredients");
    try {
        const data = await getIngredients(false, true, false);
        return reply.send(JSON.stringify(data));
    }
    catch (err) {
        console.error("Erreur lors de la récupération des ingredients:", err);
        return reply.status(500).send({ error: "Erreur interne du serveur" });
    }
});
// Recuperer un Ingredient en particulier
fastify.get("/api/ingredients/:id", async (request, reply) => {
    const { id } = request.params;
    console.log(`get Ingredient avec id: ${id}`);
    try {
        const ide = { Code_AGB: id };
        const data = await getIngredients(ide, false, false, 1);
        if (!data) {
            return reply.status(404).send({ error: "Ingredient non trouvé" });
        }
        return reply.send(JSON.stringify(data));
    }
    catch (err) {
        console.error("Erreur lors de la récupération de l'ingredient:", err);
        return reply.status(500).send({ error: "Erreur interne du serveur" });
    }
});
/**
 * Requetes d'ajout
 *
 */
// Ajouter un Plats
fastify.post("/api/platsClient", async (request, reply) => {
    const data = request.body;
    const { name, ingredients } = data;
    console.log(`Tentative d'ajout d'un nouveau plat avec Nom_plat: ${name}`);
    const clientSignature = request.headers["x-signature"];
    const timestamp = request.headers["x-timestamp"];
    if (!verifyHMACSignature("POST", "platsClient", data, timestamp, clientSignature)) {
        return reply
            .status(400)
            .send({ status: "error", message: "Signature invalide" });
    }
    try {
        const plat = { Nom_plat: name, Certified: 0, Like: 0, DisLike: 0 };
        const result = await addPlats_Client(plat);
        const leplat = await getPlats_Client({ ID_plat: result }, true, false, 1);
        const platres = leplat != undefined ? leplat[0] : {};
        console.log("nom du plat: ", platres);
        if (!result) {
            return reply.status(400).send({ error: "Échec de l'ajout du Plat" });
        }
        for (const obj of ingredients) {
            const ingredient = await getIngredients({ Nom_Francais: obj.name }, false, true, 1);
            if (ingredient == undefined || ingredient.length == 0) {
                console.log("Échec de l'ajout de l'association Plat_ingrédient, Ingredient inconnu");
                return reply.status(400).send({
                    error: "Échec de l'ajout de l'association Plat_ingrédient, Ingredient inconnu",
                });
            }
            const data = {
                ID_plat: result,
                ID_ingredient: ingredient?.[0].Code_AGB,
                Quantite: obj.weight,
            };
            const plat_ingredient = await addPlats_Ingredients_Client(data);
            if (plat_ingredient == undefined || !plat_ingredient) {
                console.log("Échec de l'ajout de l'association Plat_ingrédient");
                return reply
                    .status(400)
                    .send({ error: "Échec de l'ajout de l'association Plat_ingrédient" });
            }
        }
        return reply
            .status(201)
            .send({ message: "Plat ajouté avec succès", code: result });
    }
    catch (err) {
        console.error("Erreur lors de l'ajout du Plat:", err);
        return reply.status(500).send({ error: "Erreur interne du serveur" });
    }
});
fastify.post("/api/platsInsert", async (request, reply) => {
    const obj = request.body;
    // const {name,ingredients} = data;
    console.log(`Tentative d'ajout d'un nouveau plat avec Nom_plat: ${obj}`);
    // const clientSignature = request.headers['x-signature'] as string;
    // const timestamp = request.headers['x-timestamp'] as string;
    // if (!verifyHMACSignature('POST', 'plats', data, timestamp, clientSignature)) {
    //   return reply.status(400).send({ status: 'error', message: 'Signature invalide' });
    // }
    try {
        const plats = await getPlats_Client(obj, true, true, 1);
        const assoc = await getPlats_Ingredients_Client(obj, true, true, false);
        const plat = plats?.at(0);
        const id = plats?.at(0).ID_plat;
        delete plat.ID_plat;
        const res = await addPlats(plat);
        if (res && assoc != undefined && assoc.length > 0) {
            for (const a of assoc) {
                const asso = a;
                asso.ID_plat = res;
                await addPlats_Ingredients(asso);
            }
            const query = { ID_plat: id };
            console.log("l'id plat : ", id);
            await deletePlats_Ingredients_Client(query);
            await deletePlats_Client(query);
            return reply
                .status(201)
                .send({ message: "Plat ajouté avec succès", code: 201 });
        }
        return reply.status(201).send({ message: "Failed ", code: 404 });
    }
    catch (err) {
        console.error("Erreur lors de l'ajout du Plat:", err);
        return reply.status(500).send({ error: "Erreur interne du serveur" });
    }
});
// Ajout resto
fastify.post("/api/restaurants", async (request, reply) => {
    const data = request.body;
    const { NomResto, Latitude, Longitude } = data;
    NomResto && Latitude && Longitude
        ? console.log("")
        : console.log("Pas les bonnes valeurs pour insert Restaurants");
    console.log(`Tentative d'ajout d'un nouveau resto avec NomResto: ${NomResto}`);
    const clientSignature = request.headers["x-signature"];
    const timestamp = request.headers["x-timestamp"];
    if (!verifyHMACSignature("POST", "restaurants", data, timestamp, clientSignature)) {
        return reply
            .status(400)
            .send({ status: "error", message: "Signature invalide" });
    }
    try {
        const result = await addRestaurant_Client(data);
        const leresto = await getRestaurant_Client({ ID_restaurant: result }, true, false, 1);
        const platres = leresto != undefined ? leresto[0] : {};
        console.log("le resto: ", platres);
        if (!result) {
            return reply.status(400).send({ error: "Échec de l'ajout du resto" });
        }
        return reply
            .status(201)
            .send({ message: "Resto ajouté avec succès", code: result });
    }
    catch (err) {
        console.error("Erreur lors de l'ajout du Resto:", err);
        return reply.status(500).send({ error: "Erreur interne du serveur" });
    }
});
// Ajout Menu
fastify.post("/api/menus", async (request, reply) => {
    const data = request.body;
    const { NomMenu, ID_restaurant } = data;
    NomMenu && ID_restaurant
        ? console.log("")
        : console.log("Pas les bonnes valeurs pour insert menus");
    console.log(`Tentative d'ajout d'un nouveau menu avec NomMenu: ${NomMenu}`);
    const clientSignature = request.headers["x-signature"];
    const timestamp = request.headers["x-timestamp"];
    if (!verifyHMACSignature("POST", "menus", data, timestamp, clientSignature)) {
        return reply
            .status(400)
            .send({ status: "error", message: "Signature invalide" });
    }
    try {
        const result = await addMenus_Client(data);
        const lemenu = await getMenus_Client({ ID_menu: result }, true, false, 1);
        const platres = lemenu != undefined ? lemenu[0] : {};
        console.log("le menu: ", platres);
        if (!result) {
            return reply.status(400).send({ error: "Échec de l'ajout du Menu" });
        }
        return reply
            .status(201)
            .send({ message: "Menu ajouté avec succès", code: result });
    }
    catch (err) {
        console.error("Erreur lors de l'ajout du Menu:", err);
        return reply.status(500).send({ error: "Erreur interne du serveur" });
    }
});
// Ajout recherche
fastify.post("/api/recherches", async (request, reply) => {
    const data = request.body;
    const { Text_request, ID_menu, Date } = data;
    Text_request && ID_menu && Date
        ? console.log("")
        : console.log("Pas les bonnes valeurs pour insert Recherches ");
    console.log(`Tentative d'ajout d'une nouvelle recherche avec ID_Menu: ${ID_menu}`);
    const clientSignature = request.headers["x-signature"];
    const timestamp = request.headers["x-timestamp"];
    if (!verifyHMACSignature("POST", "recherches", data, timestamp, clientSignature)) {
        return reply
            .status(400)
            .send({ status: "error", message: "Signature invalide" });
    }
    try {
        const result = await addRecherches_Client(data);
        const larecherche = await getRecherches_Client({ ID_Recherche: result }, true, false, 1);
        const platres = larecherche != undefined ? larecherche[0] : {};
        console.log("la recherches: ", platres);
        if (!result) {
            return reply
                .status(400)
                .send({ error: "Échec de l'ajout de La Recherche" });
        }
        return reply
            .status(201)
            .send({ message: "La Recherche ajouté avec succès", code: result });
    }
    catch (err) {
        console.error("Erreur lors de l'ajout La Recherche:", err);
        return reply.status(500).send({ error: "Erreur interne du serveur" });
    }
});
/**
 * UpdateRequests
 */
fastify.post("/api/updates", async (request, reply) => {
    const data = request.body;
    const { ID_plat } = data;
    ID_plat ? console.log("") : console.log("Pas les bonnes valeurs pour Update");
    console.log(`Tentative de mise à jour `);
    const clientSignature = request.headers["x-signature"];
    const timestamp = request.headers["x-timestamp"];
    if (!verifyHMACSignature("POST", "updates", data, timestamp, clientSignature)) {
        return reply
            .status(400)
            .send({ status: "error", message: "Signature invalide" });
    }
    try {
        const LastPlatList = await getLastElementPlats();
        const lastPlat = LastPlatList != undefined ? LastPlatList[0] : {};
        if (lastPlat.ID_plat == ID_plat) {
            return reply
                .status(201)
                .send({ message: "La BD est à jour !", code: lastPlat.ID_plat });
        }
        if (lastPlat.ID_plat > ID_plat) {
            const platsAfter = await getElementsPlatsAfter({ ID_plat: ID_plat });
            let plat_ingredient = [];
            for (const ele of platsAfter) {
                console.log("plat : ", ele);
                const id = { ID_plat: ele.ID_plat };
                const res = await getPlats_Ingredients(id, true, false, false);
                console.log("plat_ingredient : ", res);
                if (res != undefined) {
                    plat_ingredient.push(...res);
                }
            }
            const data = { plats: platsAfter, plats_ingredients: plat_ingredient };
            return reply.status(201).send({
                message: JSON.stringify(data),
                code: DO_MAJ_CODE,
                last: lastPlat.ID_plat,
            });
        }
        return reply
            .status(400)
            .send({ error: "Échec de la mise à jour y a une incoherence des BDs!" });
    }
    catch (err) {
        console.error("Erreur lors de la mise à jour :", err);
        return reply.status(500).send({ error: "Erreur interne du serveur" });
    }
});
fastify.post("/api/updates/plats", async (request, reply) => {
    const data = request.body;
    const { query, set } = data;
    console.log(`Tentative de mise à jour du plat :${query} le set : ${set}`);
    const clientSignature = request.headers["x-signature"];
    const timestamp = request.headers["x-timestamp"];
    if (!verifyHMACSignature("POST", "updates/plats", data, timestamp, clientSignature)) {
        console.log("signature");
        return reply
            .status(400)
            .send({ status: "error", message: "Signature invalide" });
    }
    try {
        const platUpdate = await getPlats_Client(query, true, true, 1);
        console.log("Plat get pour update :", platUpdate);
        if (platUpdate != undefined && platUpdate.length > 0) {
            const plat = platUpdate.at(0);
            const query2 = `ID_plat = ${parseInt(plat.ID_plat)}`;
            Object.entries(set).map((a) => {
                plat[a[0]] = a[1];
            });
            delete plat["ID_plat"];
            console.log("plat res :", plat);
            const id_plat = await updatePlats_Client(plat, query2);
            if (id_plat) {
                console.log("Plat mise à jour ");
                return reply
                    .status(201)
                    .send({ message: "Plat mise à jour ", code: id_plat });
            }
            console.log("l'id plat res pb");
        }
        console.log("pb man");
        return reply
            .status(400)
            .send({ error: `Échec de la mise à jour du plat ${query}` });
    }
    catch (err) {
        console.error("Erreur lors de la mise à jour :", err);
        return reply.status(500).send({ error: "Erreur interne du serveur" });
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
