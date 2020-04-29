import React from 'react';
import {shallow} from 'enzyme';
import {FacilitiesListContainer_query} from 'FacilitiesListContainer_query.graphql';
import {FacilitiesList} from 'containers/Facilities/FacilitiesListContainer';

describe('FacilitiesListContainer', () => {
  it('should match the previous snapshot', async () => {
    const query: FacilitiesListContainer_query = {
      ' $fragmentRefs': {
        FacilitiesRowItemContainer_query: true
      },
      ' $refType': 'FacilitiesListContainer_query',
      searchAllFacilities: {
        edges: [
          {
            node: {
              rowId: 1,
              totalFacilityCount: 1,
              ' $fragmentRefs ': {
                FacilitiesRowItemContainer_facilitySearchResult: true
              }
            }
          }
        ]
      },
      allFacilities: {totalCount: 20},
      organisation: {id: 'abc', rowId: 1}
    };
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementationOnce(() => ({
      query: {}
    }));
    const r = shallow(
      <FacilitiesList
        query={query}
        relay={null}
        direction="asc"
        orderByField="id"
        searchField={null}
        searchValue={null}
        offsetValue={1}
        handleEvent={jest.fn()}
      />
    );
    expect(r).toMatchSnapshot();
  });
  it('should render the Pagination component if > 10 facilities (totalFacilityCount > 10)', async () => {
    const query: FacilitiesListContainer_query = {
      ' $fragmentRefs': {
        FacilitiesRowItemContainer_query: true
      },
      ' $refType': 'FacilitiesListContainer_query',
      searchAllFacilities: {
        edges: [
          {
            node: {
              rowId: 1,
              totalFacilityCount: 25,
              ' $fragmentRefs ': {
                FacilitiesRowItemContainer_facilitySearchResult: true
              }
            }
          }
        ]
      },
      allFacilities: {totalCount: 20},
      organisation: {id: 'abc', rowId: 1}
    };
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementationOnce(() => ({
      query: {}
    }));
    const r = shallow(
      <FacilitiesList
        query={query}
        relay={null}
        direction="asc"
        orderByField="id"
        searchField={null}
        searchValue={null}
        offsetValue={1}
        handleEvent={jest.fn()}
      />
    );
    expect(r.find('PageItem').exists()).toBe(true);
    expect(r).toMatchSnapshot();
  });
  it('should create Math.ceil(totalFacilityCount / 10) pagination buttons (25 facilities = 3 index buttons)', async () => {
    const query: FacilitiesListContainer_query = {
      ' $fragmentRefs': {
        FacilitiesRowItemContainer_query: true
      },
      ' $refType': 'FacilitiesListContainer_query',
      searchAllFacilities: {
        edges: [
          {
            node: {
              rowId: 1,
              totalFacilityCount: 25,
              ' $fragmentRefs ': {
                FacilitiesRowItemContainer_facilitySearchResult: true
              }
            }
          }
        ]
      },
      allFacilities: {totalCount: 20},
      organisation: {id: 'abc', rowId: 1}
    };
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementationOnce(() => ({
      query: {}
    }));
    const r = shallow(
      <FacilitiesList
        query={query}
        relay={null}
        direction="asc"
        orderByField="id"
        searchField={null}
        searchValue={null}
        offsetValue={1}
        handleEvent={jest.fn()}
      />
    );
    expect(r.find('PageItem').at(0).text()).toBe('1');
    expect(r.find('PageItem').at(1).text()).toBe('2');
    expect(r.find('PageItem').at(2).text()).toBe('3');
    expect(r.find('PageItem').at(3).exists()).toBe(false);
  });
  it('should not render the Pagination component if < 10 facilities (totalFacilityCount < 10)', async () => {
    const query: FacilitiesListContainer_query = {
      ' $fragmentRefs': {
        FacilitiesRowItemContainer_query: true
      },
      ' $refType': 'FacilitiesListContainer_query',
      searchAllFacilities: {
        edges: [
          {
            node: {
              rowId: 1,
              totalFacilityCount: 5,
              ' $fragmentRefs ': {
                FacilitiesRowItemContainer_facilitySearchResult: true
              }
            }
          }
        ]
      },
      allFacilities: {totalCount: 20},
      organisation: {id: 'abc', rowId: 1}
    };
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementationOnce(() => ({
      query: {}
    }));
    const r = shallow(
      <FacilitiesList
        query={query}
        relay={null}
        direction="asc"
        orderByField="id"
        searchField={null}
        searchValue={null}
        offsetValue={1}
        handleEvent={jest.fn()}
      />
    );
    expect(r.find('PageItem').exists()).toBe(false);
    expect(r).toMatchSnapshot();
  });
  it('should render a maximum of 9 pagination pages if there are > 9 possible pages ( totalFacilityCount > 90)', async () => {
    const query: FacilitiesListContainer_query = {
      ' $fragmentRefs': {
        FacilitiesRowItemContainer_query: true
      },
      ' $refType': 'FacilitiesListContainer_query',
      searchAllFacilities: {
        edges: [
          {
            node: {
              rowId: 1,
              totalFacilityCount: 200,
              ' $fragmentRefs ': {
                FacilitiesRowItemContainer_facilitySearchResult: true
              }
            }
          }
        ]
      },
      allFacilities: {totalCount: 20},
      organisation: {id: 'abc', rowId: 1}
    };
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementationOnce(() => ({
      query: {}
    }));
    const r = shallow(
      <FacilitiesList
        query={query}
        relay={null}
        direction="asc"
        orderByField="id"
        searchField={null}
        searchValue={null}
        offsetValue={1}
        handleEvent={jest.fn()}
      />
    );
    expect(r.find('PageItem').at(8).text()).toBe('9');
    expect(r.find('PageItem').at(9).exists()).toBe(false);
    expect(r.find('Ellipsis').exists()).toBe(true);
    expect(r).toMatchSnapshot();
  });
});
