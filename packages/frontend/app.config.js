import 'dotenv/config';  // Charger les variables depuis le fichier .env

export default {
  expo: {
    name: "CrokEco",
    slug: "CrokEco",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: false, // Désactive la nouvelle archi si problème
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.CrokEco",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.anonymous.CrokEco",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router", "expo-sqlite", "expo-asset"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      SECRET_KEY: process.env.SECRET_KEY, 
    },
  },
};
