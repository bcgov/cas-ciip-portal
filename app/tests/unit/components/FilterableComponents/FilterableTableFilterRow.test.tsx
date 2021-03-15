import React from 'react';
import FilterableTableFilterRow from 'components/FilterableTable/FilterableTableFilterRow';
import {shallow} from 'enzyme';
import {TableFilter} from 'components/FilterableTable/Filters';

const createMockFilter: (name: string) => TableFilter = (name) => {
  return {
    argName: name,
    title: name,
    isSearchEnabled: true,
    isSortEnabled: true
  };
};

describe('The filterable table headers component', () => {
  it('renders search and reset buttons', () => {
    const rendered = shallow(
      <FilterableTableFilterRow
        filters={[]}
        onSubmit={jest.fn()}
        filterArgs={{}}
      />
    );
    expect(rendered).toMatchSnapshot();
    expect(
      rendered
        .find('Button')
        .filterWhere((node) => node.props().variant === 'outline-secondary')
        .first()
        .text()
    ).toBe('Clear');
    expect(
      rendered
        .find('Button')
        .filterWhere((node) => node.props().variant === 'primary')
        .first()
        .text()
    ).toBe('Apply');
  });

  it('renders as many td elements as search options, plus one for the search buttons', () => {
    const filters: TableFilter[] = [
      createMockFilter('test'),
      createMockFilter('test2')
    ];
    const rendered = shallow(
      <FilterableTableFilterRow
        filters={filters}
        onSubmit={jest.fn()}
        filterArgs={{test: 'a', test2: 'b'}}
      />
    );

    expect(rendered).toMatchSnapshot();
    expect(rendered.find('td').length).toBe(3);
  });

  it('only renders elements that are searchable', () => {
    const filters = [
      {...createMockFilter('test'), isSearchEnabled: false},
      {...createMockFilter('test2'), isSearchEnabled: false},
      {...createMockFilter('test3'), isSearchEnabled: true}
    ];
    const rendered = shallow(
      <FilterableTableFilterRow
        filters={filters}
        onSubmit={jest.fn()}
        filterArgs={{}}
      />
    );

    expect(rendered).toMatchSnapshot();
    expect(rendered.find('FormControl').length).toBe(1);
    expect(rendered.find('FormControl').first().props().name).toBe('test3');
  });

  it('renders a text input if values are not provided', () => {
    const filters = [createMockFilter('test')];
    const rendered = shallow(
      <FilterableTableFilterRow
        filters={filters}
        onSubmit={jest.fn()}
        filterArgs={{}}
      />
    );

    expect(rendered).toMatchSnapshot();
    expect(
      rendered
        .find('FormControl')
        .filterWhere((formControl) => formControl.props().as === undefined)
        .length
    ).toBe(1);
    expect(
      rendered
        .find('FormControl')
        .filterWhere((formControl) => formControl.props().as === 'select')
        .length
    ).toBe(0);
  });

  it('renders a option input if values are provided', () => {
    const filters: TableFilter[] = [
      {
        ...createMockFilter('test'),
        searchOptionValues: [
          {
            display: 'option1',
            value: 'optionvalue1'
          },
          {
            display: 'option2',
            value: 'optionvalue2'
          }
        ]
      }
    ];
    const rendered = shallow(
      <FilterableTableFilterRow
        filters={filters}
        onSubmit={jest.fn()}
        filterArgs={{}}
      />
    );

    expect(rendered).toMatchSnapshot();
    expect(
      rendered
        .find('FormControl')
        .filterWhere((formControl) => formControl.props().as === undefined)
        .length
    ).toBe(0);
    expect(
      rendered
        .find('FormControl')
        .filterWhere((formControl) => formControl.props().as === 'select')
        .length
    ).toBe(1);

    expect(rendered.find('option').length).toBe(3);
    expect(rendered.find('option').at(0).text()).toContain('...');
    expect(rendered.find('option').at(1).text()).toContain('Option1');
    expect(rendered.find('option').at(2).text()).toContain('Option2');
  });
});
