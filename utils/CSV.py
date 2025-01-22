import pandas as pd
from math import isnan

INPUT_FILE = "assets/base-carboner.csv"
OUTPUT_FILE = "assets/base_carboner_filtre.csv"
USELESS_KEYS = ["Type Ligne", "Structure", "Type de l'élément", "Statut de l'élément", "Contributeur","Programme","Url du programme","Localisation géographique"]
# Il faudra peut etre en lever le NaN et mettre toutes les catégories à supprimer ici car avec d'autres valeurs on ne sait pas ce que la fonction rique de renvoyer

def categorie(data_in):
    T=[]
    i=0
    for elt in data_in["Code de la catégorie"]:
            if "Achats de biens > Produits agro-alimentaires, plats préparés et boissons" in elt:
                T.append(i)
            elif "Achats de biens > Produits de l'agriculture et de la pêche" in elt:
                T.append(i)
            i+=1

    resultat = data_in.loc[T]
    
    # Actualisation des indexs de chaque ligne du resultat
    resultat.index = pd.RangeIndex(start=0, stop=len(resultat["Code de la catégorie"]), step=1)

    return resultat


def archive(data_in):
    T=[]
    i=0
    for elt in data_in["Statut de l'élément"]:
        if not("Archivé" in elt):
            T.append(i)
        i+=1
    
    resultat = data_in.loc[T]

    # Actualisation des indexs de chaque ligne du resultat
    resultat.index = pd.RangeIndex(start=0, stop=len(resultat["Statut de l'élément"]), step=1)

    return resultat


def suppr_nan(data_in):
    data_out = data_in.copy()

    for key in data_in.keys():
        delete=True
        for elt in data_in[key]:
            if type(elt)!=str:
                if not(isnan(elt)):
                    delete=False
            else:
                delete=False
        if delete:
            del data_in[key]
    return data_in

def suppr_keys(data_in, keys):
    data_out = data_in.copy()

    for key in keys:
        try:
            del data_in[key]
        except KeyError:
            print("Mauvaise clé")
    
    return data_out

if __name__ == '__main__':
    data=pd.read_csv(INPUT_FILE, sep=',')
    data=categorie(data)
    data=archive(data)
    data=suppr_nan(data)
    suppr_keys(data, USELESS_KEYS)
    data.to_csv(OUTPUT_FILE, index=False)
