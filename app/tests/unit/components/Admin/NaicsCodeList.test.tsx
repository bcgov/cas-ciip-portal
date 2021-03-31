import * as nextRouter from 'next/router';
import React from 'react';
import {NaicsCodeList} from 'components/Admin/NaicsCodeList';
import {mount} from 'enzyme';

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  route: '/',
  query: ''
}));

describe('The NaicsCodeList component', () => {
  it('should render a list of NAICS codes', () => {
    const naicsCodes = [
      {
        id: 'id_1',
        description: 'description_1',
        code: '123ABC'
      },
      {
        id: 'id_2',
        description: 'some other description',
        code: '999999'
      }
    ];

    const componentUnderTest = mount(<NaicsCodeList naicsCodes={naicsCodes} />);
    expect(componentUnderTest).toMatchSnapshot();
  });
});
