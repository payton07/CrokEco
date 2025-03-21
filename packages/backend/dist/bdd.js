import Database from 'better-sqlite3';
let db = null;
// Fonction pour ouvrir la base de données
function openDatabase(dbPath) {
    if (!db) {
        db = new Database(dbPath, { verbose: console.log }); // option verbose pour débogage
        console.log('Base de données ouverte avec succès!');
    }
    return db;
}
const dbPath = '../bdd/ingredient_carbon_score.db';
// Initialise la base de données une seule fois
function initDB() {
    if (!db) {
        db = openDatabase(dbPath);
    }
}
initDB();
export function addSmt(table, data) {
    const values = Object.values(data);
    const insertQuery = `
      INSERT INTO ${table} (${Object.keys(data).join(", ")})
      VALUES (${Object.values(data)
        .map(a => `'${a}'`)
        .join(", ")})
  `;
    const stmt = db?.prepare(insertQuery);
    const info = stmt?.run(...values);
    return info?.changes || 0;
}
export function getSmt(table, data, all = false, limit = 10, str = false) {
    const selectQuery = `SELECT * FROM ${table}
      ${!data
        ? ""
        : "WHERE " +
            Object.entries(data)
                .map(a => {
                let res = ``;
                !str ? res = `${a[0]} = '${a[1]}'`
                    : res = `${a[0]} LIKE '${a[1]}'`;
                return res;
            })
                .join(" AND ")}
      ${limit ? "LIMIT " + limit : ""}
      `;
    const stmt = db?.prepare(selectQuery);
    // if(data && !all
    return stmt?.all() || [];
}
export function updateSmt(table, query, set) {
    const updateQuery = `
      UPDATE ${table}
      SET ${Object.entries(set)
        .map(b => {
        return `${b[0]} = '${b[1]}'`;
    })
        .join(", ")}
      WHERE ${query};
  `;
    const stmt = db?.prepare(updateQuery);
    const info = stmt?.run(...Object.values(set));
    return info?.changes || 0;
}
export function deleteSmt(table, query) {
    const deleteQuery = `
      DELETE FROM ${table} WHERE ${query};
      `;
    const stmt = db?.prepare(deleteQuery);
    const info = stmt?.run();
    return info?.changes || 0; // Nombre de lignes supprimées
}
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
/**
 * Foncttions d'Operation Basique CRUD
 */
// /**
//  * Ajouter une entrée dans la table
//  * @param table Nom de la table
//  * @param data Données à insérer dans la table
//  * @returns Le nombre de lignes affectées
//  */
// export  function addSmt(table: string, data: any): number> {
//    initDB();  
//   const columns = Object.keys(data).join(', ');  
//   const values = Object.values(data)
//     .map((value) => `'${value}'`)
//     .join(', ');  
//   const insertQuery = `
//     INSERT INTO ${table} (${columns})
//     VALUES (${values})
//   `;
//   return new Promise((resolve, reject) => {
//     db?.serialize(() => {
//       db?.run(insertQuery, function (this: sqlite3.RunResult) {
//         if (this.changes > 0) {
//           resolve(this.changes);  
//         } else {
//           reject(new Error("Erreur lors de l'insertion."));
//         }
//       });
//     });
//   });
// }
// /**
//  * 
//  * @param table_name 
//  * @param data 
//  * @param all 
//  * @param limit 
//  * @returns 
//  */
// export  function getSmt(
//   table_name: string,
//   data: boolean | any = false,
//   all = false,
//   limit: boolean | number = false,
//   str: boolean = false
// ): Promise<any[]> {
//    initDB();
//   const res: any[] = [];
//   let query = `SELECT * FROM ${table_name}`;
//   if (data) {
//     query += ' WHERE ' + Object.entries(data)
//       .map(([key, value]) => {
//         return str ? `${key} LIKE '${value}'` : `${key} = '${value}'`;
//       })
//       .join(' AND ');
//   }
//   if (limit) {
//     query += ` LIMIT ${limit}`;
//   }
//   return new Promise((resolve, reject) => {
//     db?.all(query, (err, rows) => {
//       if (err) {
//         reject(new Error("Erreur lors de l'exécution de la requête : " + err.message));
//         return;
//       }
//       if (data && !all && rows.length > 0) {
//         res.push(rows[0]);  
//       } else {
//         res.push(...rows);  
//       }
//       resolve(res);
//     });
//   });
// }
// /**
//  * 
//  * @param table 
//  * @param query 
//  * @param set 
//  * @returns 
//  */
// export  function updateSmt(table: string, query: string, set: any): Promise<number> {
//    initDB();  // S'assurer que la base de données est initialisée
//   const setClause = Object.entries(set)
//     .map(([key, value]) => `${key} = '${value}'`)
//     .join(', ');  
//   const updateQuery = `
//     UPDATE ${table}
//     SET ${setClause}
//     WHERE ${query};
//   `;
//   return new Promise((resolve, reject) => {
//     // Exécuter la requête UPDATE
//     db?.run(updateQuery, function (this: sqlite3.RunResult, err: Error | null) {
//       if (err) {
//         reject(new Error('Erreur lors de la mise à jour : ' + err.message));
//         return;
//       }
//       resolve(this.changes);  
//     });
//   });
// }
// /**
//  * 
//  * @param table 
//  * @param query 
//  * @returns 
//  */
// export  function deleteSmt(table: string, query: string): Promise<number> {
//    initDB();  
//   const deleteQuery = `
//     DELETE FROM ${table}
//     WHERE ${query};
//   `;
//   return new Promise((resolve, reject) => {
//     db?.run(deleteQuery, function (this: sqlite3.RunResult, err: Error | null) {
//       if (err) {
//         reject(new Error('Erreur lors de la suppression : ' + err.message));
//         return;
//       }
//       resolve(this.changes);  
//     });
//   });
// }
/**
 * GETS / READS PAR TABLE ///////////////////////////////////////////////////////////////
 */
