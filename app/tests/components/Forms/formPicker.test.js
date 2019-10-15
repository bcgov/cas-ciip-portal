import React from 'react';
import {wait, render} from '@testing-library/react';
import {queryMock} from '../../../lib/relayQueryMock';
import {FormPicker} from '../../../containers/Forms/FormPicker';

let mockAppQueryData;

describe('Form Loader', () => {
  beforeEach(() => {
    // Make sure mock data is always fresh for each test run
    mockAppQueryData = {
      allFormJsons: {
        nodes: [
          {
            rowId: 1,
            id: 'WyJmb3JtX2pzb25zIiwxXQ==',
            name: 'Test form 1',
            formJson:
              '{"elements":[{"name":"customerName","type":"text","title":"1: What is your name?","isRequired":true}]}'
          }
        ]
      }
    };
  });

  // TODO: this snapshot differs on CI and needs to be debugged
  it('should render the form', async () => {
    queryMock.mockQuery({
      name: 'FormPickerQuery',
      data: mockAppQueryData
    });
    const r = render(<FormPicker />);
    //   FireEvent.click(r.getByText("Please select a form"));
    await wait(() => r.getAllByText(/Please select a form/i));
    expect(r).toMatchSnapshot();
  });
});

// This component is most likely a --DEV only component, unless turned into a reusable component
