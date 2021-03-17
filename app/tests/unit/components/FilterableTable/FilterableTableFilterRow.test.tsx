import React from 'react';
import FilterableTableFilterRow from 'components/FilterableTable/FilterableTableFilterRow';
import {shallow, mount} from 'enzyme';
import {
  SortOnlyFilter,
  TableFilter,
  TextFilter
} from 'components/FilterableTable/Filters';

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
      rendered.find('Button[variant="outline-secondary"]').first().text()
    ).toBe('Clear');
    expect(rendered.find('Button[variant="primary"]').first().text()).toBe(
      'Apply'
    );
  });

  it('renders as many td elements as search options, plus one for the search buttons', () => {
    const filters: TableFilter[] = [
      new TextFilter('test', 'test'),
      new TextFilter('test2', 'test2')
    ];
    const rendered = mount(
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
      new SortOnlyFilter('test', 'test'),
      new SortOnlyFilter('test2', 'test2'),
      new TextFilter('test3', 'test3')
    ];
    const rendered = mount(
      <FilterableTableFilterRow
        filters={filters}
        onSubmit={jest.fn()}
        filterArgs={{}}
      />
    );

    expect(rendered).toMatchSnapshot();
    expect(rendered.find('input').length).toBe(1);
    expect(rendered.find('input').first().props().name).toBe('test3');
  });

  it('should submit the filters if the "Enter" key is pressed', () => {
    const handleSubmit = jest.fn();
    const filters = [new TextFilter('test', 'test')];
    const rendered = shallow(
      <FilterableTableFilterRow
        filters={filters}
        onSubmit={handleSubmit}
        filterArgs={{}}
      />
    );

    rendered.find('tr').first().simulate('keyDown', {key: 'Enter'});

    expect(handleSubmit).toBeCalledTimes(1);
  });
});
