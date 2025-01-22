import pandas as pd

data=pd.read_csv("C:/Users/barat/Document/Projet_L3/projet-Co2Score/assets/base-carboner.csv", sep=',')

T1=[]
T2=[]
T3=[]

i=0
for elt in data["Code de la catégorie"]:
    if "Achats de biens > Produits agro-alimentaires, plats préparés et boissons" in elt:
        T1.append(i)
    elif "Achats de biens > Produits de l'agriculture et de la pêche" in elt:
        T2.append(i)
    elif "Achats de services > Restauration" in elt:
        T3.append(i)
    i+=1

resultat1 = data.loc[T1]
resultat2 = data.loc[T2]
resultat3 = data.loc[T3]

resultat1.to_csv('base_carboner_produits_agro.csv', index=False)
resultat2.to_csv('base_carboner_agricultureetpeche.csv', index=False)
resultat3.to_csv('base_carboner_restauration.csv', index=False)
