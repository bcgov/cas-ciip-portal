import React from 'react';
import { queryMock } from '../../../lib/relayQueryMock';
import IndustryUser from '../../../containers/Industry/IndustryUser';
import { wait, render } from '@testing-library/react';


let mockQueryData;
describe('IndustryUser', () => {
    beforeEach(() => {
        mockQueryData = {
            allUsers: {
                nodes: [{
                    id: 'WyJwcm9kdWN0cyIsOV0=',
                    rowId: 1,
                    emailAddress: 'hamza@button.is',
                    firstName: 'Hamza',
                    lastName: 'Javed',
                    userDetailsByUserId: {
                        nodes: [{
                            rowId: 0,
                            userId: 1,
                            role: 'frontend developer',
                            phone: '6042999395',
                            email: 'hamza@button.is'
                        }]
                    }
                }]
            }


        }
    });
    it('renders welcome message', async () => {
        queryMock.mockQuery({
            name: 'IndustryUserQuery',
            data: mockQueryData
        });
        const r = render(<IndustryUser />);
        await wait(() => r.getAllByText('Hamza Javed', { exact: false }));
        expect(r).toMatchSnapshot();
    });
})