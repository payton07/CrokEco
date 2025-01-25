CREATE TABLE "Plat" (
  "ID_plat" INT PRIMARY KEY,
  "ID_categorie" varchar(20),
  "..." varchar
);

CREATE TABLE "Element" (
  "ID_element" INT PRIMARY KEY,
  "Nom_base_fr" varchar(50),
  "Nom_base_an" varchar(50),
  "Nom_attribut_fr" varchar(50),
  "Nom_attribut_an" varchar(50),
  "Nom_frontiere_fr" varchar(50),
  "Nom_frontiere_an" varchar(50),
  "Unite_fr" varchar(15),
  "Unite_an" varchar(15),
  "Source" varchar(30),
  "Date_creation" date,
  "Date_modif" date,
  "Periode_validite" date,
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
  "Total_poste_non_decompose" decimal(10,6)
);

CREATE TABLE "Categorie" (
  "ID_categorie" INT PRIMARY KEY,
  "Nom" varchar(20)
);

CREATE TABLE "Tags" (
  "ID_tags" INT PRIMARY KEY,
  "Type" varchar(3),
  "Valeur" varchar(30)
);

CREATE TABLE "Recherche" (
  "ID_recherche" INT PRIMARY KEY,
  "Text_request" varchar(30),
  "Resultat" varchar(30),
  "temps" time,
  "Date" date,
  "ID_plat" int,
  "ID_histo" int
);

CREATE TABLE "Historique" (
  "ID_historique" INT PRIMARY KEY,
  "date-creation" date
);

CREATE TABLE "Menu" (
  "ID_menu" int PRIMARY KEY,
  "nom" varchar(20),
  "etablissement" varchar(20),
  "localisation" varchar(30)
);

CREATE TABLE "Plat_Compose_Element" (
  "ID_plat" int,
  "ID_element" int,
  PRIMARY KEY ("ID_plat", "ID_element")
);

CREATE TABLE "Menu_Compose_Plat" (
  "ID_menu" int,
  "ID_plat" int,
  PRIMARY KEY ("ID_menu", "ID_plat")
);

CREATE TABLE "Designe_Tags" (
  "ID_tags" int,
  "ID_plat" int,
  PRIMARY KEY ("ID_tags", "ID_plat")
);

COMMENT ON COLUMN "Element"."Date_creation" IS 'YYYY-MM-DD';

ALTER TABLE "Recherche" ADD FOREIGN KEY ("ID_plat") REFERENCES "Plat" ("ID_plat");

ALTER TABLE "Plat_Compose_Element" ADD FOREIGN KEY ("ID_plat") REFERENCES "Plat" ("ID_plat");

ALTER TABLE "Categorie" ADD FOREIGN KEY ("ID_categorie") REFERENCES "Plat" ("ID_categorie");

ALTER TABLE "Recherche" ADD FOREIGN KEY ("ID_histo") REFERENCES "Historique" ("ID_historique");

ALTER TABLE "Plat_Compose_Element" ADD FOREIGN KEY ("ID_element") REFERENCES "Element" ("ID_element");

ALTER TABLE "Menu_Compose_Plat" ADD FOREIGN KEY ("ID_menu") REFERENCES "Menu" ("ID_menu");

ALTER TABLE "Menu_Compose_Plat" ADD FOREIGN KEY ("ID_plat") REFERENCES "Plat" ("ID_plat");

ALTER TABLE "Designe_Tags" ADD FOREIGN KEY ("ID_tags") REFERENCES "Tags" ("ID_tags");

ALTER TABLE "Designe_Tags" ADD FOREIGN KEY ("ID_plat") REFERENCES "Plat" ("ID_plat");
