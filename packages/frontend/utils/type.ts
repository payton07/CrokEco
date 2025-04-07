import * as yup from 'yup';

export type info_t =  {Nom : string, Score : string , Unite : string,id:number};

export type Ingredient = {
    name: string;
    weight: string;
};
  
export type FormData = {
    name: string;
    ingredients: Ingredient[];
};

export const schema = yup.object({
    name: yup.string().required("Le nom du plat est obligatoire"),
    ingredients: yup.array().of(
        yup.object({
        name: yup.string().required("Le nom de l'ingrédient est obligatoire"),
        weight: yup.string().required("Le poids est obligatoire"),
        })
    ).min(1, "Veuillez ajouter au moins un ingrédient")
    .default([]),
});

export type resto = {'NomResto':string,'Latitude':number,'Longitude':number};

export type menu = {'NomMenu':string,'ID_restaurant':number};

export type recherche = {'Text_request':string,'ID_menu':number,'Date':string};

export type Plat = {"Certified": number, "ID_plat": string, "Nom_plat": string, "Vote":number};

export interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}
  
export interface TextBlock {
    text: string;
    frame?: BoundingBox;
}