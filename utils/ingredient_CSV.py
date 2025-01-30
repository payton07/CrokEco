import pandas as pd
from math import isnan
import sqlite3
import os

INPUT_FILE = "assets/Agribalyse_Detail_ingredient.csv"
OUTPUT_FILE = "assets/Agribalyse_Detail_ingredient_v2.csv"
INPUT_SQL = "specs/CodeE_A3.sql"
OUTPUT_DB = "assets/ingredient_carbon_score.db"
USELESS_KEYS = ["Ciqual  code"]

def suppr_keys(data_in, keys):
    data_out = data_in.copy()

    for key in keys:
        try:
            del data_in[key]
        except KeyError:
            print("Mauvaise clé :", key)
    return data_out

def export_sqlite(input_sql,output_db):
    if os.path.isfile(output_db):
        os.remove(output_db)

    connection = sqlite3.connect(output_db)
    cursor = connection.cursor()
    with open(input_sql) as script_sql_file:
        script_sql = script_sql_file.read()
        cursor.executescript(script_sql)
    connection.commit()
    connection.close()


def insertion_ingredients_bd(dico_in, output_db):
    suppr_keys(dico_in, ["Nom Français", "LCI Name", "Sous-groupe d'aliment", "Groupe d'aliment"])
    data = list(dico_in.itertuples(index=False, name=None))
    con = sqlite3.connect(output_db)
    con.execute("PRAGMA foreign_keys = 1")
    cur = con.cursor()
    cur.executemany("""INSERT INTO Ingredients(Ciqual_AGB,Ingredient,Score_unique_EF,Changement_climatique,
                    Appauvrissement_de_la_couche_d_ozone,Rayonnements_ionisants,Formation_photochimique_d_ozone,Particules_fines,
                    Effets_toxicologiques_sur_la_sante_humaine__substances_non_cancerogenes,Effets_toxicologiques_sur_la_sante_humaine__substances_cancerogenes,
                    Acidification_terrestre_et_eaux_douces,Eutrophisation_eaux_douces,Eutrophisation_marine,Eutrophisation_terrestre,
                    Ecotoxicite_pour_ecosystemes_aquatiques_d_eau_douce,Utilisation_du_sol,Epuisement_des_ressources_eau,Epuisement_des_ressources_energetiques,
                    Epuisement_des_ressources_mineraux) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""", data)
    con.commit()
    con.close()


def insertion_plats_bd(dico_in, output_db):
    suppr_keys(dico_in, [dico_in.keys()[i] for i in range(5,len(dico_in.keys()))])
    data = list(dico_in.itertuples(index=False, name=None))
    datafordb = []
    for elt in data:
        if elt not in datafordb:
            datafordb.append(elt)
    con = sqlite3.connect(output_db)
    cur = con.cursor()
    cur.executemany("""INSERT INTO Plats("Ciqual_AGB","Nom_Francais","Groupe_d_aliment","Sous_groupe_d_aliment","LCI_Name") VALUES(?, ?, ?, ?, ?)""", datafordb)



if __name__ == '__main__':
    data=pd.read_csv(INPUT_FILE, sep=',')
    suppr_keys(data, USELESS_KEYS)
    export_sqlite(INPUT_SQL,OUTPUT_DB)
    insertion_plats_bd(data.copy(),OUTPUT_DB)
    insertion_ingredients_bd(data.copy(),OUTPUT_DB)

    con = sqlite3.connect(OUTPUT_DB)
    cur = con.cursor()
    cur.execute("SELECT ID_ingredient,Ciqual_AGB,Ingredient FROM Ingredients;")
    res = cur.fetchone()
    print(res)
    con.close()
