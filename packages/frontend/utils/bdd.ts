import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

const dbName = 'ingredient_carbon_score.db';
// Le chemin où sera copiée la base de données
const dbPath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

let db: SQLite.SQLiteDatabase; 

/**
 *  Ouvrir la base de données SQLite
 */

async function openDatabase(): Promise<SQLite.SQLiteDatabase> {
    console.log("📂 Base de données introuvable dans documentDirectory, copie depuis le bundle...");

    try {
      // Charger l'asset via expo-asset
      const asset = Asset.fromModule(require('../assets/ingredient_carbon_score.db'));
      // Assurer que l'asset est téléchargé
      await asset.downloadAsync();

      if (!asset.localUri) {
        throw new Error("L'URI locale de l'asset n'a pas pu être récupérée.");
      }
      // Créer le répertoire si nécessaire
      await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite/`, { intermediates: true });

      // Copier l'asset vers le répertoire cible
      await FileSystem.copyAsync({
        from: asset.localUri,
        to: dbPath,
      });
      console.log("Base de données copiée !");
    } catch (error) {
      console.error("Erreur lors de la copie de la base de données :", error);
      throw error;
    }
  // } else {
  //   console.log("Base de données déjà existante.");
  // }

  // Ouvre et retourne la base de données
  return SQLite.openDatabaseAsync(dbName);
}

// Initialise la base de données une seule fois
async function initDB(): Promise<void> {
  if (!db) {
    db = await openDatabase();
  }
}

/**
 * Foncttions d'Operation Basique CRUD
 */

/**
 * 
 * @param table 
 * @param data 
 * @returns 
 */
export async function addSmt(table: string, data : any): Promise<number> {
  await initDB();
  const res: number[]| PromiseLike<number> = [];
  await db.withTransactionAsync(async () => {
    const statement = await db.prepareAsync(
      `
      INSERT INTO ${table} (${Object.keys(data).join(", ")})
      VALUES (${Object.values(data)
          .map(a => `'${a}'`)
          .join(", ")})
  `,
    );
    try {
      const result = await statement.executeAsync();
      res.push(result.changes);
    } finally {
      await statement.finalizeAsync();
    }
  });
  return res[0] ;
}
/**
 * 
 * @param table_name 
 * @param data 
 * @param all 
 * @param limit 
 * @returns 
 */
export async function getSmt(
  table_name: string,
  data: boolean | Record<string, any> = false,
  all = false,
  limit: boolean | number = false,
  str = false
): Promise<any[]> {
  await initDB();
  const res: any[] = [];
  // const tableCheck = await db.getFirstAsync("SELECT name FROM sqlite_master WHERE type='table' AND name=?", ['Ingredients']);
  // console.log("Table exists:", tableCheck);
  // const rows = await db.getAllAsync(`SELECT * FROM Ingredients LIMIT 5`);
  // console.log("Sample Rows:", rows);

  await db.withTransactionAsync(async () => {
    console.log("Transaction started");

    const whereClause = typeof data === "object" && data !== null
      ? "WHERE " + Object.entries(data)
          .map(([key, value]) => `${key} ${str ? "LIKE" : "="} ?`)
          .join(" AND ")
      : "";

    let query = `SELECT * FROM ${table_name} ${whereClause}`;
    const valuesArray = typeof data === "object" && data !== null
      ? Object.values(data)
      : [];

    if (typeof limit === "number" && limit > 0) {
      query += " LIMIT ?";
      valuesArray.push(limit);
    }

    console.log("Query:", query);
    console.log("Params:", valuesArray);

    const statement = await db.prepareAsync(query);
    try {
      const result = await statement.executeAsync(valuesArray);
      
      if (data && !all) {
        const firstRow = await result.getFirstAsync();
        if (firstRow) {
          res.push(firstRow);
        }
      } else {
        const rows = await result.getAllAsync();
        if (rows.length > 0) {
          res.push(...rows);
        }
      }
    } catch (error) {
      console.error("Database error:", error);
    } finally {
      await statement.finalizeAsync();
    }

    console.log("Transaction ended");
  });

  return res;
}

/**
 * 
 * @param table 
 * @param query 
 * @param set 
 * @returns 
 */
export async function updateSmt(table: string, query: string, set:any): Promise<number> {
  await initDB();
  const res: number[] | PromiseLike<number> = [];
  await db.withTransactionAsync(async () => {
    const statement = await db.prepareAsync(
      `
      UPDATE ${table}
      SET ${Object.entries(set)
          .map(b => {
              return `${b[0]} = '${b[1]}'`;
          })
          .join(", ")}
      WHERE ${query};
  `
    );
    try {
      const result = await statement.executeAsync();
      res.push(result.changes);
      
    } finally {
      await statement.finalizeAsync();
    }
  });
  return res[0];
}
/**
 * 
 * @param table 
 * @param query 
 * @returns 
 */
export async function deleteSmt(table: string, query: string): Promise<number> {
  await initDB();
  const res: number[] | PromiseLike<number> = [];
  await db.withTransactionAsync(async () => {
    const statement = await db.prepareAsync(
      `
      DELETE FROM ${table} WHERE ${query};
      `
    );
    try {
      const result = await statement.executeAsync();
      res.push(result.changes);
      
    } finally {
      await statement.finalizeAsync();
    }
  });
  return res[0];
}

/**
 * GETS / READS PAR TABLE ///////////////////////////////////////////////////////////////
 */
export async function getIngredients(data : boolean | any =false,all=false,str=false,limit: boolean | number=10): Promise<any[] | undefined> {
  const res:any[] = await getSmt("Ingredients",data,all,limit,str);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getPlats(data : boolean | any =false,all=false,str=false,limit:number | boolean=10): Promise<any[] | undefined> {
  const res:any[]| undefined = await getSmt("Plats",data,all,limit,str);
  if(!res || res.length ==0 || res[0]==null){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getSous_Groupes(data : boolean | any =false,all=false): Promise<any[] | undefined> {
  const res:any[]| undefined = await getSmt("Sous_Groupes",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getGroupes(data : boolean | any =false,all=false): Promise<any[] | undefined> {
  const res:any[]| undefined = await getSmt("Groupes",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getRecherches(data : boolean | any =false,all=false): Promise<any[] | undefined> {
  const res:any[]| undefined = await getSmt("Recherches",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getMenus(data : boolean | any =false,all=false): Promise<any[] | undefined> {
  const res:any[]| undefined = await getSmt("Menus",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getRestaurants(data : boolean | any =false,all=false): Promise<any[] | undefined> {
  const res:any[]| undefined = await getSmt("Restaurants",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getPlats_Ingredients(data : boolean | any =false,all=false,str=false,limit: boolean | number=10): Promise<any[] | undefined> {
  const res:any[] = await getSmt("Plats_Ingredients",data,all,limit,str);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getMenus_Plats(data : boolean | any =false,all=false): Promise<any[] | undefined> {
  const res:any[]| undefined = await getSmt("Menus_Plats",data,all,10);
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
  const res:number = await updateSmt("Ingredients",query,data);
  return res ;
}
export async function updatePlats(data : any): Promise<number> {
  const query = `idCD = '${data.Ciqual_AGB}'`;
  const res:number = await updateSmt("Plats",query,data);
  return res ;
}
export async function updateSous_Groupes(data : any): Promise<number> {
  const query = `idCD = '${data.ID_sous_groupe}'`;
  const res:number = await updateSmt("Sous_Groupes",query,data);
  return res ;
}
export async function updateGroupes(data : any): Promise<number> {
  const query = `idCD = '${data.ID_groupe}'`;
  const res:number = await updateSmt("Groupes",query,data);
  return res ;
}
export async function updateRecherches(data : any): Promise<number> {
  const query = `idCD = '${data.ID_recherche}'`;
  const res:number = await updateSmt("Recherches",query,data);
  return res ;
}
export async function updateMenus(data : any): Promise<number> {
  const query = `idCD = '${data.ID_menu}'`;
  const res:number = await updateSmt("Menus",query,data);
  return res ;
}
export async function updateRestaurants(data : any): Promise<number> {
  const query = `idCD = '${data.ID_menu}'`;
  const res:number = await updateSmt("Restaurants",query,data);
  return res ;
}
export async function updatePlats_Ingredients(data : any): Promise<number> {
  const query = `idCD = '${data.ID_menu}'`;
  const res:number = await updateSmt("Plats_Ingredients",query,data);
  return res ;
}
export async function updateMenus_Plats(data : any): Promise<number> {
  const query = `idCD = '${data.ID_menu}'`;
  const res:number = await updateSmt("Menus_Plats",query,data);
  return res ;
}
/**
 * INSERT PAR TABLE
 */
export async function addIngredients(data : boolean | any =false,all=false): Promise<number> {
  const res:number = await addSmt("Ingredients",data);
  return res ;
}
export async function addPlats(data : boolean | any =false,all=false): Promise<number> {
  const res:number = await addSmt("Plats",data);
  return res ;
}
export async function addSous_Groupes(data : boolean | any =false,all=false): Promise<number> {
  const res:number = await addSmt("Sous_Groupes",data);
  return res ;
}
export async function addGroupes(data : boolean | any =false,all=false): Promise<number> {
  const res:number = await addSmt("Groupes",data);
  return res ;
}
export async function addRecherche(data : boolean | any =false,all=false): Promise<number> {
  const res:number = await addSmt("Recherche",data);
  return res ;
}
export async function addMenus(data : boolean | any =false,all=false): Promise<number> {
  const res:number = await addSmt("Menus",data);
  return res ;
}
export async function addRestaurants(data : boolean | any =false,all=false): Promise<number> {
  const res:number = await addSmt("Restaurants",data);
  return res ;
}
export async function addPlats_Ingredients(data : boolean | any =false,all=false): Promise<number> {
  const res:number = await addSmt("Plats_Ingredients",data);
  return res ;
}
export async function addMenus_Plats(data : boolean | any =false,all=false): Promise<number> {
  const res:number = await addSmt("Menus_Plats",data);
  return res ;
}
/**
 * DELETE PAR TABLE
 */
export async function deleteIngredients(data : any): Promise<number> {
  const query = `idCD = '${data.ID_ingredient}'`;
  const res:number = await deleteSmt("Ingredients",query);
  return res ;
}
export async function deletePlats(data : any): Promise<number> {
  const query = `idCD = '${data.Ciqual_AGB}'`;
  const res:number = await deleteSmt("Plats",query);
  return res ;
}
export async function deleteSous_Groupes(data : any): Promise<number> {
  const query = `idCD = '${data.ID_sous_groupe}'`;
  const res:number = await deleteSmt("Sous_Groupes",query);
  return res ;
}
export async function deleteGroupes(data : any): Promise<number> {
  const query = `idCD = '${data.ID_groupe}'`;
  const res:number = await deleteSmt("Groupes",query);
  return res ;
}
export async function deleteRecherche(data : any): Promise<number> {
  const query = `idCD = '${data.ID_recherche}'`;
  const res:number = await deleteSmt("Recherche",query);
  return res ;
}
export async function deleteMenu(data : any): Promise<number> {
  const query = `idCD = '${data.ID_menu}'`;
  const res:number = await deleteSmt("Menu",query);
  return res ;
}
export async function deleteRestaurants(data : any): Promise<number> {
  const query = `idCD = '${data.ID_menu}'`;
  const res:number = await deleteSmt("Restaurants",query);
  return res ;
}
export async function deletePlats_Ingredients(data : any): Promise<number> {
  const query = `idCD = '${data.ID_menu}'`;
  const res:number = await deleteSmt("Plats_Ingredients",query);
  return res ;
}
export async function deleteMenus_Plats(data : any): Promise<number> {
  const query = `idCD = '${data.ID_menu}'`;
  const res:number = await deleteSmt("Menus_Plats",query);
  return res ;
}