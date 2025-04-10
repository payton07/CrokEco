import { getIngredients, getPlats, getPlats_Ingredients } from "./bdd";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { info_t } from "../utils/type";
import { blue, good, ok, bad } from "./constants";

export async function change(idplat: number) {
  if (idplat != undefined) {
    const plat_ingredients = await getPlats_Ingredients(
      { ID_plat: idplat },
      true,
      false,
      10
    );
    let score: number = 0;
    let ingredients_data: any[] = [];
    if (plat_ingredients != undefined) {
      for (const ligne of plat_ingredients) {
        const res = await getIngredients(
          { Code_AGB: ligne.ID_ingredient },
          false,
          true,
          1
        );
        ingredients_data.push(res?.at(0));
        score += res?.at(0).Score_unique_EF;
      }
      const obj_ingredient_out = [];
      for (const ingredient of ingredients_data) {
        const obj = [
          ingredient.Nom_Francais,
          [
            ((ingredient.Score_unique_EF / score) * 100).toPrecision(3),
            Qualite_color(ingredient.Score_unique_EF),
          ],
        ];
        obj_ingredient_out.push(obj);
      }
      const plat = await getPlats({ ID_plat: idplat }, false, false);
      const info: info_t = {
        Nom: plat?.at(0).Nom_plat,
        Score: score.toPrecision(3),
        Unite: "mPt / kg de produit",
        id: idplat,
      };
      const out = {
        info: info,
        color: Qualite_color(score),
        ingredients: obj_ingredient_out,
      };
      return out;
    } else {
      return { info: undefined, color: undefined, ingredients: [] };
    }
  }
  return { info: undefined, color: undefined, ingredients: [] };
}

export function Qualite_color(score: number) {
  if (score == 0) {
    return blue;
  }
  if (score <= 1) {
    return good;
  }
  if (score > 1 && score <= 5) {
    return ok;
  }
  return bad;
}

export async function getDataWithCacheExpiration(
  key: string,
  CallFunction: () => {},
  expirationTimeInMinutes = 30
) {
  try {
    const cachedData = await AsyncStorage.getItem(key);
    if (cachedData !== null) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < expirationTimeInMinutes * 60 * 1000) {
        console.log(`Données récupérées depuis le cache (${key})`);
        return data;
      }
    }
    console.log(`Appel API pour récupérer ${key}`);
    const apiData = await CallFunction();
    await AsyncStorage.setItem(
      key,
      JSON.stringify({ data: apiData, timestamp: Date.now() })
    );
    return apiData;
  } catch (error) {
    console.error("Erreur dans getDataWithCacheExpiration :", error);
  }
}

export async function FormatDataPlatReconnu(data: string[]) {
  const lines: any[] = [];
  for (const ligne of data) {
    const query = `${ligne}`;
    try {
      const plats = await getPlats({ Nom_plat: query }, false, true, 1);
      if (plats && plats.length > 0) {
        const id = plats[0].ID_plat;
        const obj = await change(id);
        lines.push({ text: ligne, color: obj?.color, id: id });
      } else {
        lines.push({ text: ligne, color: "black", id: null });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des plats:", error);
    }
  }
  return lines;
}

export function MostOccurent(strings: string[]): string | null {
  if (strings.length === 0) return null;

  const countMap: Record<string, number> = {};

  for (const str of strings) {
    countMap[str] = (countMap[str] || 0) + 1;
  }

  let maxCount = 0;
  let mostFrequent: string | null = null;

  for (const str in countMap) {
    if (countMap[str] > maxCount) {
      maxCount = countMap[str];
      mostFrequent = str;
    }
  }
  return mostFrequent;
}
