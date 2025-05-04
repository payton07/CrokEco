import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";
let db = null;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../bdd_doc/ingredient_carbon_score.db");
async function openDatabase() {
    if (fs.existsSync(dbPath)) {
        console.log("Le fichier existe.");
    }
    else {
        console.log("Le fichier n'existe pas.", dbPath);
        return null;
    }
    if (!db) {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error("Erreur lors de l'ouverture de la base de données:", err.message);
            }
            else {
                console.log("Base de données ouverte avec succès!");
            }
        });
    }
    return db;
}
async function initDB() {
    if (!db) {
        db = await openDatabase();
    }
}
export async function addSmt(table, data) {
    await initDB();
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject(new Error("La base de données n'est pas ouverte."));
        }
        const insertQuery = `
    INSERT INTO ${table} (${Object.keys(data).join(", ")})
        VALUES (${Object.values(data)
            .map((a) => `'${a}'`)
            .join(",")})
    `;
        const stmt = db.prepare(insertQuery);
        console.log("la query : ", insertQuery);
        stmt.run(function (err) {
            if (err) {
                reject(new Error("Erreur lors de l'insertion: " + err.message));
            }
            else {
                resolve(this.lastID);
            }
        });
    });
}
export async function getSmt(table, data, all = false, limit = 10, str = false) {
    await initDB();
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject(new Error("La base de données n'est pas ouverte."));
        }
        let selectQuery = `SELECT * FROM ${table}`;
        if (data) {
            const conditions = Object.entries(data)
                .map(([key, value]) => {
                return str ? `${key} LIKE ?` : `${key} = ?`;
            })
                .join(" AND ");
            selectQuery += ` WHERE ${conditions}`;
        }
        if (limit) {
            selectQuery += ` LIMIT ${limit}`;
        }
        // console.log("la query : ",selectQuery);
        const stmt = db.prepare(selectQuery);
        const values = Object.values(data);
        stmt.all(...values, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows || []);
            }
        });
    });
}
export async function updateSmt(table, query, set) {
    await initDB();
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject(new Error("La base de données n'est pas ouverte."));
        }
        const updateQuery = `
      UPDATE ${table}
      SET ${Object.keys(set)
            .map((key) => `${key} = ?`)
            .join(", ")}
      WHERE ${query};
    `;
        console.log("update query :", updateQuery);
        const stmt = db.prepare(updateQuery);
        stmt.run([...Object.values(set)], function (err) {
            if (err) {
                reject(new Error("Erreur lors de la mise à jour: " + err.message));
            }
            else {
                resolve(this.changes);
            }
        });
        stmt.finalize();
    });
}
export async function deleteSmt(table, conditions) {
    await initDB();
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject(new Error("La base de données n'est pas ouverte."));
        }
        const conditionKeys = Object.keys(conditions);
        if (conditionKeys.length === 0) {
            return reject(new Error("Aucune condition spécifiée pour la suppression."));
        }
        const whereClause = conditionKeys.map((key) => `${key} = ?`).join(" AND ");
        const params = conditionKeys.map((key) => conditions[key]);
        const deleteQuery = `DELETE FROM ${table} WHERE ${whereClause}`;
        const stmt = db.prepare(deleteQuery);
        stmt.run(...params, function (err) {
            if (err) {
                reject(new Error("Erreur lors de la suppression: " + err.message));
            }
            else {
                resolve(this.changes);
            }
        });
    });
}
/**
 * GETS / READS PAR TABLE ///////////////////////////////////////////////////////////////
 */
