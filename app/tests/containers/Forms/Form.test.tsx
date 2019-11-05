import React from 'react';
import {shallow} from 'enzyme';
import {FormComponent} from '../../../containers/Forms/Form';

describe('Form Loader', () => {
  const formJson = JSON.stringify({
    elements: [
      {
        name: 'customerName',
        type: 'text',
        title: 'What is your name?',
        isRequired: true
      }
    ]
  });
  it('should match the snapshot', async () => {
    const r = shallow(
      <FormComponent
        query={{
          json: {
            edges: [
              {
                node: {
                  id: 'form-1',
                  rowId: 1,
                  name: 'testForm',
                  formJson
                }
              }
            ]
          }
        }}
      />
    );
    expect(r).toMatchSnapshot();
  });

  it('should match the snapshot when it has initial data', async () => {
    const r = shallow(
      <FormComponent
        initialData={{customerName: 'Morty'}}
        initialDataSource="the test"
        query={{
          json: {
            edges: [
              {
                node: {
                  id: 'form-1',
                  rowId: 1,
                  name: 'testForm',
                  formJson
                }
              }
            ]
          }
        }}
      />
    );
    expect(r).toMatchSnapshot();
  });
});
