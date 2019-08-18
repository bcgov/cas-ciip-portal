import React from 'react';
import ProductCreator from '../../../components/Products/ProductCreator';
import { render } from '@testing-library/react';



describe('Product Creator', () => {

    it('should render the product name field', async () => {
        // This will replace the query in ProductList with the one above and wait till Milk is rendered
        const {getByLabelText} = render(<ProductCreator />);
        expect(getByLabelText(/Product Name/i)).toBeDefined();
    });

    it('should render the product desc field', async () => {
        // This will replace the query in ProductList with the one above and wait till Milk is rendered
        const {getByLabelText} = render(<ProductCreator />);
        expect(getByLabelText(/Product Description/i)).toBeDefined();
    });

    it('should render the Create Product button', async () => {
        // This will replace the query in ProductList with the one above and wait till Milk is rendered
        const {getByText} = render(<ProductCreator />);
        expect(getByText(/Create Product/i)).toBeDefined();
    });

    it('should match the last usable snapshot', async () => {
        // This will replace the query in ProductList with the one above and wait till Milk is rendered
        const container = render(<ProductCreator />);
        expect(container).toMatchSnapshot();
    });

});

// Test the productCreator Mutation