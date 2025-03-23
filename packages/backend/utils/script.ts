import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function addKeyIfNotExist(envPath : string, secretKey: string){
  try {
    if (fs.existsSync(envPath)) {
      const Contenu = fs.readFileSync(envPath, 'utf-8');
      
      if (!Contenu.includes('SECRET_KEY=')) {
        fs.appendFileSync(envPath, `\nSECRET_KEY=${secretKey}\n`);
        console.log(`Clé secrète générée et ajoutée à ${envPath}`);
      } else {
        console.log(`SECRET_KEY déjà présent dans ${envPath}`);
      }
    } else {
      console.log(`Le fichier .env n'existe pas à l'emplacement ${envPath}`);
    }
  } catch (err) {
    console.error(`Erreur lors de l'ajout de la clé secrète à ${envPath}:`, err);
  }
}

function genereSecretKey() {
  const secretKey = crypto.randomBytes(32).toString('hex');

  const envBackend = path.resolve(__dirname, '../.env');
  const envFrontend = path.resolve(__dirname, '../../frontend/.env');

  addKeyIfNotExist(envBackend,secretKey);
  addKeyIfNotExist(envFrontend,secretKey);
}

genereSecretKey();
