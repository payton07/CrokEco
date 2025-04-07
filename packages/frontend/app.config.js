import 'dotenv/config';  // Charger les variables depuis le fichier .env

export default {
  expo: {
    name: "Ecocrock",
    slug: "Ecocrock",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
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
      bundleIdentifier: "com.anonymous.Ecocrock",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.anonymous.Ecocrock",
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
