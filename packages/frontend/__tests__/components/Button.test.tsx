import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from "@/components/Button";

describe("Button", () => {
  it('doit afficher le texte correctement', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button label='ajouter' theme="primary" onPress={onPressMock}/>);
    expect(getByText('ajouter')).toBeTruthy();
  });

  it("doit appeler onPress quand on clique sur le bouton", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button label='ajouter' theme="primary" onPress={onPressMock}/>);
    fireEvent.press(getByText('ajouter'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("doit afficher un élément spécifique si une prop est activée", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button label='ajouter' theme="primary" onPress={onPressMock}/>);
    expect(getByText('ajouter')).toBeTruthy();
  });

  it("ne doit pas afficher un élément si une condition n'est pas remplie", () => {
    const onPressMock = jest.fn();
    const { queryByTestId } = render(<Button label='ajouter' theme="primary" onPress={onPressMock}/>);
    expect(queryByTestId('ajouter')).toBeNull();
  });
});
