import React from 'react';
import ProductList from '../../components/Products/ProductList';
import { wait, render } from '@testing-library/react';
import {queryMock} from "../../lib/relayQueryMock";


describe('Product List', () => {

    it('should render all the products', async () => {

        queryMock.mockQuery({
            name: 'ProductListQuery',
            data:  {
                "allProducts": {
                    "nodes": [
                        {
                            "id": "WyJwcm9kdWN0cyIsOV0=",
                            "rowId": 9,
                            "name": "Milk",
                            "description": "Sustenance for baby cows",
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
            }
        });

        console.log('mocker',queryMock)

        // This will render a Start-component that displays user 123's first and last name.
        const r = render(<ProductList />);
        await wait(() => r.getAllByText("Milk"));
        expect(r).toMatchSnapshot();
    });
});


