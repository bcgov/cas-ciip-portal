import React from 'react';
import {wait, render} from '@testing-library/react';
import * as Survey from 'survey-react';
import {queryMock} from '../../../lib/relayQueryMock';
import FormLoader from '../../../components/Forms/FormLoader';

let mockAppQueryData;

describe('Form Loader', () => {
  let survey;
  beforeEach(() => {
    const model = new Survey.Model(
      '{"elements":[{"name":"customerName","type":"text","title":"What is your name?","isRequired":true}]}'
    );
    survey = <Survey.Survey model={model} onComplete={jest.fn()} />;
  });

  it('should render the form', async () => {
    const r = render(<FormLoader formJson={survey} />);
    await wait(() => r.getAllByText(/What/i));
    expect(r).toMatchSnapshot();
  });

  it('should render the complete button', async () => {
    const r = render(<FormLoader formJson={survey} />);
    await wait(() => r.getAllByText(/Complete/i));
    expect(r.getAllByText(/Complete/i)).toBeDefined();
  });
});
