import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import AddDishForm from "@/components/AddPlatForm";
import * as routes from "@/utils/routes";
import * as bdd from "@/utils/bdd";

jest.mock("@/utils/routes", () => ({
  Ping: jest.fn(),
  PostPlatClient: jest.fn(),
}));

jest.mock("@/utils/bdd", () => ({
  getIngredients: jest.fn(),
}));

describe("AddDishForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<AddDishForm />);

    expect(getByText("Ajouter un Plat")).toBeTruthy();
    expect(getByPlaceholderText("Nom du plat")).toBeTruthy();
    expect(getByPlaceholderText("Taper un ingrédient")).toBeTruthy();
    expect(getByPlaceholderText("quantite en grammes")).toBeTruthy();
  });

  it("shows validation error when submitting empty form", async () => {
    const { getByText } = render(<AddDishForm />);
    act(()=>{
        fireEvent.press(getByText("Ajouter le plat"));
    });

    await waitFor(() => {
      expect(getByText("Le nom du plat est obligatoire")).toBeTruthy();
    });
  });

//   it("adds an ingredient correctly", async () => {
//     (bdd.getIngredients as jest.Mock).mockResolvedValue([
//         { Nom_Francais: "Tomate" },
//         { Nom_Francais: "Tofu" },
//       ]);
//     const { getByPlaceholderText, getByText, queryByText } = render(<AddDishForm />);
    
//     const ingredientInput = getByPlaceholderText("Taper un ingrédient");
//     const quantiteInput = getByPlaceholderText("quantite en grammes");

//     await act(async ()=>{
//         fireEvent.changeText(ingredientInput, "Tomate");
//         const suggestTomate = getByText("Tomate");
//         fireEvent.press(suggestTomate);
//         fireEvent.changeText(quantiteInput, "150");
//         fireEvent.press(getByText("+"));
//     })

//     await waitFor(()=>{
//         expect(getByText("Tomate 150 g")).toBeTruthy();
//     })
//   });

  it("removes an ingredient", async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<AddDishForm />);

    fireEvent.changeText(getByPlaceholderText("Taper un ingrédient"), "Tomate");
    fireEvent.changeText(getByPlaceholderText("quantite en grammes"), "100");
    fireEvent.press(getByText("+"));

    expect(queryByText(/Tomate 100 g/)).toBeTruthy();

    fireEvent.press(getByText("Supprimer"));
    expect(queryByText(/Tomate 100 g/)).toBeNull();
  });

//   it("fetches and filters ingredient suggestions", async () => {
//     (bdd.getIngredients as jest.Mock).mockResolvedValue([
//       { Nom_Francais: "Tomate" },
//       { Nom_Francais: "Tofu" },
//     ]);

//     const { getByPlaceholderText, findByText } = render(<AddDishForm />);
//     fireEvent.changeText(getByPlaceholderText("Taper un ingrédient"), "To");

//     expect(await findByText("Tomate")).toBeTruthy();
//     expect(await findByText("Tofu")).toBeTruthy();
//   });

  it("submits form with valid data and resets fields", async () => {
    (routes.Ping as jest.Mock).mockResolvedValue(201);
    (routes.PostPlatClient as jest.Mock).mockResolvedValue({
      message: "Plat ajouté avec succès",
    });

    const { getByPlaceholderText, getByText, queryByText } = render(<AddDishForm />);

    fireEvent.changeText(getByPlaceholderText("Nom du plat"), "Ratatouille");
    fireEvent.changeText(getByPlaceholderText("Taper un ingrédient"), "Tomate");
    fireEvent.changeText(getByPlaceholderText("quantite en grammes"), "150");
    fireEvent.press(getByText("+"));

    fireEvent.press(getByText("Ajouter le plat"));

    await waitFor(() => {
      expect(routes.Ping).toHaveBeenCalled();
      expect(routes.PostPlatClient).toHaveBeenCalledWith({
        name: "",
        ingredients: [{ name: "Tomate", weight: "150" }],
      });
    });

    // After reset, inputs should be empty
    expect(queryByText("Tomate 150 g")).toBeNull();
    expect(getByPlaceholderText("Nom du plat").props.value).toBe("");
  });

  it("handles failed Ping gracefully", async () => {
    (routes.Ping as jest.Mock).mockResolvedValue(500);

    const { getByPlaceholderText, getByText } = render(<AddDishForm />);
    fireEvent.changeText(getByPlaceholderText("Nom du plat"), "Soupe");
    fireEvent.changeText(getByPlaceholderText("Taper un ingrédient"), "Carotte");
    fireEvent.changeText(getByPlaceholderText("quantite en grammes"), "100");
    fireEvent.press(getByText("+"));

    fireEvent.press(getByText("Ajouter le plat"));

    await waitFor(() => {
      expect(routes.Ping).toHaveBeenCalled();
      expect(routes.PostPlatClient).not.toHaveBeenCalled();
    });
  });
});
