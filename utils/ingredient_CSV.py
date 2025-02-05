import pandas as pd
from math import isnan
import sqlite3
import os

INPUT_FILE = "assets/Agribalyse_Detail_ingredient.csv"
OUTPUT_FILE = "assets/Agribalyse_Detail_ingredient_v2.csv"
INPUT_SQL = "specs/CodeE_A3.sql"
OUTPUT_DB = "assets/ingredient_carbon_score.db"
INGREDIENTS_KEYS = [0] + [i for i in range(6,24)]
PLATS_KEYS = [0,2,5]
GROUPE_KEYS = [3]
SOUS_GROUPE_KEYS = [4]


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


def insertion_Groupes_bd(dico_in, output_db):
    dico = list(dico_in.itertuples(index=False, name=None))
    data = list(map(lambda x: [x[i] for i in GROUPE_KEYS], dico))
    datafordb=list({tuple(elt) for elt in data})
    con = sqlite3.connect(output_db)
    con.execute("PRAGMA foreign_keys = 1")
    cur = con.cursor()
    cur.executemany("""INSERT INTO Groupes(Groupe_d_aliment) VALUES(?)""", datafordb)
    con.commit()
    con.close()


def insertion_Sous_Groupes_bd(dico_in, output_db):
    dico = list(dico_in.itertuples(index=False, name=None))
    data = list(map(lambda x: x[SOUS_GROUPE_KEYS[0]], dico))
    ss_groupe_to_groupe = dict(map(lambda x: [x[SOUS_GROUPE_KEYS[0]], x[GROUPE_KEYS[0]]], dico))
    data_sans_doublon=list({elt for elt in data})
    con = sqlite3.connect(output_db)
    con.execute("PRAGMA foreign_keys = 1")
    cur = con.cursor()
    cur.execute("""SELECT Groupe_d_aliment, ID_groupe FROM Groupes;""")
    res = cur.fetchall()
    groupe_to_id = dict(res)
    datafordb = list(map(lambda i: (groupe_to_id[ss_groupe_to_groupe[data_sans_doublon[i]]],data_sans_doublon[i]), range(len(data_sans_doublon))))
    cur.executemany("""INSERT INTO Sous_Groupes(ID_Groupe, Sous_Groupe_d_aliment) VALUES(?, ?)""", datafordb)
    con.commit()
    con.close()


def insertion_Plats_bd(dico_in, output_db):
    dico = list(dico_in.itertuples(index=False, name=None))
    data = dict(map(lambda x: [x[PLATS_KEYS[0]], (x[PLATS_KEYS[1]], x[PLATS_KEYS[2]])], dico))
    id_plat_sans_doublon=list({elt for elt in list(map(lambda x: x[PLATS_KEYS[0]], dico))})
    plat_to_ss_groupe = dict(map(lambda x: [x[PLATS_KEYS[0]], x[SOUS_GROUPE_KEYS[0]]], dico))
    con = sqlite3.connect(output_db)
    con.execute("PRAGMA foreign_keys = 1")
    cur = con.cursor()
    cur.execute("""SELECT Sous_groupe_d_aliment, ID_sous_groupe FROM Sous_Groupes;""")
    res = cur.fetchall()
    ssgroupe_to_id = dict(res)
    datafordb = list(map(lambda i: [id_plat_sans_doublon[i], ssgroupe_to_id[plat_to_ss_groupe[id_plat_sans_doublon[i]]],data[id_plat_sans_doublon[i]][0], data[id_plat_sans_doublon[i]][1]], range(len(id_plat_sans_doublon))))
    cur.executemany("""INSERT INTO Plats VALUES(?, ?, ?, ?)""", datafordb)
    con.commit()
    con.close()


def insertion_Ingredients_bd(dico_in, output_db):
    data = list(map(lambda x: [x[i] for i in INGREDIENTS_KEYS], list(dico_in.itertuples(index=False, name=None))))
    
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


if __name__ == '__main__':
    data=pd.read_csv(INPUT_FILE, sep=',')
    export_sqlite(INPUT_SQL,OUTPUT_DB)
    insertion_Groupes_bd(data,OUTPUT_DB)
    insertion_Sous_Groupes_bd(data, OUTPUT_DB)
    insertion_Plats_bd(data,OUTPUT_DB)
    insertion_Ingredients_bd(data,OUTPUT_DB)

    #con = sqlite3.connect(OUTPUT_DB)
    #cur = con.cursor()
    #cur.execute("SELECT * FROM Groupes;")
    #res = cur.fetchall()
    #print(res)
    #cur.execute("SELECT COUNT(*), Ciqual_AGB, Nom_Francais FROM Plats;")
    #res = cur.fetchone()
    #print(res)
    #cur.execute("SELECT Plats.Ciqual_AGB, Plats.ID_sous_groupe, Plats.Nom_Francais, Ingredients.ID_ingredient, Ingredients.Ingredient FROM Plats JOIN Ingredients ON Plats.Ciqual_AGB=Ingredients.Ciqual_AGB WHERE Plats.Ciqual_AGB=13147;")
    #res = cur.fetchall()
    #for elt in res:
    #    print(elt)
    #con.close()
