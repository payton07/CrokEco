import React from 'react';
import { render } from '@testing-library/react-native';
import { Text,View } from 'react-native';
import Suggestion from '@/components/Suggestion';

// On mocke le composant `Fav` pour isoler le test
jest.mock('@/components/Fav', () => {
  const { Text } = require('react-native');
  return ({ out }: any) => {
    return <Text testID={`fav-${out.info?.id}`}>Mocked Fav {out.info?.Nom}</Text>;
  };
});

describe('Suggestion', () => {
  it('affiche le titre et les composants Fav', () => {
    const mockData = [
      { info: { id: 1, Nom: 'Plat 1' }, color: 'blue', ingredients: [] },
      { info: { id: 2, Nom: 'Plat 2' }, color: 'green', ingredients: [] },
    ];

    const { getByText, getByTestId } = render(<Suggestion loads={mockData} />);

    // Vérifie le titre
    expect(getByText(/Suggestion/i)).toBeTruthy();

    // Vérifie les éléments Fav
    expect(getByTestId('fav-1')).toBeTruthy();
    expect(getByTestId('fav-2')).toBeTruthy();

    expect(getByText('Mocked Fav Plat 1')).toBeTruthy();
    expect(getByText('Mocked Fav Plat 2')).toBeTruthy();
  });

  it('n\'affiche rien si la liste est vide', () => {
    const { queryByTestId } = render(<Suggestion loads={[]} />);
    expect(queryByTestId('fav-1')).toBeNull();
  });
});
