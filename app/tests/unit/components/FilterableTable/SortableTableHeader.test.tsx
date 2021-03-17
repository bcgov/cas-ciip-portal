import * as nextRouter from 'next/router';
import React from 'react';
import SortableTableHeader from 'components/FilterableTable/SortableTableHeader';
import {shallow} from 'enzyme';

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  route: '/',
  query: ''
}));

describe('The sortable table header', () => {
  it('displays the sort direction arrows if sortable is true', () => {
    const headerVars = {
      columnName: 'testcolumn',
      displayName: 'testdisplay',
      sortable: true
    };
    const rendered = shallow(
      <SortableTableHeader headerVariables={headerVars} />
    );

    expect(rendered).toMatchSnapshot();
    expect(rendered.find('FontAwesomeIcon').length).toBe(1);
  });

  it('doesnt display the sort direction arrows if sortable is false', () => {
    const headerVars = {
      columnName: 'testcolumn',
      displayName: 'testdisplay',
      sortable: false
    };
    const rendered = shallow(
      <SortableTableHeader headerVariables={headerVars} />
    );

    expect(rendered).toMatchSnapshot();
    expect(rendered.find('FontAwesomeIcon').length).toBe(0);
  });

  it('gets the sort direction from the router', () => {
    nextRouter.useRouter.mockImplementation(() => ({
      route: '/',
      query: {order_by: 'TEST_COLUMN_ASC'}
    }));

    const headerVars = {
      columnName: 'test_column',
      displayName: 'test_display',
      sortable: true
    };

    const rendered = shallow(
      <SortableTableHeader headerVariables={headerVars} />
    );
    expect(rendered).toMatchSnapshot();
    expect(rendered.find('FontAwesomeIcon').first().props().icon.iconName).toBe(
      'caret-down'
    );
  });
});
