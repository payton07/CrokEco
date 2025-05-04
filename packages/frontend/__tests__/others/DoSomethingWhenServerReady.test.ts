import { DoSomethingWhenServerReady } from "@/utils/other";
import NetInfo from '@react-native-community/netinfo';
import { Ping } from "@/utils/routes";
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(),
}));

jest.mock('@/utils/routes', () => ({
  Ping: jest.fn(),
}));

describe('DoSomethingWhenServerReady', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('envoie directement si connecté et serveur up', async () => {
    (NetInfo.fetch as jest.Mock).mockResolvedValue({ isConnected: true });
    (Ping as jest.Mock).mockResolvedValue(true);

    const mockSendFunction = jest.fn().mockResolvedValue('Success');

    const result = await DoSomethingWhenServerReady({ foo: 'bar' }, mockSendFunction);

    expect(mockSendFunction).toHaveBeenCalledWith({ foo: 'bar' });
    expect(result).toBe('Success');
  });

  it('attend la reconnexion puis envoie', async () => {
    jest.setTimeout(10000);
    
    // const fetchMock = NetInfo.fetch as jest.Mock;
    // const pingMock = Ping as jest.Mock;
    
    // 1er tour : offline et serveur down
    const fetch = jest.fn()
    .mockResolvedValueOnce({ isConnected: false }) // check initial
    .mockResolvedValueOnce({ isConnected: true }) 
    .mockResolvedValueOnce({ isConnected: true });
    
    const ping = jest.fn()
    .mockResolvedValueOnce(false) // check initial
    .mockResolvedValueOnce(true) 
    .mockResolvedValueOnce(true); 
    
    jest.useFakeTimers();
    const mockSendFunction = jest.fn().mockResolvedValue('Success');

    const promise = DoSomethingWhenServerReady({ foo: 'bar' }, mockSendFunction);

    // Simule deux cycles d'intervalle
    jest.advanceTimersByTime(10000); // avance 10s → 2 cycles de 5s

    const result = await promise;

    expect(mockSendFunction).toHaveBeenCalledWith({ foo: 'bar' });
    expect(result).toBe('Success');

    jest.useRealTimers();
  });
});
