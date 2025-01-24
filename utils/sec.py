from math import isnan
import math 
import pandas as pd 
INPUT_FILE = "../assets/base_carboner_filtre_sans_NaN.csv"

def Affiche_val_col_et_max(colone):
    data=pd.read_csv(INPUT_FILE, sep=',')
    max = 0
    min = 0
    neg = []
    set = True
    for i in range(len(data[colone])):
        ele = data[colone][i]
        if not(type(ele) == str):
            set = False
            if not(isnan(ele)):
                if(max < ele):
                    max = ele
                if(min > ele):
                    min = ele
            if(ele < 0):
                neg.append((i,ele))
        print(ele)
    if(not set):
        print(f"le min et max  des valeurs de {colone} est :", min , max)
        print("Taille : ",len(neg), neg)
# Affiche_val_col_et_max("Nom frontière français")

def val_tags_fr(f):
    data=pd.read_csv(INPUT_FILE, sep=',')
    res = []
    for ele in data[f]:
        if not(res.__contains__(ele)):
            res.append(ele)
    print("la taille : ",res,len(res))
# val_tags_fr("Source")