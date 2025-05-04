import { checkForDailyUpdate } from "@/utils/other";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock d'AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('checkForDailyUpdate', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Réinitialise tous les mocks avant chaque test
  });

  it('ne devrait pas effectuer de mise à jour si la mise à jour a déjà été effectuée aujourd\'hui', async () => {
    const today = new Date().toISOString().split('T')[0]; // Obtenir la date d'aujourd'hui (format yyyy-mm-dd)
    
    // Simuler la dernière mise à jour effectuée aujourd'hui
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(today); // Dernière mise à jour aujourd'hui

    const mockUpdateFunction = jest.fn();

    // Exécute la fonction
    await checkForDailyUpdate(mockUpdateFunction);

    
    expect(mockUpdateFunction).not.toHaveBeenCalled();
    expect(AsyncStorage.setItem).not.toHaveBeenCalled(); 
  });
});
