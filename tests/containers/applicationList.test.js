import React from 'react';
import ApplicationList from '../../containers/Applications/ApplicationList';
import { render, waitForDomChange } from '@testing-library/react';
import {queryMock} from "../../lib/relayQueryMock";

let mockAppQueryData;
const date1 = new Date('1995-12-17T03:24:00');
const date2 = new Date('2018-05-11T02:21:00');

describe('Application List', () => {
    beforeEach(() => {
        // Make sure mock data is always fresh for each test run
        mockAppQueryData =  {
            "searchApplicationList": {
                "nodes": [
                    {
                        "applicationId": 1,
                        "facilityName": 'facility1',
                        "operatorName": "operator1",
                        "applicationStatus": "approved",
                        "submissionDate": date1.toUTCString()
                    },
                    {
                        "applicationId": 2,
                        "facilityName": 'facility2',
                        "operatorName": "operator2",
                        "applicationStatus": "pending",
                        "submissionDate": date2.toUTCString()
                    }
                ]
            }
        };
    });

    it('should render all the applications', async () => {
        queryMock.mockQuery({
            name: 'ApplicationListSearchQuery',
            data: mockAppQueryData,
            variables: {"searchField":null,"searchValue":null,"orderByField":"operator_name","direction":"ASC"}
        });

        const r = render(<ApplicationList />);
        await waitForDomChange(() => r.getAllByText("facility1", {exact: false}));
        const elements = r.getAllByText(/facility\d/, {exact: false});
        expect(r).toMatchSnapshot();
        expect(elements.length).toBe(2);
    });
});
