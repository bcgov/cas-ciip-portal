import React from 'react';
import {shallow} from 'enzyme';
import * as Survey from 'survey-react';
import {createMockEnvironment} from 'relay-test-utils';
import {FormLoaderContainer} from '../../../containers/Forms/FormLoaderContainer';

// TODO: This component has been rewritten in an unmerged branch. Revisit this after the updates have been merged into develop

describe('Form Loader', () => {
  let survey;
  let query;
  let environment;

  const useEffect = jest.spyOn(React, 'useEffect').mockImplementation(f => f());

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  const model = new Survey.Model(
    '{"elements":[{"name":"customerName","type":"text","title":"What is your name?","isRequired":true}]}'
  );
  const actions = {
    setSurveyModel: jest.fn().mockResolvedValue(model)
  };

  beforeEach(() => {
    environment = createMockEnvironment();

    survey = <Survey.Survey model={model} onComplete={jest.fn()} />;
    Survey.Survey.cssType = 'bootstrap';
    query = {
      json: {
        edges: [
          {
            node: {
              id: 'form-1',
              rowId: 1,
              name: 'testForm',
              formJson:
                '{"elements":[{"name":"customerName","type":"text","title":"What is your name?","isRequired":true}]}'
            }
          }
        ]
      }
    };
  });

  it.skip('should render the form', async () => {
    const r = shallow(
      <FormLoaderContainer query={query} relay={{environment}} />
    );
    r.setProps({
      query: {
        json: {
          edges: [
            {
              node: {
                id: 'form-1',
                rowId: 1,
                name: 'testForm',
                formJson:
                  '{"elements":[{"name":"customerName","type":"text","title":"What is your name?","isRequired":true}]}'
              }
            }
          ]
        }
      }
    });
    mockUseEffect();
    mockUseEffect();
    expect(r).toMatchSnapshot();
  });
});