export async function getIngredients(data = false, all = false, str = false, limit = 10) {
    const res = await getSmt("Ingredients", data, all, limit, str);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export async function getPlats_Ingredients_Client(data = false, all = false, str = false, limit = 10) {
    const res = await getSmt("Plats_Ingredients_Client", data, all, limit, str);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export async function getPlats_Client(data = false, all = false, str = false, limit = 10) {
    const res = await getSmt("Plats_Client", data, all, limit, str);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export async function getMenus_Client(data = false, all = false, str = false, limit = 10) {
    const res = await getSmt("Menus_Client", data, all, limit, str);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export async function getRecherches_Client(data = false, all = false, str = false, limit = 10) {
    const res = await getSmt("Recherches_Client", data, all, limit, str);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export async function getRestaurant_Client(data = false, all = false, str = false, limit = 10) {
    const res = await getSmt("Restaurants_Client", data, all, limit, str);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export async function getPlats(data = false, all = false, str = false, limit = 10) {
    const res = await getSmt("Plats", data, all, limit, str);
    if (!res || res.length == 0 || res[0] == null) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export async function getPlats_Ingredients(data = false, all = false, str = false, limit = 10) {
    const res = await getSmt("Plats_Ingredients", data, all, limit, str);
    if (!res || res.length == 0 || res[0] == null) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export async function getSous_Groupes(data = false, all = false) {
    const res = await getSmt("Sous_Groupes", data, all, 10);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export async function getGroupes(data = false, all = false) {
    const res = await getSmt("Groupes", data, all, 10);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export async function getTags(data = false, all = false) {
    const res = await getSmt("Tags", data, all, 10);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export async function getRecherche(data = false, all = false) {
    const res = await getSmt("Recherche", data, all, 10);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export async function getHistorique(data = false, all = false) {
    const res = await getSmt("Historique", data, all, 10);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export async function getMenu(data = false, all = false) {
    const res = await getSmt("Menu", data, all, 10);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export async function getDesigne_Tags(data = false, all = false) {
    const res = await getSmt("Designe_Tags", data, all, 10);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export async function getUsers(data = false, all = false, str = false, limit = 10) {
    const res = await getSmt("Users", data, all, limit, str);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export async function getLastElementPlats() {
    await initDB();
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject(new Error("La base de données n'est pas ouverte."));
        }
        let selectQuery = `SELECT * FROM Plats ORDER BY ID_plat DESC LIMIT 1`;
        const stmt = db.prepare(selectQuery);
        stmt.all((err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows || []);
            }
        });
    });
}
export async function getElementsPlatsAfter(data, after = true) {
    await initDB();
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject(new Error("La base de données n'est pas ouverte."));
        }
        let selectQuery = `SELECT * FROM Plats`;
        if (data) {
            const conditions = Object.entries(data)
                .map(([key, value]) => {
                return after ? `${key} > ?` : `${key} = ?`;
            })
                .join(" AND ");
            selectQuery += ` WHERE ${conditions}`;
        }
        // console.log("la query : ",selectQuery);
        const stmt = db.prepare(selectQuery);
        const values = Object.values(data);
        stmt.all(...values, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows || []);
            }
        });
    });
}
/**
 * UPDATES PAR TABLE
 */
export async function updateIngredients(data, query) {
    const res = await updateSmt("Ingredients", query, data);
    return res;
}
export async function updatePlats(data, query) {
    const res = await updateSmt("Plats", query, data);
    return res;
}
export async function updateSous_Groupes(data, query) {
    const res = await updateSmt("Sous_Groupes", query, data);
    return res;
}
export async function updateGroupes(data, query) {
    const res = await updateSmt("Groupes", query, data);
    return res;
}
export async function updateRecherches(data, query) {
    const res = await updateSmt("Recherches", query, data);
    return res;
}
export async function updateMenus(data, query) {
    const res = await updateSmt("Menus", query, data);
    return res;
}
export async function updateRestaurants(data, query) {
    const res = await updateSmt("Restaurants", query, data);
    return res;
}
export async function updatePlats_Ingredients(data, query) {
    const res = await updateSmt("Plats_Ingredients", query, data);
    return res;
}
export async function updateMenus_Plats(data, query) {
    const res = await updateSmt("Menus_Plats", query, data);
    return res;
}
export async function updatePlats_Client(data, query) {
    const res = await updateSmt("Plats_Client", query, data);
    return res;
}
/**
 * INSERT PAR TABLE
 */
export async function addIngredients(data = false) {
    const res = await addSmt("Ingredients", data);
    return res;
}
export async function addPlats(data = false) {
    const res = await addSmt("Plats", data);
    return res;
}
export async function addPlats_Client(data = false) {
    const res = await addSmt("Plats_Client", data);
    return res;
}
export async function addPlats_Ingredients(data = false) {
    const res = await addSmt("Plats_Ingredients", data);
    return res;
}
export async function addPlats_Ingredients_Client(data = false) {
    const res = await addSmt("Plats_Ingredients_Client", data);
    return res;
}
export async function addMenus_Client(data = false) {
    const res = await addSmt("Menus_Client", data);
    return res;
}
export async function addRestaurant_Client(data = false) {
    const res = await addSmt("Restaurants_Client", data);
    return res;
}
export async function addRecherches_Client(data = false) {
    const res = await addSmt("Recherches_Client", data);
    return res;
}
export async function addSous_Groupes(data = false) {
    const res = await addSmt("Sous_Groupes", data);
    return res;
}
export async function addGroupes(data = false) {
    const res = await addSmt("Groupes", data);
    return res;
}
export async function addTags(data = false) {
    const res = await addSmt("Tags", data);
    return res;
}
export async function addRecherche(data = false) {
    const res = await addSmt("Recherche", data);
    return res;
}
export async function addHistorique(data = false) {
    const res = await addSmt("Historique", data);
    return res;
}
export async function addMenu(data = false) {
    const res = await addSmt("Menu", data);
    return res;
}
export async function addDesigne_Tags(data = false) {
    const res = await addSmt("Designe_Tags", data);
    return res;
}
export async function addUsers(data = false) {
    const res = await addSmt("Users", data);
    return res;
}
/**
 * DELETE PAR TABLE
 */
export async function deleteIngredients(query) {
    const res = await deleteSmt("Ingredients", query);
    return res;
}
export async function deletePlats_Ingredients_Client(query) {
    const res = await deleteSmt("Plats_Ingredients_Client", query);
    return res;
}
export async function deletePlats_Client(query) {
    const res = await deleteSmt("Plats_Client", query);
    return res;
}
export async function deletePlats(query) {
    const res = await deleteSmt("Plats", query);
    return res;
}
export async function deleteSous_Groupes(query) {
    const res = await deleteSmt("Sous_Groupes", query);
    return res;
}
export async function deleteGroupes(query) {
    const res = await deleteSmt("Groupes", query);
    return res;
}
export async function deleteTags(query) {
    const res = await deleteSmt("Tags", query);
    return res;
}
export async function deleteRecherche(query) {
    const res = await deleteSmt("Recherche", query);
    return res;
}
export async function deleteHistorique(query) {
    const res = await deleteSmt("Historique", query);
    return res;
}
export async function deleteMenu(query) {
    const res = await deleteSmt("Menu", query);
    return res;
}
export async function deleteDesigne_Tags(query) {
    const res = await deleteSmt("Designe_Tags", query);
    return res;
}
