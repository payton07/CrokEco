CREATE TABLE "Plat" (
  "ID_plat" INT(6),
  "ID_categorie" VARCHAR(20),
  CONSTRAINT PK_PLAT PRIMARY KEY("ID_plat")
);

CREATE TABLE "Element" (
  "ID_element" INT(6),
  "Nom_base_fr" VARCHAR(50),
  "Nom_base_an" VARCHAR(50),
  "Nom_attribut_fr" VARCHAR(50),
  "Nom_attribut_an" VARCHAR(50),
  "Nom_frontiere_fr" VARCHAR(50),
  "Nom_frontiere_an" VARCHAR(50),
  "Unite_fr" VARCHAR(15),
  "Unite_an" VARCHAR(15),
  "Source" VARCHAR(30),
  "Date_creation" Date,
  "Date_modif" Date,
  "Periode_validite" Date,
  "Incertitude" decimal(4,1),
  "Transparence" decimal(4,1),
  "Qualite" decimal(4,1),
  "Qualite_TeR" decimal(4,1),
  "Qualite_TiR" decimal(4,1),
  "Qualite_C" decimal(4,1),
  "Qualite_P" decimal(4,1),
  "Qualite_M" decimal(4,1),
  "Commentaire_fr" text,
  "Commentaire_an" text,
  "Total_poste_non_decompose" decimal(10,6),
  CONSTRAINT PK_ELEMENT PRIMARY KEY("ID_element")
);

CREATE TABLE "Categorie" (
  "ID_categorie" INT(6),
  "NomC" VARCHAR(20),
  CONSTRAINT PK_CATEGORIE PRIMARY KEY("ID_categorie"),
  CONSTRAINT FK_CATEGORIE_PLAT FOREIGN KEY ("ID_categorie") REFERENCES "Plat" ("ID_categorie")
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

CREATE TABLE "Plat_Compose_Element" (
  "ID_plat" INT(6),
  "ID_element" INT(6),
  CONSTRAINT PK_Plat_Compose_Element PRIMARY KEY ("ID_plat", "ID_element"),
  CONSTRAINT FK_Plat_Compose_Element__PLAT FOREIGN KEY ("ID_plat") REFERENCES "Plat" ("ID_plat"),
  CONSTRAINT FK_Plat_Compose_Element__ELEMENT FOREIGN KEY ("ID_element") REFERENCES "Element" ("ID_element")
);

CREATE TABLE "Menu_Compose_Plat" (
  "ID_menu" INT(6),
  "ID_plat" INT(6),
  CONSTRAINT PK_MENU_COMPOSE_PLAT PRIMARY KEY ("ID_menu", "ID_plat"),
  CONSTRAINT FK_Menu_Compose_Plat__MENU FOREIGN KEY ("ID_menu") REFERENCES "Menu" ("ID_menu"),
  CONSTRAINT FK_Menu_Compose_Plat__PLAT FOREIGN KEY ("ID_plat") REFERENCES "Plat" ("ID_plat")
);

CREATE TABLE "Designe_Tags"(
  "ID_tags" INT(6),
  "ID_plat" INT(6),
  CONSTRAINT PK_DESIGNE_TAGS PRIMARY KEY ("ID_tags", "ID_plat"),
  CONSTRAINT FK_Designe_Tags__TAGS ADD FOREIGN KEY ("ID_tags") REFERENCES "Tags" ("ID_tags"),
  CONSTRAINT FK_Designe_Tags__PLAT ADD FOREIGN KEY ("ID_plat") REFERENCES "Plat" ("ID_plat")
);