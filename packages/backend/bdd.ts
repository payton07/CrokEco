import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

import Database from 'better-sqlite3';


let db: Database.Database | null = null;

// Fonction pour ouvrir la base de données
function openDatabase(dbPath: string): Database.Database {
  if (!db) {
    db = new Database(dbPath, { verbose: console.log });  // option verbose pour débogage
    console.log('Base de données ouverte avec succès!');
  }
  return db;
}

const dbPath = '../bdd/ingredient_carbon_score.db';

// Initialise la base de données une seule fois
 function initDB() {
  if (!db) {
    db =  openDatabase(dbPath);
  }
}

initDB();

export function addSmt(table: string, data: any): number {
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

export function getSmt(table: string, data: any,all=false,limit: boolean | number=10,str=false): any[] {
  const selectQuery = `SELECT * FROM ${table}
      ${
          !data
              ? ""
              : "WHERE "+
                Object.entries(data)
                    .map(a => {
                      let res=``;
                      !str ? res =`${a[0]} = '${a[1]}'`
                        : res= `${a[0]} LIKE '${a[1]}'`
                      return res;
                    })
                    .join(" AND ")
      }
      ${limit ? "LIMIT "+limit : ""}
      `;

  const stmt = db?.prepare(selectQuery);
  // if(data && !all
  return stmt?.all() || [] 
}

export function updateSmt(table: string,query: string, set:any): number {
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

export function deleteSmt(table: string, query: string): number {
  const deleteQuery = `
      DELETE FROM ${table} WHERE ${query};
      `;

  const stmt = db?.prepare(deleteQuery);
  const info = stmt?.run();

  return info?.changes || 0;  // Nombre de lignes supprimées
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
export function getIngredients(data : boolean | any =false,all=false,str=false,limit: boolean | number=10): any[] | undefined {
  const res:any[] =  getSmt("Ingredients",data,all,limit,str);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export function getPlats(data : boolean | any =false,all=false,str=false,limit:number | boolean=10): any[] | undefined {
  const res:any[]| undefined = getSmt("Plats",data,all,limit,str);
  if(!res || res.length ==0 || res[0]==null){ return all? [] : undefined}
  else {
    return res ;
  }
}
export function getSous_Groupes(data : boolean | any =false,all=false): any[] | undefined {
  const res:any[]| undefined =  getSmt("Sous_Groupes",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export function getGroupes(data : boolean | any =false,all=false): any[] | undefined {
  const res:any[]| undefined =  getSmt("Groupes",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export function getTags(data : boolean | any =false,all=false): any[] | undefined {
  const res:any[]| undefined =  getSmt("Tags",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export function getRecherche(data : boolean | any =false,all=false): any[] | undefined {
  const res:any[]| undefined =  getSmt("Recherche",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export function getHistorique(data : boolean | any =false,all=false): any[] | undefined {
  const res:any[]| undefined =  getSmt("Historique",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export function getMenu(data : boolean | any =false,all=false): any[] | undefined {
  const res:any[]| undefined =  getSmt("Menu",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export function getDesigne_Tags(data : boolean | any =false,all=false): any[] | undefined {
  const res:any[]| undefined =  getSmt("Designe_Tags",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}

/**
 * UPDATES PAR TABLE
 */
export function updateIngredients(data : any): number {
  const query = `idCD = '${data.ID_ingredient}'`;
  const res:number =  updateSmt("Ingredients",query,data);
  return res ;
}
export function updatePlats(data : any): number {
  const query = `idCD = '${data.Ciqual_AGB}'`;
  const res:number =  updateSmt("Plats",query,data);
  return res ;
}
export function updateSous_Groupes(data : any): number {
  const query = `idCD = '${data.ID_sous_groupe}'`;
  const res:number =  updateSmt("Sous_Groupes",query,data);
  return res ;
}
export function updateGroupes(data : any): number {
  const query = `idCD = '${data.ID_groupe}'`;
  const res:number =  updateSmt("Groupes",query,data);
  return res ;
}
export function updateTags(data : any): number {
  const query = `idCD = '${data.ID_tags}'`;
  const res:number =  updateSmt("Tags",query,data);
  return res ;
}
export function updateRecherche(data : any): number {
  const query = `idCD = '${data.ID_recherche}'`;
  const res:number =  updateSmt("Recherche",query,data);
  return res ;
}
export function updateHistorique(data : any): number {
  const query = `idCD = '${data.ID_historique}'`;
  const res:number =  updateSmt("Historique",query,data);
  return res ;
}
export function updateMenu(data : any): number {
  const query = `idCD = '${data.ID_menu}'`;
  const res:number =  updateSmt("Menu",query,data);
  return res ;
}
export function updateDesigne_Tags(data : any): number {
  const query = `idCD = '${data.ID_tags}'`;
  const res:number =  updateSmt("Designe_Tags",query,data);
  return res ;
}
/**
 * INSERT PAR TABLE
 */
export  function addIngredients(data : boolean | any =false,all=false): number {
  const res:number =  addSmt("Ingredients",data);
  return res ;
}
export  function addPlats(data : boolean | any =false,all=false): number {
  const res:number =  addSmt("Plats",data);
  return res ;
}
export  function addSous_Groupes(data : boolean | any =false,all=false): number {
  const res:number =  addSmt("Sous_Groupes",data);
  return res ;
}
export  function addGroupes(data : boolean | any =false,all=false): number {
  const res:number =  addSmt("Groupes",data);
  return res ;
}
export  function addTags(data : boolean | any =false,all=false): number {
  const res:number =  addSmt("Tags",data);
  return res ;
}
export  function addRecherche(data : boolean | any =false,all=false): number {
  const res:number =  addSmt("Recherche",data);
  return res ;
}
export  function addHistorique(data : boolean | any =false,all=false): number {
  const res:number =  addSmt("Historique",data);
  return res ;
}
export  function addMenu(data : boolean | any =false,all=false): number {
  const res:number =  addSmt("Menu",data);
  return res ;
}
export  function addDesigne_Tags(data : boolean | any =false,all=false): number {
  const res:number =  addSmt("Designe_Tags",data);
  return res ;
}
/**
 * DELETE PAR TABLE
 */
export  function deleteIngredients(data : any): number {
  const query = `idCD = '${data.ID_ingredient}'`;
  const res:number =  deleteSmt("Ingredients",query);
  return res ;
}
export  function deletePlats(data : any): number {
  const query = `idCD = '${data.Ciqual_AGB}'`;
  const res:number =  deleteSmt("Plats",query);
  return res ;
}
export  function deleteSous_Groupes(data : any): number {
  const query = `idCD = '${data.ID_sous_groupe}'`;
  const res:number =  deleteSmt("Sous_Groupes",query);
  return res ;
}
export  function deleteGroupes(data : any): number {
  const query = `idCD = '${data.ID_groupe}'`;
  const res:number =  deleteSmt("Groupes",query);
  return res ;
}
export  function deleteTags(data : any): number {
  const query = `idCD = '${data.ID_tags}'`;
  const res:number =  deleteSmt("Tags",query);
  return res ;
}
export  function deleteRecherche(data : any): number {
  const query = `idCD = '${data.ID_recherche}'`;
  const res:number =  deleteSmt("Recherche",query);
  return res ;
}
export  function deleteHistorique(data : any): number {
  const query = `idCD = '${data.ID_historique}'`;
  const res:number =  deleteSmt("Historique",query);
  return res ;
}
export  function deleteMenu(data : any): number {
  const query = `idCD = '${data.ID_menu}'`;
  const res:number =  deleteSmt("Menu",query);
  return res ;
}
export  function deleteDesigne_Tags(data : any): number {
  const query = `idCD = '${data.ID_tags}'`;
  const res:number =  deleteSmt("Designe_Tags",query);
  return res ;
}