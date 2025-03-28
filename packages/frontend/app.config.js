import 'dotenv/config';  // Charger les variables depuis le fichier .env

export default {
  expo: {
    name: "your-app",
    slug: "your-app",
    extra: {
      secret_key: process.env.SECRET_KEY, // Utiliser les variables définies dans .env
    },
  },
};
