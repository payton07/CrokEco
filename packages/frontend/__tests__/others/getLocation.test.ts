import * as Location from 'expo-location';
import {getLocation} from "@/utils/other";  
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));


const mockLocation = { coords: { latitude: 12.34, longitude: 56.78 } };
jest.mock('expo-location', () => (
  {
    requestForegroundPermissionsAsync: jest.fn().mockResolvedValueOnce({ status: "granted" }).mockResolvedValueOnce({ status: "denied" }),
    getCurrentPositionAsync: jest.fn().mockResolvedValue(mockLocation),
}
));

describe('getLocation', () => {
  it('doit demander la permission de localisation', async () => {

    await getLocation();

    expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(Location.getCurrentPositionAsync).toHaveBeenCalledTimes(1);
  });

  it('doit afficher une alerte si la permission est refusée', async () => {
    const alertMock = jest.spyOn(Alert, 'alert').mockImplementation();

    await getLocation();

    expect(alertMock).toHaveBeenCalledWith("Erreur", "Autorisez la localisation pour continuer");
    alertMock.mockRestore();
  });
});
