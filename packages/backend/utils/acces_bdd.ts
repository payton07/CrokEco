import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";
import sqlite3 from 'sqlite3';

let db: sqlite3.Database | null = null;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../bdd_doc/ingredient_carbon_score.db'); 


async function openDatabase(): Promise<sqlite3.Database | null> {
  if (fs.existsSync(dbPath)) {
    console.log('Le fichier existe.');
  } else {
    console.log('Le fichier n\'existe pas.');
    return null;
  }
  if (!db) {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erreur lors de l\'ouverture de la base de données:', err.message);
      } else {
        console.log('Base de données ouverte avec succès!');
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

export async function addSmt(table: string, data: any): Promise<number> {
  await initDB();
  return new Promise((resolve, reject) => {
    if (!db) {
      return reject(new Error("La base de données n'est pas ouverte."));
    }
    const insertQuery = `
    INSERT INTO ${table} (${Object.keys(data).join(", ")})
        VALUES (${Object.values(data)
            .map(a => `'${a}'`)
            .join(",")})
    `;
    const stmt = db.prepare(insertQuery);
    console.log("la query : ", insertQuery);
    

    stmt.run(function (this: sqlite3.RunResult, err: Error | null) {
      if (err) {
        reject(new Error("Erreur lors de l'insertion: " + err.message));
      } else {
        resolve(this.lastID);
      }
    });
  });
}


export async function getSmt(table: string, data: any, all = false, limit: boolean | number = 10, str = false): Promise<any[]> {
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

    stmt.all(...values, (err: Error | null, rows: any[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows || []); 
      }
    });
  });
}


export async function updateSmt(
  table: string,
  query: string,
  set: Record<string, any>
): Promise<number> {
  await initDB();

  return new Promise((resolve, reject) => {
    if (!db) {
      return reject(new Error("La base de données n'est pas ouverte."));
    }
    const updateQuery = `
      UPDATE ${table}
      SET ${Object.keys(set).map(key => `${key} = ?`).join(", ")}
      WHERE ${query};
    `;

    console.log("update query :", updateQuery);
    
    const stmt = db.prepare(updateQuery);

    stmt.run([...Object.values(set)], function (this: sqlite3.RunResult, err: Error | null) {
      if (err) {
        reject(new Error("Erreur lors de la mise à jour: " + err.message));
      } else {
        resolve(this.changes); 
      }
    });

    stmt.finalize(); 
  });
}

export async function deleteSmt(table: string, conditions: Record<string, any>): Promise<number> {
  await initDB();
  return new Promise((resolve, reject) => {
    if (!db) {
      return reject(new Error("La base de données n'est pas ouverte."));
    }

    const conditionKeys = Object.keys(conditions);
    if (conditionKeys.length === 0) {
      return reject(new Error("Aucune condition spécifiée pour la suppression."));
    }

    const whereClause = conditionKeys.map(key => `${key} = ?`).join(' AND ');
    const params = conditionKeys.map(key => conditions[key]);

    
    const deleteQuery = `DELETE FROM ${table} WHERE ${whereClause}`;

    const stmt = db.prepare(deleteQuery);

    stmt.run(...params, function (this: sqlite3.RunResult, err: Error | null) {
      if (err) {
        reject(new Error("Erreur lors de la suppression: " + err.message));
      } else {
        resolve(this.changes);  
      }
    });
  });
}



/**
 * GETS / READS PAR TABLE ///////////////////////////////////////////////////////////////
 */