export function getIngredients(data = false, all = false, str = false, limit = 10) {
    const res = getSmt("Ingredients", data, all, limit, str);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export function getPlats(data = false, all = false, str = false, limit = 10) {
    const res = getSmt("Plats", data, all, limit, str);
    if (!res || res.length == 0 || res[0] == null) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export function getSous_Groupes(data = false, all = false) {
    const res = getSmt("Sous_Groupes", data, all, 10);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export function getGroupes(data = false, all = false) {
    const res = getSmt("Groupes", data, all, 10);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export function getTags(data = false, all = false) {
    const res = getSmt("Tags", data, all, 10);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export function getRecherche(data = false, all = false) {
    const res = getSmt("Recherche", data, all, 10);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export function getHistorique(data = false, all = false) {
    const res = getSmt("Historique", data, all, 10);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export function getMenu(data = false, all = false) {
    const res = getSmt("Menu", data, all, 10);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
export function getDesigne_Tags(data = false, all = false) {
    const res = getSmt("Designe_Tags", data, all, 10);
    if (!res || res.length == 0) {
        return all ? [] : undefined;
    }
    else {
        return res;
    }
}
/**
 * UPDATES PAR TABLE
 */
export function updateIngredients(data) {
    const query = `idCD = '${data.ID_ingredient}'`;
    const res = updateSmt("Ingredients", query, data);
    return res;
}
export function updatePlats(data) {
    const query = `idCD = '${data.Ciqual_AGB}'`;
    const res = updateSmt("Plats", query, data);
    return res;
}
export function updateSous_Groupes(data) {
    const query = `idCD = '${data.ID_sous_groupe}'`;
    const res = updateSmt("Sous_Groupes", query, data);
    return res;
}
export function updateGroupes(data) {
    const query = `idCD = '${data.ID_groupe}'`;
    const res = updateSmt("Groupes", query, data);
    return res;
}
export function updateTags(data) {
    const query = `idCD = '${data.ID_tags}'`;
    const res = updateSmt("Tags", query, data);
    return res;
}
export function updateRecherche(data) {
    const query = `idCD = '${data.ID_recherche}'`;
    const res = updateSmt("Recherche", query, data);
    return res;
}
export function updateHistorique(data) {
    const query = `idCD = '${data.ID_historique}'`;
    const res = updateSmt("Historique", query, data);
    return res;
}
export function updateMenu(data) {
    const query = `idCD = '${data.ID_menu}'`;
    const res = updateSmt("Menu", query, data);
    return res;
}
export function updateDesigne_Tags(data) {
    const query = `idCD = '${data.ID_tags}'`;
    const res = updateSmt("Designe_Tags", query, data);
    return res;
}
/**
 * INSERT PAR TABLE
 */
export function addIngredients(data = false, all = false) {
    const res = addSmt("Ingredients", data);
    return res;
}
export function addPlats(data = false, all = false) {
    const res = addSmt("Plats", data);
    return res;
}
export function addSous_Groupes(data = false, all = false) {
    const res = addSmt("Sous_Groupes", data);
    return res;
}
export function addGroupes(data = false, all = false) {
    const res = addSmt("Groupes", data);
    return res;
}
export function addTags(data = false, all = false) {
    const res = addSmt("Tags", data);
    return res;
}
export function addRecherche(data = false, all = false) {
    const res = addSmt("Recherche", data);
    return res;
}
export function addHistorique(data = false, all = false) {
    const res = addSmt("Historique", data);
    return res;
}
export function addMenu(data = false, all = false) {
    const res = addSmt("Menu", data);
    return res;
}
export function addDesigne_Tags(data = false, all = false) {
    const res = addSmt("Designe_Tags", data);
    return res;
}
/**
 * DELETE PAR TABLE
 */
export function deleteIngredients(data) {
    const query = `idCD = '${data.ID_ingredient}'`;
    const res = deleteSmt("Ingredients", query);
    return res;
}
export function deletePlats(data) {
    const query = `idCD = '${data.Ciqual_AGB}'`;
    const res = deleteSmt("Plats", query);
    return res;
}
export function deleteSous_Groupes(data) {
    const query = `idCD = '${data.ID_sous_groupe}'`;
    const res = deleteSmt("Sous_Groupes", query);
    return res;
}
export function deleteGroupes(data) {
    const query = `idCD = '${data.ID_groupe}'`;
    const res = deleteSmt("Groupes", query);
    return res;
}
export function deleteTags(data) {
    const query = `idCD = '${data.ID_tags}'`;
    const res = deleteSmt("Tags", query);
    return res;
}
export function deleteRecherche(data) {
    const query = `idCD = '${data.ID_recherche}'`;
    const res = deleteSmt("Recherche", query);
    return res;
}
export function deleteHistorique(data) {
    const query = `idCD = '${data.ID_historique}'`;
    const res = deleteSmt("Historique", query);
    return res;
}
export function deleteMenu(data) {
    const query = `idCD = '${data.ID_menu}'`;
    const res = deleteSmt("Menu", query);
    return res;
}
export function deleteDesigne_Tags(data) {
    const query = `idCD = '${data.ID_tags}'`;
    const res = deleteSmt("Designe_Tags", query);
    return res;
}
