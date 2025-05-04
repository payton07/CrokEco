import Constants from "expo-constants";
export const port = Constants.expoConfig?.extra?.PORT ;
export const IP = Constants.expoConfig?.extra?.HOST ;

export const SECRET_KEY = Constants.expoConfig?.extra?.SECRET_KEY ;
export const url = `http://${IP}:${port}/api/`;
export const DO_MAJ_CODE = "3333DOMAJ";
export const good = "#4CAF50";
export const bad = "red";
export const ok = "orange";
export const blue = "blue";

export const LAST_UPDATE_KEY = 'lastUpdateDate';

// code couleurs
export const couleur1 = "#153243";
export const couleur2 = "#61d095";
export const couleur3 = "#2b6c00";

export const Vert_C = "#2E6B3D";
export const Vert_feuille = "#6FCF6B";
export const Fourchette = "#2C4755";
export const Fond_vert_clair = "#D7F2DA";

//
export const Plats_differents = [
  "ACCOMPAGNEMENT",
  "LEGUME DUJOUR",
  "ASSIETTES DE LEGUMES",
  "ORIGINE France",
  "les complements du jour",
];
/**
 * Ce sont les mots qui ne ne sont des pas des plats
 */
export const Words_Not_Plats = [
  "origine France",
  "www.languedoc -restauration.fr",
  "LANGUEDOC",
  "RESTAURATION",
  "OU",
];
