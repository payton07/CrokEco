import pandas as pd
from math import isnan
import sqlite3
import os

INPUT_FILE = "../assets/AGRIBALYSE_v2.xlsx"
COMPARE_FILE = "../assets/Agribalyse_Detail_ingredient.csv"
INPUT_SQL_FRONTEND = "../specs/CodeE_A4.sql"
INPUT_SQL_BACKEND = "../specs/CodeE_A_Backend.sql"
OUTPUT_DB_FRONTEND = "../packages/frontend/assets/ingredient_carbon_score.db"
OUTPUT_DB_BACKEND = "../packages/backend/bdd_doc/ingredient_carbon_score.db"
# On ne prend pas en compte la 2e colonne
INGREDIENTS_KEYS = [0] + list(range(2, 22))
GROUPE_KEYS = [1]
SOUS_GROUPE_KEYS = [2]
NOM_KEYS_DATA = ["Code AGB","Groupe d'aliment","Sous-groupe d'aliment","Nom Français",
                 "LCI Name","Score unique EF","Changement climatique","Appauvrissement de la couche d'ozone",
                 "Rayonnements ionisants","Formation photochimique d'ozone","Particules fines",
                 "Effets toxicologiques sur la santé humaine : substances non-cancérogènes",
                 "Effets toxicologiques sur la santé humaine : substances cancérogènes","Acidification terrestre et eaux douces",
                 "Eutrophisation eaux douces","Eutrophisation marine","Eutrophisation terrestre",
                 "Écotoxicité pour écosystèmes aquatiques d'eau douce","Utilisation du sol","Épuisement des ressources eau",
                 "Épuisement des ressources énergétiques","Épuisement des ressources minéraux"]


def is_in_both(data_in, data_compare, data_in_key, data_compare_key):
    data_out = data_in.copy()
    for i in range(len(data_in)):
        if data_in[data_in_key][i] in data_compare[data_compare_key].values:
            data_out.drop(i, inplace=True)
    data_out.reset_index(drop=True, inplace=True)
    return data_out


def suppr_keys(data_in, keys):
    data_out = data_in.copy()

    for key in keys:
        try:
            del data_in[key]
        except KeyError:
            print("Mauvaise clé :", key)
    return data_out

def export_sqlite(input_sql,OUTPUT_DB_FRONTEND):
    if os.path.isfile(OUTPUT_DB_FRONTEND):
        os.remove(OUTPUT_DB_FRONTEND)

    connection = sqlite3.connect(OUTPUT_DB_FRONTEND)
    cursor = connection.cursor()
    with open(input_sql) as script_sql_file:
        script_sql = script_sql_file.read()
        cursor.executescript(script_sql)
    connection.commit()
    connection.close()


def insertion_Groupes_bd(dico_in, OUTPUT_DB_FRONTEND):
    dico = list(dico_in.itertuples(index=False, name=None))
    data = list(map(lambda x: [x[i] for i in GROUPE_KEYS], dico))
    datafordb=list({tuple(elt) for elt in data})
    datafordb.sort()
    con = sqlite3.connect(OUTPUT_DB_FRONTEND)
    con.execute("PRAGMA foreign_keys = 1")
    cur = con.cursor()
    cur.executemany("""INSERT INTO Groupes(Groupe_d_aliment) VALUES(?)""", datafordb)
    con.commit()
    con.close()


def insertion_Sous_Groupes_bd(dico_in, OUTPUT_DB_FRONTEND):
    dico = list(dico_in.itertuples(index=False, name=None))
    data = list(map(lambda x: x[SOUS_GROUPE_KEYS[0]], dico))
    ss_groupe_to_groupe = dict(map(lambda x: [x[SOUS_GROUPE_KEYS[0]], x[GROUPE_KEYS[0]]], dico))
    data_sans_doublon=list({elt for elt in data})
    data_sans_doublon.sort()
    con = sqlite3.connect(OUTPUT_DB_FRONTEND)
    con.execute("PRAGMA foreign_keys = 1")
    cur = con.cursor()
    cur.execute("""SELECT Groupe_d_aliment, ID_groupe FROM Groupes;""")
    res = cur.fetchall()
    groupe_to_id = dict(res)
    datafordb = list(map(lambda i: (groupe_to_id[ss_groupe_to_groupe[data_sans_doublon[i]]],data_sans_doublon[i]), range(len(data_sans_doublon))))
    cur.executemany("""INSERT INTO Sous_Groupes(ID_Groupe, Sous_Groupe_d_aliment) VALUES(?, ?)""", datafordb)
    con.commit()
    con.close()


