import React from 'react';
import ProductList from '../../../components/Products/ProductList';
import { wait, render } from '@testing-library/react';
import {queryMock} from "../../../lib/relayQueryMock";

let mockAppQueryData;

describe('Product List', () => {
    beforeEach(() => {
        // Make sure mock data is always fresh for each test run
        mockAppQueryData =  {
            "allProducts": {
                "nodes": [
                    {
                        "id": "WyJwcm9kdWN0cyIsOV0=",
                        "rowId": 9,
                        "name": "Milk",
                        "description": "Sustenance for baby cows",
                        "archived": false,
                        "benchmarksByProductId": {
                            "nodes": [
                                {
                                    "id": "WyJiZW5jaG1hcmtzIiw3XQ==",
                                    "benchmark": 10,
                                    "eligibilityThreshold": 20
                                }
                            ]
                        }
                    },
                    {
                        "id": "WyJwcm9kdWN0cyIsMTBd",
                        "rowId": 10,
                        "name": "Butter",
                        "description": "Sustenance for Keto folk",
                        "archived": false,
                        "benchmarksByProductId": {
                            "nodes": [
                                {
                                    "id": "WyJiZW5jaG1hcmtzIiw4XQ==",
                                    "benchmark": 20,
                                    "eligibilityThreshold": 40
                                }
                            ]
                        }
                    }
                ]
            }
        };
    });

    it('should render all the products', async () => {
        queryMock.mockQuery({
            name: 'ProductListQuery',
            data: mockAppQueryData
        });

        // This will replace the query in ProductList with the one above and wait till Milk is rendered
        const r = render(<ProductList />);
        await wait(() => r.getAllByText("Milk"));
        expect(r).toMatchSnapshot();
    });

});


// Test product can be created

// Test Product can edited

// Test Benchmark can be updated

// Test threshold can be updated