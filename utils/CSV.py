import pandas as pd
from math import isnan
import sqlite3
from pathlib import Path

INPUT_FILE = "assets/base-carboner.csv"
OUTPUT_FILE = "assets/base_carboner_filtre.csv"
OUTPUT_DB = "assets/carbon_score.db"
USELESS_KEYS = ["Type Ligne","Structure","Type de l'élément","Statut de l'élément","Nom base espagnol","Nom attribut espagnol","Tags espagnol","Contributeur","Autres Contributeurs",
                "Programme","Url du programme","Localisation géographique", "Sous-localisation géographique français","Sous-localisation géographique anglais",
                "Sous-localisation géographique espagnol", "Réglementations", "Type poste","Nom poste français","Nom poste anglais","Nom poste espagnol","CO2f",
                "CH4f","CH4b","N2O","Code gaz supplémentaire 1","Valeur gaz supplémentaire 1","Code gaz supplémentaire 2","Valeur gaz supplémentaire 2",
                "Valeur gaz supplémentaire 3","Valeur gaz supplémentaire 4","Code gaz supplémentaire 5","Valeur gaz supplémentaire 5","Autres GES","CO2b"]


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

def export_sqlite(data_in):
    exists = Path(OUTPUT_DB).exists()

    connection = sqlite3.connect(OUTPUT_DB)
    cursor = connection.cursor()

    if not exists:
        cursor.execute("""
            CREATE TABLE movie(title);
        """);
        cursor.execute("INSERT INTO movie VALUES ('Cars')")
        connection.commit()
    connection.close()

if __name__ == '__main__':
    data=pd.read_csv(INPUT_FILE, sep=',')
    data=categorie(data)
    data=archive(data)
    suppr_keys(data, USELESS_KEYS)
    export_sqlite(data)
    data.to_csv(OUTPUT_FILE, index=False)
