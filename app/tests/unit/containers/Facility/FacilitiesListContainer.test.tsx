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
      allReportingYears: {
        edges: []
      },
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
        selectedReportingYear={new Date().getFullYear() - 1}
      />
    );
    expect(r).toMatchSnapshot();
  });
});