export async function getIngredients(data : boolean | any =false,all=false,str=false,limit: boolean | number=10): Promise<any[] | undefined> {
  const res:any[] =  await getSmt("Ingredients",data,all,limit,str);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getPlats_Ingredients_Client(data : boolean | any =false,all=false,str=false,limit: boolean | number=10): Promise<any[] | undefined> {
  const res:any[] =  await getSmt("Plats_Ingredients_Client",data,all,limit,str);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getPlats_Client(data : boolean | any =false,all=false,str=false,limit: boolean | number=10): Promise<any[] | undefined> {
  const res:any[] =  await getSmt("Plats_Client",data,all,limit,str);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getMenus_Client(data : boolean | any =false,all=false,str=false,limit: boolean | number=10): Promise<any[] | undefined> {
  const res:any[] =  await getSmt("Menus_Client",data,all,limit,str);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getRecherches_Client(data : boolean | any =false,all=false,str=false,limit: boolean | number=10): Promise<any[] | undefined> {
  const res:any[] =  await getSmt("Recherches_Client",data,all,limit,str);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getRestaurant_Client(data : boolean | any =false,all=false,str=false,limit: boolean | number=10): Promise<any[] | undefined> {
  const res:any[] =  await getSmt("Restaurants_Client",data,all,limit,str);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getPlats(data : boolean | any =false,all=false,str=false,limit:number | boolean=10): Promise<any[] | undefined> {
  const res:any[]| undefined = await getSmt("Plats",data,all,limit,str);
  if(!res || res.length ==0 || res[0]==null){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getPlats_Ingredients(data : boolean | any =false,all=false,str=false,limit:number | boolean=10): Promise<any[] | undefined> {
  const res:any[]| undefined = await getSmt("Plats_Ingredients",data,all,limit,str);
  if(!res || res.length ==0 || res[0]==null){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getSous_Groupes(data : boolean | any =false,all=false): Promise<any[] | undefined> {
  const res:any[]| undefined =  await getSmt("Sous_Groupes",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getGroupes(data : boolean | any =false,all=false): Promise<any[] | undefined> {
  const res:any[]| undefined =  await getSmt("Groupes",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getTags(data : boolean | any =false,all=false): Promise<any[] | undefined> {
  const res:any[]| undefined =  await getSmt("Tags",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getRecherche(data : boolean | any =false,all=false): Promise<any[] | undefined> {
  const res:any[]| undefined =  await getSmt("Recherche",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getHistorique(data : boolean | any =false,all=false): Promise<any[] | undefined> {
  const res:any[]| undefined =  await getSmt("Historique",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getMenu(data : boolean | any =false,all=false): Promise<any[] | undefined> {
  const res:any[]| undefined =  await getSmt("Menu",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getDesigne_Tags(data : boolean | any =false,all=false): Promise<any[] | undefined> {
  const res:any[]| undefined =  await getSmt("Designe_Tags",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getUsers(data : boolean | any =false,all=false,str=false,limit:number | boolean=10): Promise<any[] | undefined> {
  const res:any[]| undefined =  await getSmt("Users",data,all,limit,str);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getLastElementPlats(): Promise<any[] | undefined> {
  await initDB();
  return new Promise((resolve, reject) => {
    if (!db) {
      return reject(new Error("La base de données n'est pas ouverte."));
    }

    let selectQuery = `SELECT * FROM Plats ORDER BY ID_plat DESC LIMIT 1`;
    
    const stmt = db.prepare(selectQuery);

    stmt.all((err: Error | null, rows: any[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows || []); 
      }
    });
  });
}
export async function getElementsPlatsAfter(data : any , after = true): Promise<any[]> {
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

    stmt.all(...values, (err: Error | null, rows: any[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows || []); 
      }
    });
  });
}



/**
 * UPDATES PAR TABLE
 */
export async function updateIngredients(data : any,query : string): Promise<number> {
  const res:number = await updateSmt("Ingredients",query,data);
  return res ;
}
export async function updatePlats(data : any,query : string): Promise<number> {
  const res:number = await updateSmt("Plats",query,data);
  return res ;
}
export async function updateSous_Groupes(data : any,query : string): Promise<number> {
  const res:number = await updateSmt("Sous_Groupes",query,data);
  return res ;
}
export async function updateGroupes(data : any,query : string): Promise<number> {
  const res:number = await updateSmt("Groupes",query,data);
  return res ;
}
export async function updateRecherches(data : any,query : string): Promise<number> {
  const res:number = await updateSmt("Recherches",query,data);
  return res ;
}
export async function updateMenus(data : any,query : string): Promise<number> {
  const res:number = await updateSmt("Menus",query,data);
  return res ;
}
export async function updateRestaurants(data : any,query : string): Promise<number> {
  const res:number = await updateSmt("Restaurants",query,data);
  return res ;
}
export async function updatePlats_Ingredients(data : any,query : string): Promise<number> {
  const res:number = await updateSmt("Plats_Ingredients",query,data);
  return res ;
}
export async function updateMenus_Plats(data : any,query : string): Promise<number> {
  const res:number = await updateSmt("Menus_Plats",query,data);
  return res ;
}
export async function updatePlats_Client(data : any,query : string): Promise<number> {
  const res:number = await updateSmt("Plats_Client",query,data);
  return res ;
}
/**
 * INSERT PAR TABLE
 */
export  async function addIngredients(data : boolean | any =false): Promise<number> {
  const res:number =  await addSmt("Ingredients",data);
  return res ;
}
export  async function addPlats(data : boolean | any =false): Promise<number> {
  const res:number =  await addSmt("Plats",data);
  return res ;
}
export  async function addPlats_Client(data : boolean | any =false): Promise<number> {
  const res:number =  await addSmt("Plats_Client",data);
  return res ;
}
export  async function addPlats_Ingredients(data : boolean | any =false): Promise<number> {
  const res:number =  await addSmt("Plats_Ingredients",data);
  return res ;
}
export  async function addPlats_Ingredients_Client(data : boolean | any =false): Promise<number> {
  const res:number =  await addSmt("Plats_Ingredients_Client",data);
  return res ;
}
export  async function addMenus_Client(data : boolean | any =false): Promise<number> {
  const res:number =  await addSmt("Menus_Client",data);
  return res ;
}
export  async function addRestaurant_Client(data : boolean | any =false): Promise<number> {
  const res:number =  await addSmt("Restaurants_Client",data);
  return res ;
}
export  async function addRecherches_Client(data : boolean | any =false): Promise<number> {
  const res:number =  await addSmt("Recherches_Client",data);
  return res ;
}

export  async function addSous_Groupes(data : boolean | any =false): Promise<number> {
  const res:number =  await addSmt("Sous_Groupes",data);
  return res ;
}
export  async function addGroupes(data : boolean | any =false): Promise<number> {
  const res:number =  await addSmt("Groupes",data);
  return res ;
}
export  async function addTags(data : boolean | any =false): Promise<number> {
  const res:number =  await addSmt("Tags",data);
  return res ;
}
export  async function addRecherche(data : boolean | any =false): Promise<number> {
  const res:number =  await addSmt("Recherche",data);
  return res ;
}
export  async function addHistorique(data : boolean | any =false): Promise<number> {
  const res:number =  await addSmt("Historique",data);
  return res ;
}
export  async function addMenu(data : boolean | any =false): Promise<number> {
  const res:number =  await addSmt("Menu",data);
  return res ;
}
export  async function addDesigne_Tags(data : boolean | any =false): Promise<number> {
  const res:number =  await addSmt("Designe_Tags",data);
  return res ;
}
export  async function addUsers(data : boolean | any =false): Promise<number> {
  const res:number =  await addSmt("Users",data);
  return res ;
}
/**
 * DELETE PAR TABLE
 */
export  async function deleteIngredients(query : Record<string, any>): Promise<number> {
  const res:number =  await deleteSmt("Ingredients",query);
  return res ;
}
export  async function deletePlats_Ingredients_Client(query : Record<string, any>): Promise<number> {
  const res:number =  await deleteSmt("Plats_Ingredients_Client",query);
  return res ;
}
export  async function deletePlats_Client(query : Record<string, any>): Promise<number> {
  const res:number =  await deleteSmt("Plats_Client",query);
  return res ;
}
export  async function deletePlats(query : Record<string, any>): Promise<number> {
  const res:number =  await deleteSmt("Plats",query);
  return res ;
}
export  async function deleteSous_Groupes(query : Record<string, any>): Promise<number> {
  const res:number =  await deleteSmt("Sous_Groupes",query);
  return res ;
}
export  async function deleteGroupes(query : Record<string, any>): Promise<number> {
  const res:number =  await deleteSmt("Groupes",query);
  return res ;
}
export  async function deleteTags(query : Record<string, any>): Promise<number> {
  const res:number =  await deleteSmt("Tags",query);
  return res ;
}
export  async function deleteRecherche(query : Record<string, any>): Promise<number> {
  const res:number =  await deleteSmt("Recherche",query);
  return res ;
}
export  async function deleteHistorique(query : Record<string, any>): Promise<number> {
  const res:number =  await deleteSmt("Historique",query);
  return res ;
}
export  async function deleteMenu(query : Record<string, any>): Promise<number> {
  const res:number =  await deleteSmt("Menu",query);
  return res ;
}
export  async function deleteDesigne_Tags(query : Record<string, any>): Promise<number> {
  const res:number =  await deleteSmt("Designe_Tags",query);
  return res ;
}