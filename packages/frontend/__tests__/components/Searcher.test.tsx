import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Searcher from '@/components/Searcher';
import { router } from 'expo-router';
import { getPlats } from '@/utils/bdd';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

jest.mock('@/utils/bdd', () => ({
  getPlats: jest.fn(),
}));

describe('Searcher', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('affiche le champ de recherche', () => {
    const { getByPlaceholderText } = render(<Searcher />);
    expect(getByPlaceholderText('Search...')).toBeTruthy();
  });

  it('appelle getPlats et affiche les suggestions', async () => {
    const platsMock = [
      { ID_plat: 42, Nom_plat: 'Pâtes' },
      { ID_plat: 43, Nom_plat: 'Pizza' },
    ];

    (getPlats as jest.Mock).mockResolvedValueOnce(platsMock);

    const { getByPlaceholderText, getByText } = render(<Searcher />);
    fireEvent.changeText(getByPlaceholderText('Search...'), 'P');

    await waitFor(() => {
      expect(getPlats).toHaveBeenCalledWith({ Nom_plat: '%P%' }, true, true, 5);
      expect(getByText('Pâtes')).toBeTruthy();
      expect(getByText('Pizza')).toBeTruthy();
    });
  });

  it('navigue vers le détail quand on clique sur un plat', async () => {
    const platsMock = [{ ID_plat: 42, Nom_plat: 'Pâtes' }];
    (getPlats as jest.Mock).mockResolvedValueOnce(platsMock);

    const { getByPlaceholderText, getByText } = render(<Searcher />);
    fireEvent.changeText(getByPlaceholderText('Search...'), 'P');

    await waitFor(() => {
      expect(getByText('Pâtes')).toBeTruthy();
    });

    fireEvent.press(getByText('Pâtes'));

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/(hidden)/details/[id]',
      params: { id: 42 },
    });
  });

  it('efface les suggestions si le champ est vidé', async () => {
    const platsMock = [{ ID_plat: 1, Nom_plat: 'Salade' }];
    (getPlats as jest.Mock).mockResolvedValueOnce(platsMock);

    const { getByPlaceholderText, queryByText } = render(<Searcher />);
    const input = getByPlaceholderText('Search...');

    fireEvent.changeText(input, 'S');

    await waitFor(() => {
      expect(queryByText('Salade')).toBeTruthy();
    });

    fireEvent.changeText(input, '');

    await waitFor(() => {
      expect(queryByText('Salade')).toBeNull();
    });
  });
});
