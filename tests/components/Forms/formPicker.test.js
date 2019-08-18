import React from 'react';
import {wait, render, fireEvent, getByText} from '@testing-library/react';
import {queryMock} from "../../../lib/relayQueryMock";
import FormPicker from "../../../components/Forms/FormPicker";

let mockAppQueryData;

describe('Form Loader', () => {
    beforeEach(() => {
        // Make sure mock data is always fresh for each test run
        mockAppQueryData = {
            "allFormJsons": {
                "nodes": [
                    {
                        "rowId": 1,
                        "id": "WyJmb3JtX2pzb25zIiwxXQ==",
                        "name": "Test form 1",
                        "formJson": "{\"elements\":[{\"name\":\"customerName\",\"type\":\"text\",\"title\":\"1: What is your name?\",\"isRequired\":true}]}"
                    }
                ]
            }
        }
    });

    it('should render the form', async () => {
        queryMock.mockQuery({
            name: 'FormPickerQuery',
            data: mockAppQueryData
        });
        const r = render(<FormPicker/>);
     //   fireEvent.click(r.getByText("Please select a form"));
        await wait(() => r.getAllByText(/Please select a form/i));
        expect(r).toMatchSnapshot();
    });

});

// This component is most likely a --DEV only component, unless turned into a reusable component