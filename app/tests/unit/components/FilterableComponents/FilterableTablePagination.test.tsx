import React from 'react';
import {shallow} from 'enzyme';
import {FilterableTablePaginationComponent} from 'components/FilterableComponents/FilterableTablePagination';
import * as nextRouter from 'next/router';

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  route: '/',
  query: {
    pageVars: null
  }
}));

describe('PaginationBar', () => {
  it('should not render the Pagination component if Math.ceil(totalCount / maxResultsPerPage) < 2', async () => {
    const r = shallow(
      <FilterableTablePaginationComponent
        totalCount={5}
        maxResultsPerPage={10}
      />
    );
    expect(r.find('PageItem').exists()).toBe(false);
    expect(r).toMatchSnapshot();
  });
  it('should render the Pagination component if Math.ceil(totalCount / maxResultsPerPage) > 1', async () => {
    const r = shallow(
      <FilterableTablePaginationComponent
        totalCount={25}
        maxResultsPerPage={10}
      />
    );
    expect(r.find('PageItem').exists()).toBe(true);
    expect(r).toMatchSnapshot();
  });
  it('should create a number of pagination buttons equal to Math.ceil(totalCount / maxResultsPerPage)', async () => {
    const r = shallow(
      <FilterableTablePaginationComponent
        totalCount={25}
        maxResultsPerPage={10}
      />
    );
    expect(r.find('PageItem').at(0).text()).toBe('1');
    expect(r.find('PageItem').at(1).text()).toBe('2');
    expect(r.find('PageItem').at(2).text()).toBe('3');
    expect(r.find('PageItem').at(3).exists()).toBe(false);
  });
  it('should render a maximum of 9 pagination pages if Math.ceil(totalCount / maxResultsPerPage) > 9', async () => {
    const r = shallow(
      <FilterableTablePaginationComponent
        totalCount={130}
        maxResultsPerPage={10}
      />
    );
    expect(r.find('PageItem').at(8).text()).toBe('9');
    expect(r.find('PageItem').at(9).exists()).toBe(false);
    expect(r.find('Ellipsis').exists()).toBe(true);
    expect(r).toMatchSnapshot();
  });
});
