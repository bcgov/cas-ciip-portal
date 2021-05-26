import React from 'react';
import {DisplayOnlyFilter} from 'components/FilterableTable/Filters';
import {mount} from 'enzyme';

describe('the display only filter option', () => {
  const filterUnderTest = new DisplayOnlyFilter('display header');

  it('renders an empty td component', () => {
    const rendered = mount(<filterUnderTest.Component />);
    expect(rendered).toMatchSnapshot();
  });

  it('should not be sortable or searchable', () => {
    expect(filterUnderTest.isSearchEnabled).toBeFalse();
    expect(filterUnderTest.isSortEnabled).toBeFalse();
  });
});
