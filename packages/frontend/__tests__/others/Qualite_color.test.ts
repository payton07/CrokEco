import { Qualite_color } from "@/utils/other";
import { blue, good, ok, bad } from "@/utils/constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('Qualite_color', () => {
  it('should return blue for score 0', () => {
    expect(Qualite_color(0)).toBe(blue);
  });

  it('should return green for score <= 1', () => {
    expect(Qualite_color(1)).toBe(good);
    expect(Qualite_color(0.5)).toBe(good);
  });

  it('should return orange for score between 1 and 5', () => {
    expect(Qualite_color(3)).toBe(ok);
  });

  it('should return red for score > 5', () => {
    expect(Qualite_color(6)).toBe(bad);
  });
});
