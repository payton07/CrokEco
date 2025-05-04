import { MostOccurent } from "@/utils/other";
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('MostOccurent', () => {
  it('should return most frequent string', () => {
    const result = MostOccurent(['apple', 'banana', 'apple']);
    expect(result).toBe('apple');
  });

  it('should return null if array is empty', () => {
    const result = MostOccurent([]);
    expect(result).toBeNull();
  });
});
