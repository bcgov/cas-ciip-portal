import React from 'react';
import {shallow, mount} from 'enzyme';
import FilterableTableLayoutComponent from 'components/FilterableComponents/FilterableTableLayout';
import * as nextRouter from 'next/router';

import {TextSearchOption} from 'components/Search/TextSearchOption';
import {DisplayOnlyOption} from 'components/Search/DisplayOnlyOption';
import {ISearchExtraFilter} from 'components/Search/SearchProps';

describe('The filterable table layout', () => {
  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({
    route: '/',
    query: ''
  }));

  const emptyBody = <tbody />;

  it('renders sort headers', () => {
    const searchOptions = [
      new TextSearchOption('TextTitle', 'text_column'),
      new DisplayOnlyOption('DisplayOnlyTitle')
    ];

    const rendered = shallow(
      <FilterableTableLayoutComponent
        body={emptyBody}
        searchOptions={searchOptions}
      />
    );

    expect(rendered).toMatchSnapshot();
    expect(rendered.find('SortableTableHeader').length).toBe(2);
    expect(
      rendered.find('SortableTableHeader').at(0).prop('headerVariables')
    ).toEqual({
      displayName: 'TextTitle',
      columnName: 'text_column',
      sortable: true
    });
    expect(
      rendered.find('SortableTableHeader').at(1).prop('headerVariables')
    ).toEqual({
      displayName: 'DisplayOnlyTitle',
      columnName: undefined,
      sortable: false
    });
  });

  it('renders filter headers', () => {
    const searchOptions = [
      new TextSearchOption('TextTitle', 'text_column'),
      new DisplayOnlyOption('DisplayOnlyTitle')
    ];

    const rendered = shallow(
      <FilterableTableLayoutComponent
        body={emptyBody}
        searchOptions={searchOptions}
      />
    );

    expect(rendered).toMatchSnapshot();
    expect(
      rendered.find('FilterableTableHeaders').at(0).prop('searchOptions')
    ).toBe(searchOptions);
  });

  it('renders the table body', () => {
    const body = (
      <tbody>
        <tr>
          <td>this is a test body</td>
        </tr>
      </tbody>
    );

    const rendered = shallow(
      <FilterableTableLayoutComponent body={body} searchOptions={[]} />
    );

    expect(rendered).toMatchSnapshot();
    expect(rendered.find('tbody').text()).toContain('this is a test body');
  });

  it('renders extra filters', () => {
    const extraFilter: ISearchExtraFilter = {
      argName: 'myExtraFilter',
      Component: ({onChange, value}) => {
        return (
          <input
            name="myExtraFilter"
            value={value as string}
            onChange={(e) => onChange((e.nativeEvent.target as any).value)}
          />
        );
      }
    };

    const rendered = mount(
      <FilterableTableLayoutComponent
        body={emptyBody}
        searchOptions={[]}
        extraFilters={[extraFilter]}
      />
    );

    expect(rendered).toMatchSnapshot();
    expect(rendered.find('input[name="myExtraFilter"]')).toHaveLength(1);
  });
});
