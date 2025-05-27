# Étape de build
FROM node:slim AS build

# Installer Python et outils nécessaires pour compiler better-sqlite3
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    apt-get clean

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Étape de production
FROM node:slim

# Installer seulement les outils nécessaires pour exécuter better-sqlite3
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    apt-get clean

WORKDIR /backend

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /backend/dist ./dist

COPY ./src/accueil.html ./dist/src/accueil.html
COPY ./src/ajout.html ./dist/src/ajout.html
COPY ./src/connect.js ./dist/src/connect.js
COPY ./src/ajout.js ./dist/src/ajout.js
COPY ./bdd_doc/ingredient_carbon_score.db ./dist/bdd_doc/ingredient_carbon_score.db

CMD ["node", "dist/src/server.js"]
