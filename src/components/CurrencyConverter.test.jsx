import { render, screen } from '@testing-library/react';
import CurrencyContext from '../contexts/CurrencyContext';
import CurrencyConverter from './CurrencyConverter';
import { describe, it, expect } from 'vitest';
import { fireEvent } from '@testing-library/react';



describe('CurrencyConverter Component', () => {
    it("should render correctly", () => {
        // Arrange
        render(
            <CurrencyContext.Provider value ={{
                //whatever
                fromCurrency: "EUR",
                toCurrency: "USD"
            }}>
                <CurrencyConverter />
            </CurrencyContext.Provider>
        );
        //Act

        //Assert
        expect(screen.getByPlaceholderText("Enter amount")).toBeInTheDocument();
        expect(screen.getByText("EUR")).toBeInTheDocument();
        expect(screen.getByText("=")).toBeInTheDocument();
        expect(screen.getByText("0")).toBeInTheDocument();
        expect(screen.getByText("USD")).toBeInTheDocument();        
    })

    it("should show the correct amount for given input", () => {
        // Arrange
        render(
            <CurrencyContext.Provider value ={{
                fromCurrency: "EUR",
                toCurrency: "USD"
            }}>
                <CurrencyConverter />
            </CurrencyContext.Provider>
        );
        //Act
        const inputField = screen.getByPlaceholderText("Enter amount");
        fireEvent.change(inputField, { target: { value: '10' } });

        //Assert
        expect(screen.getByText("20")).toBeInTheDocument();
    })

    it("should show 0 when input is empty", () => {
        // Arrange
        render(
            <CurrencyContext.Provider value ={{
                fromCurrency: "EUR",
                toCurrency: "USD"
            }}>
                <CurrencyConverter />
            </CurrencyContext.Provider>
        );
        //Act
        const inputField = screen.getByPlaceholderText("Enter amount");
        fireEvent.change(inputField, { target: { value: '' } });

        //Assert
        expect(screen.getByText("0")).toBeInTheDocument();
    })

    it("should show updated output when currencies change", () => {
        // Arrange
        const { rerender } = render(
            <CurrencyContext.Provider value ={{
                fromCurrency: "EUR",
                toCurrency: "USD"
            }}>
                <CurrencyConverter />
            </CurrencyContext.Provider>
        );
        
        //Assert
        expect(screen.getByText("EUR")).toBeInTheDocument();
        expect(screen.getByText("USD")).toBeInTheDocument();

        // Act - currency change
        rerender(
            <CurrencyContext.Provider value ={{
                fromCurrency: "SGD",
                toCurrency: "GBP"
            }}>
                <CurrencyConverter />
            </CurrencyContext.Provider>
        );

        // Assert that output is still correct after currency change
        expect(screen.getByText("SGD")).toBeInTheDocument();
        expect(screen.getByText("GBP")).toBeInTheDocument();
    });

    it("should handle negative input values", () => {
        // Arrange
        render(
            <CurrencyContext.Provider value ={{
                fromCurrency: "EUR",
                toCurrency: "USD"
            }}>
                <CurrencyConverter />
            </CurrencyContext.Provider>
        );
        //Act
        const inputField = screen.getByPlaceholderText("Enter amount");
        fireEvent.change(inputField, { target: { value: '-10' } });

        //Assert
        expect(screen.getByText("0")).toBeInTheDocument();
    })
});
