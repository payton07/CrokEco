/*CREATE TABLE "Plats" (
  "ID_plat" VARCHAR(10),
  "Certified" BOOLEAN,
  "Vote" INT(6),
  CONSTRAINT PK_PLATS PRIMARY KEY("ID_plat"),
);*/

CREATE TABLE "Ingredients" (
  "Code_AGB" VARCHAR(10),
  "Nom_Francais" VARCHAR(50),
  "LCI_Name" VARCHAR(50),
  "ID_sous_groupe" VARCHAR(20),
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

CREATE TABLE "Plats_Ingredients" (
  "ID_plat" INTEGER,
  "ID_ingredient" INTEGER,
  "Quantite" DECIMAL(5,3),
  CONSTRAINT PK_PLATS_INGREDIENTS PRIMARY KEY("ID_plat", "ID_ingredient"),
  CONSTRAINT FK_PLATS_INGREDIENTS_PLATS FOREIGN KEY ("ID_plat") REFERENCES Plats("ID_plat"),
  CONSTRAINT FK_PLATS_INGREDIENTS_INGREDIENTS FOREIGN KEY ("ID_ingredient") REFERENCES Ingredients("Code_AGB")
);


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

CREATE TABLE "Tags" (
  "ID_tags" INT(6),
  "Type" VARCHAR(3),
  "Valeur" VARCHAR(30),
  CONSTRAINT PK_TAGS PRIMARY KEY("ID_tags")
);

CREATE TABLE "Recherche" (
  "ID_recherche" INT(6),
  "Text_request" VARCHAR(30),
  "Resultat" VARCHAR(30),
  "Temps" time,
  "Date" Date,
  "ID_plat" INT(6),
  "ID_histo" INT(6),
  CONSTRAINT PK_RECHERCHE PRIMARY KEY("ID_recherche"),
  CONSTRAINT FK_RECHERCHE_PLAT FOREIGN KEY ("ID_plat") REFERENCES "Plat" ("ID_plat"),
  CONSTRAINT FK_RECHERCHE_HISTORIQUE FOREIGN KEY ("ID_histo") REFERENCES "Historique" ("ID_historique")
);

CREATE TABLE "Historique" (
  "ID_historique" INT(6),
  "Date_creation" Date,
  CONSTRAINT PK_HISTORIQUE PRIMARY KEY("ID_historique")
);

CREATE TABLE "Menu" (
  "ID_menu" INT(6),
  "NomM" VARCHAR(20),
  "Etablissement" VARCHAR(20),
  "Localisation" VARCHAR(30),
  CONSTRAINT PK_MENU PRIMARY KEY("ID_menu")
);

CREATE TABLE "Designe_Tags"(
  "ID_tags" INT(6),
  "ID_plat" INT(6),
  CONSTRAINT PK_DESIGNE_TAGS PRIMARY KEY ("ID_tags", "ID_plat"),
  CONSTRAINT FK_Designe_Tags__TAGS FOREIGN KEY ("ID_tags") REFERENCES "Tags" ("ID_tags"),
  CONSTRAINT FK_Designe_Tags__PLAT FOREIGN KEY ("ID_plat") REFERENCES "Plat" ("ID_plat")
);
