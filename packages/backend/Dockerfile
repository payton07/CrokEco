# Étape de build
FROM node:slim AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /backend

# Copier les fichiers package.json et package-lock.json (si présents)
COPY package*.json ./

# Installer les dépendances 
RUN npm install

# Copier tout le reste du code source
COPY . .

# Compiler le projet TypeScript
RUN npm run build

# Étape de prod
FROM node:slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /backend

# Copier uniquement les fichiers nécessaires p
COPY package*.json ./

# Installer uniquement les dépendances  ?? 
RUN npm install --only=production

# Copier les fichiers buildés depuis l'étape précédente
COPY --from=build /backend/dist ./dist

COPY ./src/accueil.html ./dist/src/accueil.html
COPY ./src/ajout.html ./dist/src/ajout.html

COPY ./src/connect.js ./dist/src/connect.js
COPY ./src/ajout.js ./dist/src/ajout.js

# Copier la base de données SQLite dans le conteneur
COPY ./bdd_doc/ingredient_carbon_score.db ./dist/bdd_doc/ingredient_carbon_score.db

# Commande Pour démarrer l'application
CMD ["node", "dist/src/server.js"]
