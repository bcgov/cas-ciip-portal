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
      facilityApplicationByReportingYear: {
        totalCount: 1,
        edges: [
          {
            node: {
              facilityId: 42,
              ' $fragmentRefs': {
                FacilitiesRowItemContainer_facilityApplication: true
              }
            }
          }
        ]
      },
      defaultDisplayedReportingYear: {
        reportingYear: 2020
      },
      allReportingYears: {
        edges: [
          {
            node: {
              reportingYear: 2019
            }
          },
          {
            node: {
              reportingYear: 2020
            }
          }
        ]
      }
    };
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementationOnce(() => ({
      query: {}
    }));
    const r = shallow(<FacilitiesList query={query} />);
    expect(r).toMatchSnapshot();
  });
});
