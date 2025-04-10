// Charger les variables depuis le fichier .env
import 'dotenv/config';  

export default {
  expo: {
    name: "CrokEco",
    slug: "CrokEco",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: false, 
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#2E6B3D",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.CrokEco",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#2E6B3D",
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
