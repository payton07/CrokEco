CREATE TABLE "Sous_Groupes" (
  "ID_sous_groupe" INTEGER PRIMARY KEY,
  "Sous_groupe_d_aliment" VARCHAR(50),
  "ID_groupe" INTEGER,
  CONSTRAINT FK_SOUS_GROUPE_GROUPE_PLATS FOREIGN KEY ("ID_groupe") REFERENCES Groupes("ID_groupe")
);


CREATE TABLE "Groupes" (
  "ID_groupe" INTEGER PRIMARY KEY,
  "Groupe_d_aliment" VARCHAR(50)
);


CREATE TABLE "Ingredients" (
  "Code_AGB" VARCHAR(10),
  "Nom_Francais" VARCHAR(50),
  "LCI_Name" VARCHAR(50),
  "ID_sous_groupe" INTEGER,
  "Score_unique_EF" DECIMAL(10,8),
  "Changement_climatique" DECIMAL(10,8),
  "Appauvrissement_de_la_couche_d_ozone" DECIMAL(10,8),
  "Rayonnements_ionisants" DECIMAL(10,8),
  "Formation_photochimique_d_ozone" DECIMAL(10,8),
  "Particules_fines" DECIMAL(10,8),
  "Effets_toxicologiques_sur_la_sante_humaine__substances_non_cancerogenes" DECIMAL(10,8),
  "Effets_toxicologiques_sur_la_sante_humaine__substances_cancerogenes" DECIMAL(10,8),
  "Acidification_terrestre_et_eaux_douces" DECIMAL(10,8),
  "Eutrophisation_eaux_douces" DECIMAL(10,8),
  "Eutrophisation_marine" DECIMAL(10,8),
  "Eutrophisation_terrestre" DECIMAL(10,8),
  "Ecotoxicite_pour_ecosystemes_aquatiques_d_eau_douce" DECIMAL(10,8),
  "Utilisation_du_sol" DECIMAL(10,8),
  "Epuisement_des_ressources_eau" DECIMAL(10,8),
  "Epuisement_des_ressources_energetiques" DECIMAL(10,8),
  "Epuisement_des_ressources_mineraux" DECIMAL(10,8),
  CONSTRAINT PK_INGREDIENTS PRIMARY KEY("Code_AGB"),
  CONSTRAINT FK_PLAT_SOUSGROUPES FOREIGN KEY ("ID_sous_groupe") REFERENCES Sous_Groupes("ID_sous_groupe")
);


CREATE TABLE "Plats" (
  "ID_plat" VARCHAR(10),
  "Nom_plat" VARCHAR(50),
  "Certified" INTEGER,
  "Vote" INTEGER,
  CONSTRAINT PK_PLATS PRIMARY KEY("ID_plat")
);


CREATE TABLE "Restaurants" (
  "ID_restaurant" INT(6),
  "NomResto" VARCHAR(20),
  "Longitude" DECIMAL(10,8),
  "Latitude" DECIMAL(10,8),
  CONSTRAINT PK_RESTAURANTS PRIMARY KEY("ID_restaurant")
);


CREATE TABLE "Menus" (
  "ID_menu" INT(6),
  "NomMenu" VARCHAR(20),
  "ID_restaurant" INT(6),
  CONSTRAINT PK_MENUS PRIMARY KEY("ID_menu")
  CONSTRAINT FK_MENUS_RESTAURANTS FOREIGN KEY ("ID_restaurant") REFERENCES Restaurants("ID_restaurant")
);


CREATE TABLE "Recherches" (
  "ID_Recherche" INT(6),
  "Text_request" VARCHAR(30),
  "ID_menu" INT(6),
  "Date" Date,
  CONSTRAINT PK_RECHERCHES PRIMARY KEY("ID_Recherche"),
  CONSTRAINT FK_RECHERCHES_MENUS FOREIGN KEY ("ID_menu") REFERENCES Menus("ID_menu")
);


CREATE TABLE "Plats_Ingredients" (
  "ID_plat" INTEGER,
  "ID_ingredient"  VARCHAR(10),
  "Quantite" DECIMAL(5,3),
  CONSTRAINT PK_PLATS_INGREDIENTS PRIMARY KEY("ID_plat", "ID_ingredient"),
  CONSTRAINT FK_PLATS_INGREDIENTS_PLATS FOREIGN KEY ("ID_plat") REFERENCES Plats("ID_plat"),
  CONSTRAINT FK_PLATS_INGREDIENTS_INGREDIENTS FOREIGN KEY ("ID_ingredient") REFERENCES Ingredients("Code_AGB")
);


CREATE TABLE "Menus_Plats" (
  "ID_menu" INT(6),
  "ID_plat" INT(6),
  CONSTRAINT PK_MENUS_PLATS PRIMARY KEY("ID_menu", "ID_plat"),
  CONSTRAINT FK_MENUS_PLATS_MENUS FOREIGN KEY ("ID_menu") REFERENCES Menus("ID_menu"),
  CONSTRAINT FK_MENUS_PLATS_PLATS FOREIGN KEY ("ID_plat") REFERENCES Plats("ID_plat")
);

CREATE TABLE "Restaurants_Historique" (
  "ID_restaurant" INTEGER PRIMARY KEY AUTOINCREMENT,
  "NomResto" VARCHAR(20),
  "Longitude" DECIMAL(10,8),
  "Latitude" DECIMAL(10,8),
  "Adresse" VARCHAR(30)
);

CREATE TABLE "Menus_Historique" (
  "ID_menu" INTEGER PRIMARY KEY AUTOINCREMENT,
  "NomMenu" VARCHAR(20),
  "ID_restaurant" INT(6),
  CONSTRAINT FK_MENUS_RESTAURANTS_HISTORIQUE FOREIGN KEY ("ID_restaurant") REFERENCES Restaurants_Historique("ID_restaurant")
);

CREATE TABLE "Recherches_Historique" (
  "ID_Recherche" INTEGER PRIMARY KEY AUTOINCREMENT,
  "Text_request" VARCHAR(30),
  "ID_menu" INT(6),
  "Date" VARCHAR(10),
  CONSTRAINT FK_RECHERCHES_MENUS_HISTORIQUE FOREIGN KEY ("ID_menu") REFERENCES Menus_Historique("ID_menu")
);