import { FormatDataPlatReconnu} from '@/utils/other';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// jest.mock('./bdd');

describe('FormatDataPlatReconnu', () => {
  it('should return formatted plat data for recognized plat', async () => {
    const mockPlat = { ID_plat: 1, Nom_plat: 'Ratatouille' };
    const mockFormattedInfo = { info: { Nom: 'Ratatouille' }, color: 'green', ingredients: [] };
    
    const getPlats = jest.fn().mockResolvedValueOnce([mockPlat]);
    const FormatInfoPlatIngredients = jest.fn().mockResolvedValueOnce(mockFormattedInfo);

    const result = await FormatDataPlatReconnu(['Ratatouille']);
    
    expect(result[0]).toHaveProperty('text', 'Ratatouille');
    expect(result[0]).toHaveProperty('color', 'green');
    expect(result[0].id).toBe(1);
  });

  it('should return black color for unrecognized plat', async () => {
    const getPlats = jest.fn().mockResolvedValueOnce([]);
    
    const result = await FormatDataPlatReconnu(['UnknownDish']);
    
    expect(result[0]).toHaveProperty('text', 'UnknownDish');
    expect(result[0]).toHaveProperty('color', 'black');
  });
});