def insertion_Ingredients_bd(dico_in, OUTPUT_DB_FRONTEND):
    data = list(map(lambda x: [str(x[i]) for i in INGREDIENTS_KEYS], list(dico_in.itertuples(index=False, name=None))))
    dico_ingredient_ss_groupe = dict(map(lambda x: [str(x[0]), x[2]], dico_in.itertuples(index=False, name=None)))
    con = sqlite3.connect(OUTPUT_DB_FRONTEND)
    con.execute("PRAGMA foreign_keys = 1")
    cur = con.cursor()
    cur.execute("""SELECT Sous_groupe_d_aliment, ID_sous_groupe FROM Sous_Groupes;""")
    res = cur.fetchall()
    ss_groupe_to_id = dict(res)
    datafordb = list(map(lambda i: [data[i][0], (ss_groupe_to_id[dico_ingredient_ss_groupe[data[i][0]]]), *data[i][2:]], range(len(data))))
    cur.executemany("""INSERT INTO Ingredients(Code_AGB,ID_sous_groupe,Nom_Francais,LCI_Name,Score_unique_EF,Changement_climatique,
                    Appauvrissement_de_la_couche_d_ozone,Rayonnements_ionisants,Formation_photochimique_d_ozone,Particules_fines,
                    Effets_toxicologiques_sur_la_sante_humaine__substances_non_cancerogenes,
                    Effets_toxicologiques_sur_la_sante_humaine__substances_cancerogenes,
                    Acidification_terrestre_et_eaux_douces,Eutrophisation_eaux_douces,Eutrophisation_marine,Eutrophisation_terrestre,
                    Ecotoxicite_pour_ecosystemes_aquatiques_d_eau_douce,Utilisation_du_sol,Epuisement_des_ressources_eau,
                    Epuisement_des_ressources_energetiques,Epuisement_des_ressources_mineraux)
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""", datafordb)
    con.commit()
    con.close()
    return datafordb





if __name__ == '__main__':
    data_compare=pd.read_csv(COMPARE_FILE, sep=',')
    export_sqlite(INPUT_SQL_FRONTEND,OUTPUT_DB_FRONTEND)
    export_sqlite(INPUT_SQL_BACKEND,OUTPUT_DB_BACKEND)
    
    data_file=pd.read_excel(INPUT_FILE, sheet_name="Synthese", usecols="A,C:F,M:AC", skiprows=2)
    # data.replace('\n', ' ', regex=True, inplace=True)

    # Remplacement du nom des clé du dictionnaire par NOM_KEYS_DATA
    data_file.rename(columns={data_file.keys()[i]:NOM_KEYS_DATA[i] for i in range(len(data_file.keys()))}, inplace=True)
    
    data = is_in_both(data_file, data_compare, data_file.keys()[0], data_compare.keys()[1])

    insertion_Groupes_bd(data,OUTPUT_DB_FRONTEND)
    insertion_Groupes_bd(data,OUTPUT_DB_BACKEND)
    insertion_Sous_Groupes_bd(data, OUTPUT_DB_FRONTEND)
    insertion_Sous_Groupes_bd(data, OUTPUT_DB_BACKEND)

    data_ingredient1 = insertion_Ingredients_bd(data, OUTPUT_DB_FRONTEND)
    data_ingredient2 = insertion_Ingredients_bd(data, OUTPUT_DB_BACKEND)
    print("Fin de l'insertion dans la base de données")
    pd.DataFrame(data_ingredient1).to_csv("data_ingredient1.csv", index=False)
    pd.DataFrame(data_ingredient2).to_csv("data_ingredient2.csv", index=False)
    print("Fin de l'export des données")

    con = sqlite3.connect(OUTPUT_DB_FRONTEND)
    cur = con.cursor()
    cur.execute("SELECT * FROM Ingredients;")
    res = cur.fetchall()
    d = ["pate",0,0,0]
    d3 = [1,"11084",320]
    d4 = [1,"20998",320]

    cur.execute(""" INSERT INTO Plats(Nom_plat,Certified,Like,DisLike) VALUES(?,?,?,?)""",d)
    cur.execute(""" INSERT INTO Plats_Ingredients(ID_plat,ID_ingredient,Quantite) VALUES(?,?,?)""",d3)
    cur.execute(""" INSERT INTO Plats_Ingredients(ID_plat,ID_ingredient,Quantite) VALUES(?,?,?)""",d4)
    print(res)
    con.commit()
    con.close()

    con = sqlite3.connect(OUTPUT_DB_BACKEND)
    cur = con.cursor()
    d1 = [1,"pate",0,0,0]
    d2 = [2,"riz",0,0,0]
    d3 = [1,"11084",320]
    d4 = [1,"20998",320]
    cur.execute(""" INSERT INTO Plats(ID_plat,Nom_plat,Certified,Like,DisLike) VALUES(?,?,?,?,?)""",d1)
    cur.execute(""" INSERT INTO Plats(ID_plat,Nom_plat,Certified,Like,DisLike) VALUES(?,?,?,?,?)""",d2)
    
    cur.execute(""" INSERT INTO Plats_Ingredients(ID_plat,ID_ingredient,Quantite) VALUES(?,?,?)""",d3)
    cur.execute(""" INSERT INTO Plats_Ingredients(ID_plat,ID_ingredient,Quantite) VALUES(?,?,?)""",d4)
    d3[0]= 2
    d4[0]= 2
    cur.execute(""" INSERT INTO Plats_Ingredients(ID_plat,ID_ingredient,Quantite) VALUES(?,?,?)""",d3)
    cur.execute(""" INSERT INTO Plats_Ingredients(ID_plat,ID_ingredient,Quantite) VALUES(?,?,?)""",d4)
    con.commit()
    con.close()


# Plats_Ingredients