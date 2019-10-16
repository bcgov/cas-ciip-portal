import React from 'react';
import {wait, render} from '@testing-library/react';
import {shallow, mount} from 'enzyme';
import * as Survey from 'survey-react';
import {FormLoaderContainer} from '../../../containers/Forms/FormLoaderContainer';
import {createMockEnvironment} from 'relay-test-utils'
import { create } from 'domain';


describe('Form Loader', () => {
  let survey;
  let query;
  let environment;
  beforeEach(() => {
    environment = createMockEnvironment();
    const model = new Survey.Model(
      '{"elements":[{"name":"customerName","type":"text","title":"What is your name?","isRequired":true}]}'
    );
    survey = <Survey.Survey model={model} onComplete={jest.fn()} />;
    Survey.Survey.cssType = 'bootstrap';
    query = {
      json: {
        edges: [{node: {id: 'form-1', rowId: 1, name: 'testForm', formJson: '{"elements":[{"name":"customerName","type":"text","title":"What is your name?","isRequired":true}]}'}}]
      }
    };
  });

  it('should render the form', async () => {
    console.log(query)
    const r = shallow(<FormLoaderContainer query={query} relay={{environment}}/>);
    r.update();
    expect(r).toMatchSnapshot();
  });

    it.skip('should render the complete button', async () => {
    const r = shallow(<FormLoaderContainer formJson={survey} />);
    // await wait(() => r.getAllByText(/Complete/i));
    expect(r.getAllByText(/Complete/i)).toBeDefined();
  });
});
