import React from 'react';
import {shallow} from 'enzyme';
import FilterableTableLayoutComponent from 'components/FilterableComponents/FilterableTableLayout';

import {TextSearchOption} from 'components/Search/TextSearchOption';
import {DisplayOnlyOption} from 'components/Search/DisplayOnlyOption';

describe('The filterable table layout', () => {
  const emptyBody = <React.Component>{[]}</React.Component>;

  it('renders sort headers', () => {
    const searchOptions = [
      new TextSearchOption('TextTitle', 'text_column'),
      new DisplayOnlyOption('DisplayOnlyTitle')
    ];

    const rendered = shallow(
      <FilterableTableLayoutComponent
        body={emptyBody}
        handleEvent={() => {}}
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
        handleEvent={() => {}}
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
      <FilterableTableLayoutComponent
        body={body}
        handleEvent={() => {}}
        searchOptions={[]}
      />
    );

    expect(rendered).toMatchSnapshot();
    expect(rendered.find('tbody').text()).toContain('this is a test body');
  });
});
