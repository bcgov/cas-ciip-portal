import React from 'react';
import {shallow, mount} from 'enzyme';
import FilterableTable from 'components/FilterableTable/FilterableTable';
import * as nextRouter from 'next/router';

import {
  TextFilter,
  DisplayOnlyFilter,
  TableFilter
} from 'components/FilterableTable/Filters';

describe('The filterable table', () => {
  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({
    route: '/',
    query: ''
  }));

  const emptyBody = <tbody />;

  it('renders sort headers', () => {
    const filters = [
      new TextFilter('TextTitle', 'text_column'),
      new DisplayOnlyFilter('DisplayOnlyTitle')
    ];

    const rendered = shallow(
      <FilterableTable body={emptyBody} filters={filters} />
    );

    expect(rendered).toMatchSnapshot();
    expect(rendered.find('SortableTableHeader').length).toBe(2);
    expect(
      rendered.find('SortableTableHeader').at(0).prop('headerVariables')
    ).toEqual({
      displayName: 'TextTitle',
      columnName: 'text_column',
      hasTableHeader: true,
      sortable: true
    });
    expect(
      rendered.find('SortableTableHeader').at(1).prop('headerVariables')
    ).toEqual({
      displayName: 'DisplayOnlyTitle',
      columnName: undefined,
      hasTableHeader: true,
      sortable: false
    });
  });

  it('renders filter headers', () => {
    const filters = [
      new TextFilter('TextTitle', 'text_column'),
      new DisplayOnlyFilter('DisplayOnlyTitle')
    ];

    const rendered = shallow(
      <FilterableTable body={emptyBody} filters={filters} />
    );

    expect(rendered).toMatchSnapshot();
    expect(
      rendered.find('FilterableTableFilterRow').at(0).prop('filters')
    ).toBe(filters);
  });

  it('renders the table body', () => {
    const body = (
      <tbody>
        <tr>
          <td>this is a test body</td>
        </tr>
      </tbody>
    );

    const rendered = shallow(<FilterableTable body={body} filters={[]} />);

    expect(rendered).toMatchSnapshot();
    expect(rendered.find('tbody').text()).toContain('this is a test body');
  });

  it('renders extra filters', () => {
    const extraFilter: TableFilter = {
      argName: 'myExtraFilter',
      title: '',
      isSearchEnabled: true,
      isSortEnabled: false,
      Component: ({onChange, filterArgs}) => {
        return (
          <input
            name="myExtraFilter"
            value={filterArgs.myExtraFilter as string}
            onChange={(e) =>
              onChange((e.nativeEvent.target as any).value, 'myExtraFilter')
            }
          />
        );
      }
    };

    const rendered = mount(
      <FilterableTable
        body={emptyBody}
        filters={[]}
        extraFilters={[extraFilter]}
      />
    );

    expect(rendered).toMatchSnapshot();
    expect(rendered.find('input[name="myExtraFilter"]')).toHaveLength(1);
  });
});
