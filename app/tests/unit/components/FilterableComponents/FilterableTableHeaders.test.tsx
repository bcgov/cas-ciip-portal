import React from 'react';
import FilterableTableHeaders from 'components/FilterableComponents/FilterableTableHeaders';
import {shallow} from 'enzyme';
import {ISearchOption} from 'components/Search/ISearchOption';
import * as nextRouter from 'next/router';

const createMockSearchOption: (name: string) => ISearchOption = (name) => {
  return {
    columnName: name,
    title: name,
    isSearchEnabled: true,
    isSortEnabled: true
  };
};

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  route: '/',
  query: {
    relayVars: {},
    pageVars: {}
  }
}));

describe('The filterable table headers component', () => {
  it('renders search and reset buttons', () => {
    const rendered = shallow(<FilterableTableHeaders searchOptions={[]} />);
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
    const searchOptions: ISearchOption[] = [
      createMockSearchOption('test'),
      createMockSearchOption('test2')
    ];
    const rendered = shallow(
      <FilterableTableHeaders searchOptions={searchOptions} />
    );

    expect(rendered).toMatchSnapshot();
    expect(rendered.find('td').length).toBe(3);
  });

  it('only renders elements that are searchable', () => {
    const searchOptions = [
      {...createMockSearchOption('test'), isSearchEnabled: false},
      {...createMockSearchOption('test2'), isSearchEnabled: false},
      {...createMockSearchOption('test3'), isSearchEnabled: true}
    ];
    const rendered = shallow(
      <FilterableTableHeaders searchOptions={searchOptions} />
    );

    expect(rendered).toMatchSnapshot();
    expect(rendered.find('FormControl').length).toBe(1);
    expect(rendered.find('FormControl').first().props().name).toBe('test3');
  });

  it('renders a text input if values are not provided', () => {
    const searchOptions = [createMockSearchOption('test')];
    const rendered = shallow(
      <FilterableTableHeaders searchOptions={searchOptions} />
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
    const searchOptions: ISearchOption[] = [
      {
        ...createMockSearchOption('test'),
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
      <FilterableTableHeaders searchOptions={searchOptions} />
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
