import React from 'react';
import ApplicationRowItem from '../../../components/Applications/ApplicationRowItem';
import { wait, render, fireEvent, getByTestId, getByText } from '@testing-library/react';

const date = new Date('1995-12-17T03:24:00');

const application =   {
    "applicationId": 9,
    "applicationStatus": "pending",
    "facilityName": "facility1",
    "operatorName": 'operator1',
    "submissionDate": date.toUTCString()
};

describe('Application Row Item', () => {

    it('should render the application', async () => {
        const r = render(<ApplicationRowItem application={application} />);
        await wait(() => r.getAllByText("facility1"));
        expect(r).toMatchSnapshot();
    });
});
