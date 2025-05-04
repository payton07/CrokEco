import { getDataWithCacheExpiration } from "@/utils/other";
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('getDataWithCacheExpiration', () => {
  it('should return cached data if not expired', async () => {
    const mockData = { some: 'data' };
    AsyncStorage.getItem = jest.fn().mockResolvedValueOnce(
      JSON.stringify({ data: mockData, timestamp: Date.now() })
    );
    
    const result = await getDataWithCacheExpiration('key', jest.fn());
    
    expect(result).toEqual(mockData);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('key');
  });

  it('should fetch new data if cache is expired', async () => {
    const mockData = { some: 'new data' };
    AsyncStorage.getItem = jest.fn().mockResolvedValueOnce(
      JSON.stringify({ data: mockData, timestamp: Date.now() - 100000 })
    );
    const mockCallFunction = jest.fn().mockResolvedValue('new data from API');
    
    const result = await getDataWithCacheExpiration('key', mockCallFunction, 1);
    
    expect(result).toBe('new data from API');
    expect(mockCallFunction).toHaveBeenCalled();
  });
});
