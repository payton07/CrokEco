import { FormatInfoPlatIngredients } from "@/utils/other";
import { blue, good, ok, bad } from "@/utils/constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock("@/utils/bdd");
jest.mock("@/utils/other");

describe("FormatInfoPlatIngredients", () => {
  it("should return formatted information for a plat with ingredients", async () => {
    // Mocking the functions used within FormatInfoPlatIngredients
    const getPlats_Ingredients = jest.fn().mockResolvedValue([
        { ID_ingredient: 1 },
        { ID_ingredient: 2 },
      ]);
    const mockPlat = { ID_plat: 1, Nom_plat: "Ratatouille" };
    const mockIngredients = [
      { Nom_Francais: "Tomato", Score_unique_EF: 1 },
      { Nom_Francais: "Eggplant", Score_unique_EF: 2 },
    ];
    const getIngredients = jest.fn()
      .mockResolvedValueOnce(mockIngredients[0])
      .mockResolvedValueOnce(mockIngredients[1]);

    const getPlats = jest.fn().mockResolvedValueOnce([mockPlat]);

    const result = await FormatInfoPlatIngredients(1);

    expect(result).toHaveProperty("info");
    expect(result?.info?.Nom).toBe("Ratatouille");
    expect(result.ingredients.length).toBe(2);
    expect(result.ingredients[0][0]).toBe("Tomato");
    expect(result.color).toBe(ok); // Assuming score would result in ok color
  });

  it("should return undefined when no plat found", async () => {
    const getPlats_Ingredients = jest.fn().mockResolvedValue([]);

    const result = await FormatInfoPlatIngredients(999); // non-existent ID

    expect(result?.info).toBeUndefined();
    expect(result?.color).toBeUndefined();
    expect(result?.ingredients).toEqual([]);
  });
});
