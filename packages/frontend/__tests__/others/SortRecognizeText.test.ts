import { sortRecognizedText } from '@/utils/other'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
})); // adapte le chemin

describe('sortRecognizedText', () => {
  it('doit trier les blocs de texte en fonction de leur position sur l\'image', () => {
    const blocks : any[]= [
      { frame: { x: 10, y: 10 }, text: 'a' },
      { frame: { x: 10, y: 30 }, text: 'c' },
      { frame: { x: 10, y: 20 }, text: 'b' },
    ];
    const result = sortRecognizedText(blocks);
    expect(result).toBe('a\nc\nb');
  });

  it('doit renvoyer une chaîne vide si aucun bloc de texte n\'est disponible', () => {
    const blocks :any[]= [];
    const result = sortRecognizedText(blocks);
    expect(result).toBe('');
  });
});
