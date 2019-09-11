import React from 'react';
import {wait, render} from '@testing-library/react';
import {queryMock} from '../../../lib/relayQueryMock';
import FormLoader from '../../../components/Forms/FormLoader';

let mockAppQueryData;

describe('Form Loader', () => {
  beforeEach(() => {
    // Make sure mock data is always fresh for each test run
    mockAppQueryData = {
      formJsonByRowId: {
        id: 'WyJmb3JtX2pzb25zIiwxXQ==',
        name: 'Test form 1',
        formJson:
          '{"elements":[{"name":"customerName","type":"text","title":"What is your name?","isRequired":true}]}'
      }
    };
  });

  it('should render the form', async () => {
    queryMock.mockQuery({
      name: 'FormLoaderQuery',
      variables: {
        rowId: '1'
      },
      data: mockAppQueryData
    });
    const r = render(<FormLoader formId="1" />);
    await wait(() => r.getAllByText(/What/i));
    expect(r).toMatchSnapshot();
  });

  it('should render the complete button', async () => {
    queryMock.mockQuery({
      name: 'FormLoaderQuery',
      variables: {
        rowId: '1'
      },
      data: mockAppQueryData
    });
    const r = render(<FormLoader formId="1" />);
    await wait(() => r.getAllByText(/Complete/i));
    expect(r.getAllByText(/Complete/i)).toBeDefined();
  });
});
