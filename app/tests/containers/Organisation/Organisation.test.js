import React from 'react';
import {shallow} from 'enzyme';
import {OrganisationComponent} from '../../../containers/Organisations/Organisation';

describe('Organisation', () => {
  it('should not render an organisation if the organisation does not contain the search input', async () => {
    const organisation = {
      rowId: 1,
      operatorName: 'abc'
    };
    const r = shallow(
      <OrganisationComponent orgInput="z" organisation={organisation} />
    );
    expect(r).toMatchSnapshot();
    expect(r.exists('DropdownItem')).toEqual(false);
  });
  it('should render an organisation if the organisation contains the search input', async () => {
    const organisation = {
      rowId: 1,
      operatorName: 'abc'
    };
    const r = shallow(
      <OrganisationComponent orgInput="b" organisation={organisation} />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('DropdownItem').text()).toBe('abc');
  });
});
