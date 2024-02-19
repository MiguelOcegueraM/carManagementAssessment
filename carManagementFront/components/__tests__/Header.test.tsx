import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from "@/components/Header";

describe('Header component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Header dataUpdated={() => {}} />);
        expect(getByText('T')).toBeTruthy();
    });

    it('opens modal on button press', () => {
        const { getByTestId } = render(<Header dataUpdated={() => {}} />);
        const button = getByTestId('openModalButton');

        fireEvent.press(button);

    });
});