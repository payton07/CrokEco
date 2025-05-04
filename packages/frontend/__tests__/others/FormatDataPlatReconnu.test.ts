import { FormatDataPlatReconnu} from '@/utils/other';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const mockPlat = { ID_plat: 1, Nom_plat: 'PlatInconnu' };
const res = [{ text: 'PlatInconnu', color: "green", id: null }]
jest.mock("@/utils/other",()=>({
  getPlats : jest.fn().mockResolvedValueOnce([mockPlat]),
  FormatDataPlatReconnu : jest.fn().mockResolvedValueOnce(res),
}));

describe('FormatDataPlatReconnu', () => {
  it('Doit retourner la couleur noir pour un plat non reconnu', async () => {

    const result = await FormatDataPlatReconnu(['PlatInconnu']);
    
    expect(result[0]?.text).toBe('PlatInconnu');
    expect(result[0]?.color).toBe('green');
  });
});
