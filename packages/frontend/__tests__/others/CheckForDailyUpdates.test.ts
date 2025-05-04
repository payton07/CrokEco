import { checkForDailyUpdate } from "@/utils/other";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('checkForDailyUpdate', () => {
    it('devrait mettre à jour les données si la mise à jour n\'a pas été effectuée aujourd\'hui', async () => {
      // const AsyncStorage = {
      //   getItem : jest.fn().mockResolvedValue('2023-05-03'),
      //   setItem: jest.fn(),
      // };
      AsyncStorage.getItem= jest.fn().mockResolvedValue('2023-05-03'); // Dernière mise à jour d'hier
      const Ping = jest.fn().mockResolvedValue(true);
      const mockUpdateFunction = jest.fn();

      await checkForDailyUpdate(mockUpdateFunction);

      expect(mockUpdateFunction).toHaveBeenCalled();
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });

    it('ne devrait pas effectuer de mise à jour si la mise à jour a déjà été effectuée aujourd\'hui', async () => {
      const today = new Date().toISOString().split('T')[0];
      // const AsyncStorage = {
      //   getItem : jest.fn().mockResolvedValue(today),
      //   setItem: jest.fn(),
      // };
      AsyncStorage.getItem= jest.fn().mockResolvedValue(today); // Dernière mise à jour aujourd'hui

      const mockUpdateFunction = jest.fn();
      await checkForDailyUpdate(mockUpdateFunction);

      expect(mockUpdateFunction).not.toHaveBeenCalled();
    });
  });