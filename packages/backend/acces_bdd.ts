import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";
import sqlite3 from 'sqlite3';

let db: sqlite3.Database | null = null;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, './bdd_doc/ingredient_carbon_score.db'); 


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
        .join(", ")})
    `;
    const stmt = db.prepare(insertQuery);

    stmt.run(Object.values(data), function (this: sqlite3.RunResult, err: Error | null) {
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


export async function updateSmt(table: string, query: string, set: any): Promise<number> {
  await initDB();
  return new Promise((resolve, reject) => {

    if (!db) {
      return reject(new Error("La base de données n'est pas ouverte."));
    }

    const updateQuery = `
      UPDATE ${table}
      SET ${Object.entries(set)
        .map(b => `${b[0]} = '${b[1]}'`)
        .join(", ")}
      WHERE ${query};
    `;

    const stmt = db.prepare(updateQuery);

    stmt.run(Object.values(set), function (this: sqlite3.RunResult, err: Error | null) {
      if (err) {
        reject(new Error("Erreur lors de la mise à jour: " + err.message));
      } else {
        resolve(this.changes); 
      }
    });
  });
}

export async function deleteSmt(table: string, query: string): Promise<number> {
  await initDB();
  return new Promise((resolve, reject) => {
    // Vérifier si la base de données est ouverte
    if (!db) {
      return reject(new Error("La base de données n'est pas ouverte."));
    }

    const deleteQuery = `
      DELETE FROM ${table} WHERE ${query};
    `;

    const stmt = db.prepare(deleteQuery);

    stmt.run(function (this: sqlite3.RunResult, err: Error | null) {
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
export async function getPlats(data : boolean | any =false,all=false,str=false,limit:number | boolean=10): Promise<any[] | undefined> {
  const res:any[]| undefined = await getSmt("Plats",data,all,limit,str);
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

/**
 * UPDATES PAR TABLE
 */
export async function updateIngredients(data : any): Promise<number> {
  const query = `idCD = '${data.ID_ingredient}'`;
  const res:number =  await updateSmt("Ingredients",query,data);
  return res ;
}
export async function updatePlats(data : any): Promise<number> {
  const query = `idCD = '${data.Ciqual_AGB}'`;
  const res:number =  await updateSmt("Plats",query,data);
  return res ;
}
export async function updateSous_Groupes(data : any): Promise<number> {
  const query = `idCD = '${data.ID_sous_groupe}'`;
  const res:number =  await updateSmt("Sous_Groupes",query,data);
  return res ;
}
export async function updateGroupes(data : any): Promise<number> {
  const query = `idCD = '${data.ID_groupe}'`;
  const res:number =  await updateSmt("Groupes",query,data);
  return res ;
}
export async function updateTags(data : any): Promise<number> {
  const query = `idCD = '${data.ID_tags}'`;
  const res:number =  await updateSmt("Tags",query,data);
  return res ;
}
export async function updateRecherche(data : any): Promise<number> {
  const query = `idCD = '${data.ID_recherche}'`;
  const res:number =  await updateSmt("Recherche",query,data);
  return res ;
}
export async function updateHistorique(data : any): Promise<number> {
  const query = `idCD = '${data.ID_historique}'`;
  const res:number =  await updateSmt("Historique",query,data);
  return res ;
}
export async function updateMenu(data : any): Promise<number> {
  const query = `idCD = '${data.ID_menu}'`;
  const res:number =  await updateSmt("Menu",query,data);
  return res ;
}
export async function updateDesigne_Tags(data : any): Promise<number> {
  const query = `idCD = '${data.ID_tags}'`;
  const res:number =  await updateSmt("Designe_Tags",query,data);
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
export  async function addPlats_Ingredients_Client(data : boolean | any =false): Promise<number> {
  const res:number =  await addSmt("Plats_Ingredients_Client",data);
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
/**
 * DELETE PAR TABLE
 */
export  async function deleteIngredients(data : any): Promise<number> {
  const query = `idCD = '${data.ID_ingredient}'`;
  const res:number =  await deleteSmt("Ingredients",query);
  return res ;
}
export  async function deletePlats(data : any): Promise<number> {
  const query = `idCD = '${data.Ciqual_AGB}'`;
  const res:number =  await deleteSmt("Plats",query);
  return res ;
}
export  async function deleteSous_Groupes(data : any): Promise<number> {
  const query = `idCD = '${data.ID_sous_groupe}'`;
  const res:number =  await deleteSmt("Sous_Groupes",query);
  return res ;
}
export  async function deleteGroupes(data : any): Promise<number> {
  const query = `idCD = '${data.ID_groupe}'`;
  const res:number =  await deleteSmt("Groupes",query);
  return res ;
}
export  async function deleteTags(data : any): Promise<number> {
  const query = `idCD = '${data.ID_tags}'`;
  const res:number =  await deleteSmt("Tags",query);
  return res ;
}
export  async function deleteRecherche(data : any): Promise<number> {
  const query = `idCD = '${data.ID_recherche}'`;
  const res:number =  await deleteSmt("Recherche",query);
  return res ;
}
export  async function deleteHistorique(data : any): Promise<number> {
  const query = `idCD = '${data.ID_historique}'`;
  const res:number =  await deleteSmt("Historique",query);
  return res ;
}
export  async function deleteMenu(data : any): Promise<number> {
  const query = `idCD = '${data.ID_menu}'`;
  const res:number =  await deleteSmt("Menu",query);
  return res ;
}
export  async function deleteDesigne_Tags(data : any): Promise<number> {
  const query = `idCD = '${data.ID_tags}'`;
  const res:number =  await deleteSmt("Designe_Tags",query);
  return res ;
}