import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Textshow from '@/components/Textshow';
import { Alert } from 'react-native';

// Mock du router de expo-router
const mockPush = jest.fn();
// jest.mock('expo-router', () => ({
//   router: {
//     push: mockPush,
//   },
// }));

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));


// Mock de FontAwesome pour éviter les erreurs liées à expo-font
jest.mock('@expo/vector-icons/FontAwesome', () => {
  return () => null;
});

// Mock de l'alerte
jest.spyOn(Alert, 'alert');

describe('Textshow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('affiche le texte et l’icône avec la bonne couleur', () => {
    const ligne = { text: 'Un Plat', color: 'blue', id: 5 };
    const { getByText } = render(<Textshow ligne={ligne} />);

    expect(getByText('Un Plat')).toBeTruthy();
  });

  it('navigue vers les détails si l\'ID est défini', () => {
    const ligne = { text: 'Un Plat', color: 'green', id: 42 };
    const { getByText } = render(<Textshow ligne={ligne} />);

    fireEvent.press(getByText('Un Plat'));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/(hidden)/details/[id]',
      params: { id: 42 }
    });
  });

  it("affiche une alerte si l'ID est null", () => {
    const ligne = { text: 'Plat inconnu', color: 'gray', id: null };
    const { getByText } = render(<Textshow ligne={ligne} />);

    fireEvent.press(getByText('Plat inconnu'));

    expect(Alert.alert).toHaveBeenCalledWith("Ce plat n'existe pas dans nos données.\nVeuillez l'ajouter sur la page d'ajout");
    expect(mockPush).not.toHaveBeenCalled();
  });
});
