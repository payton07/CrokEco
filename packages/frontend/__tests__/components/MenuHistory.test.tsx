import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MenuHistory from '@/components/MenuHistory';

// ✅ Mock `expo-router/router`
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

// ✅ Mock `@expo/vector-icons/FontAwesome`
jest.mock('@expo/vector-icons/FontAwesome', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return (props: any) => <Text {...props}>★</Text>; // ou <View /> si tu préfères
});

import { router } from 'expo-router'; // maintenant que c'est mocké

describe('MenuHistory', () => {
  const mockMenu = {
    ID_menu: 42,
    ID_restaurant: 21,
    NomMenu: 'menu',
    Date: '20-04-2025',
    color: 'black',
  };

  it('affiche les informations du menu', () => {
    const { getByText } = render(<MenuHistory menu={mockMenu} />);
    expect(getByText('menu42')).toBeTruthy(); // NomMenu + ID_menu
    expect(getByText('20-04-2025')).toBeTruthy();
  });

  it('navigue correctement au clic', () => {
    const { getByText } = render(<MenuHistory menu={mockMenu} />);
    fireEvent.press(getByText('menu42'));

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/(hidden)/menus/[id]',
      params: {
        id: 42,
        ID_menu: 42,
        ID_restaurant: 21,
      },
    });
  });
});
