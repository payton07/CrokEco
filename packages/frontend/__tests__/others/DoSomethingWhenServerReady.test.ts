import { DoSomethingWhenServerReady } from "@/utils/other";
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// jest.mock('@react-native-community/netinfo', () => ({
//   fetch: jest.fn(),
// }));

describe('DoSomethingWhenServerReady', () => {
  it('should send data when server is ready and user is connected', async () => {
    NetInfo.fetch = jest.fn().mockResolvedValue({ isConnected: true });
    const Ping = jest.fn().mockResolvedValue(true);

    const mockSendFunction = jest.fn().mockResolvedValue('Success');
    const result = await DoSomethingWhenServerReady({}, mockSendFunction);

    expect(result).toBe('Success');
    expect(mockSendFunction).toHaveBeenCalled();
  });

  it('should wait for reconnection if server is down', async () => {
    NetInfo.fetch = jest.fn().mockResolvedValue({ isConnected: false });
    const Ping = jest.fn().mockResolvedValue(false);

    const mockSendFunction = jest.fn().mockResolvedValue('Success');
    const result = await DoSomethingWhenServerReady({}, mockSendFunction);

    expect(result).toBe('Success');
    // setTimeout(() => {
    //   expect(mockSendFunction).not.toHaveBeenCalled();
    // }, 1000);
  });
});
