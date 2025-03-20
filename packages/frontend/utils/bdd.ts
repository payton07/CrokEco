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
  const dbExists = await FileSystem.getInfoAsync(dbPath);
  
  if (!dbExists.exists) {
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
  } else {
    console.log("Base de données déjà existante.");
  }

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
export async function getSmt(table_name:string,data : boolean | any =false,all=false,limit : boolean | number=false,str : boolean=false): Promise<any[]> {
  await initDB();
  const res:any[] = [];
  await db.withTransactionAsync(async () => {
    // const
    const statement = await db.prepareAsync(
      `SELECT * FROM ${table_name}
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
      `
    );
    try {
      const result = await statement.executeAsync();
      
      if(data && !all){
        res.push(await result.getFirstAsync());
      }
      else {
        const rows = await result.getAllAsync();
        for(const row of rows){
         res.push(row);
      }
    }
    } finally {
      await statement.finalizeAsync();
    }
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
export async function getTags(data : boolean | any =false,all=false): Promise<any[] | undefined> {
  const res:any[]| undefined = await getSmt("Tags",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getRecherche(data : boolean | any =false,all=false): Promise<any[] | undefined> {
  const res:any[]| undefined = await getSmt("Recherche",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getHistorique(data : boolean | any =false,all=false): Promise<any[] | undefined> {
  const res:any[]| undefined = await getSmt("Historique",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getMenu(data : boolean | any =false,all=false): Promise<any[] | undefined> {
  const res:any[]| undefined = await getSmt("Menu",data,all,10);
  if(!res || res.length ==0){ return all? [] : undefined}
  else {
    return res ;
  }
}
export async function getDesigne_Tags(data : boolean | any =false,all=false): Promise<any[] | undefined> {
  const res:any[]| undefined = await getSmt("Designe_Tags",data,all,10);
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
export async function updateTags(data : any): Promise<number> {
  const query = `idCD = '${data.ID_tags}'`;
  const res:number = await updateSmt("Tags",query,data);
  return res ;
}
export async function updateRecherche(data : any): Promise<number> {
  const query = `idCD = '${data.ID_recherche}'`;
  const res:number = await updateSmt("Recherche",query,data);
  return res ;
}
export async function updateHistorique(data : any): Promise<number> {
  const query = `idCD = '${data.ID_historique}'`;
  const res:number = await updateSmt("Historique",query,data);
  return res ;
}
export async function updateMenu(data : any): Promise<number> {
  const query = `idCD = '${data.ID_menu}'`;
  const res:number = await updateSmt("Menu",query,data);
  return res ;
}
export async function updateDesigne_Tags(data : any): Promise<number> {
  const query = `idCD = '${data.ID_tags}'`;
  const res:number = await updateSmt("Designe_Tags",query,data);
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
export async function addTags(data : boolean | any =false,all=false): Promise<number> {
  const res:number = await addSmt("Tags",data);
  return res ;
}
export async function addRecherche(data : boolean | any =false,all=false): Promise<number> {
  const res:number = await addSmt("Recherche",data);
  return res ;
}
export async function addHistorique(data : boolean | any =false,all=false): Promise<number> {
  const res:number = await addSmt("Historique",data);
  return res ;
}
export async function addMenu(data : boolean | any =false,all=false): Promise<number> {
  const res:number = await addSmt("Menu",data);
  return res ;
}
export async function addDesigne_Tags(data : boolean | any =false,all=false): Promise<number> {
  const res:number = await addSmt("Designe_Tags",data);
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
export async function deleteTags(data : any): Promise<number> {
  const query = `idCD = '${data.ID_tags}'`;
  const res:number = await deleteSmt("Tags",query);
  return res ;
}
export async function deleteRecherche(data : any): Promise<number> {
  const query = `idCD = '${data.ID_recherche}'`;
  const res:number = await deleteSmt("Recherche",query);
  return res ;
}
export async function deleteHistorique(data : any): Promise<number> {
  const query = `idCD = '${data.ID_historique}'`;
  const res:number = await deleteSmt("Historique",query);
  return res ;
}
export async function deleteMenu(data : any): Promise<number> {
  const query = `idCD = '${data.ID_menu}'`;
  const res:number = await deleteSmt("Menu",query);
  return res ;
}
export async function deleteDesigne_Tags(data : any): Promise<number> {
  const query = `idCD = '${data.ID_tags}'`;
  const res:number = await deleteSmt("Designe_Tags",query);
  return res ;
}