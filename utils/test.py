import pandas as pd
from math import isnan

data=pd.read_csv("C:/Users/barat/Document/Projet_L3/projet-Co2Score/base_carboner_filtre.csv", sep=',')

data.sort_values(by='CO2b', na_position='first')


for key in data.keys():
    delete=True
    for elt in data[key]:
        if type(elt)!=str:
            if not(isnan(elt)):
                print(elt)
                delete=False
        else:
            delete=False
    if delete:
        del data[key]

data.to_csv('base_carboner_filtre_sans_NaN.csv', index=False)
