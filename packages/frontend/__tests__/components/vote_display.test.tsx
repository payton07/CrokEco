import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Vote_display from "@/components/vote_display";
import { router } from "expo-router";
import { PostUpdatePlatsRequest } from "@/utils/routes";

// Mock les icônes vectorielles pour éviter l'erreur liée à expo-font
jest.mock("@expo/vector-icons", () => {
  return {
    AntDesign: () => null, // Ignore le rendu du composant icône
  };
});

// Mock de navigation
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
    reload:jest.fn(),
  }),
}));


// Mock de l'appel réseau
jest.mock("@/utils/routes", () => ({
  PostUpdatePlatsRequest: jest.fn(),
}));


describe("Vote_display", () => {
  const ligne = {
    ID_plat: 42,
    Certified: "yes",
    Like: 10,
    DisLike: 3,
    Nom_plat: "Spaghetti",
  };

  const associations : any[] = [];

  it("affiche le nom du plat", () => {
    const { getByText } = render(
      <Vote_display ligne={ligne} associations={associations} />
    );

    expect(getByText("Spaghetti")).toBeTruthy();
  });

  it("navigue vers les détails au clic sur le nom", () => {
    const {router} = require('expo-router');
    const { getByText } = render(
      <Vote_display ligne={ligne} associations={associations} />
    );

    fireEvent.press(getByText("Spaghetti"));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/(hidden)/details/[id]",
      params: {
        id: 42,
        Plat: JSON.stringify(ligne),
        assocs: JSON.stringify(associations),
      },
    });
  });

  it("augmente le like au clic", async () => {
    const {router} = require('expo-router');
    const { getByText, findByText } = render(
      <Vote_display ligne={ligne} associations={associations} />
    );

    fireEvent.press(getByText("10")); // bouton like

    expect(await findByText("11")).toBeTruthy(); // compteur incrémenté
    expect(PostUpdatePlatsRequest).toHaveBeenCalledWith({
      query: { ID_plat: 42 },
      set: { Like: 11 },
    });
  });

  it("augmente le dislike au clic", async () => {
    const {router} = require('expo-router');
    const { getByText, findByText } = render(
      <Vote_display ligne={ligne} associations={associations} />
    );

    fireEvent.press(getByText("3")); // bouton dislike

    expect(await findByText("4")).toBeTruthy();
    expect(PostUpdatePlatsRequest).toHaveBeenCalledWith({
      query: { ID_plat: 42 },
      set: { DisLike: 4 },
    });
  });

  it("ne fait rien si ID_plat est null", async () => {
    const mockPush2 = jest.fn();
    jest.mock('expo-router', () => ({
      useRouter: () => ({
        push: mockPush2,
        reload:jest.fn(),
      }),
    }));
    const ligneNull = {
      ID_plat: null,
      Certified: "yes",
      Like: 10,
      DisLike: 3,
      Nom_plat: "Spagh",
    };

    const {router} = require('expo-router');
    const { getByText } = render(
      <Vote_display ligne={ligneNull} associations={associations} />
    );

    fireEvent.press(getByText("Spagh")); // tentative de navigation
    expect(mockPush2).not.toHaveBeenCalled();
  });
});
