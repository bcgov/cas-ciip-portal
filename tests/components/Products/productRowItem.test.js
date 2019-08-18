import React from 'react';
import ProductRowItem from '../../../components/Products/ProductRowItem';
import { wait, render, fireEvent, getByText } from '@testing-library/react';


const product =   {
    "rowId": 9,
    "name": "Milk",
    "description": "Sustenance for baby cows",
    "benchmarksByProductId": {
        "nodes": [
            {
                "benchmark": 10,
                "eligibilityThreshold": 20
            }
        ]
    }
};

describe('Product Row Item', () => {

    it('should render the product', async () => {
        // This will replace the query in ProductList with the one above and wait till Milk is rendered
        const r = render(<ProductRowItem product={product} />);
        await wait(() => r.getAllByText("Milk"));
        expect(r).toMatchSnapshot();
    });

    it('should toggle to edit when I click edit', () => {
        const {getByLabelText, getByText, findByRole} = render(<ProductRowItem product={product} />);
        fireEvent.click(getByText(/Edit/i));
        expect(getByText('Save')).toBeDefined();
    });


});


// Test Benchmark can be updated

// Test threshold can be updated