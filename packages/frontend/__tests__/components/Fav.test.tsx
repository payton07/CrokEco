import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Link } from 'expo-router'; 
import Fav from '@/components/Fav';

describe("Fav", () => {
  it('doit afficher le texte correctement', () => {
    const FavDataMock = jest.fn().mockReturnValue({
      info: {
        id: 1,
        Nom: 'plat',
        Score: 1,
        Unite: 'g',
      },
      color: 'red',
    });

    const data = FavDataMock();

    const { getByText } = render(<Fav out={data}/>);
    expect(getByText('plat')).toBeTruthy();
  });

  
  jest.mock('expo-router', () => ({
    Link: jest.fn(({ children, ...props }) => {
      return <>{children}</>; 
    }),
  }));
  
  
  jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(() => ({
      navigate: jest.fn(),
    })),
  }));
  
  test('doit naviguer vers le bon lien lors du clic', () => {
    const mockOut = {
      info: { id: 1, Nom: 'Nom de test', Score: '5', Unite: 'kg' },
      color: 'blue',
      ingredients: [],
    };
  
    
    const { getByText , getByTestId} = render(<Fav out={mockOut} />);
  
    
    expect(getByText('Nom de test')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(getByText('kg')).toBeTruthy();
  
    
    const linkElement = getByTestId('1');
  
    expect(linkElement.props.href).toBe('/details/1');
  });
  
});
