import React from 'react';
import {shallow} from 'enzyme';
import {FacilitiesRowItemContainer_facilitySearchResult} from 'FacilitiesRowItemContainer_facilitySearchResult.graphql';
import {FacilitiesRowItemContainer_query} from 'FacilitiesRowItemContainer_query.graphql';
import {FacilitiesRowItemComponent} from 'containers/Facilities/FacilitiesRowItemContainer';

describe('FacilitiesRowItem', () => {
  it('should match the previous snapshot', async () => {
    const facilitySearchResult: FacilitiesRowItemContainer_facilitySearchResult = {
      ' $fragmentRefs': {
        ApplyButtonContainer_applyButtonDetails: true
      },
      ' $refType': 'FacilitiesRowItemContainer_facilitySearchResult',
      facilityName: 'fac',
      facilityType: 'EIO',
      facilityBcghgid: '123',
      lastSwrsReportingYear: 2019,
      applicationRevisionStatus: 'SUBMITTED',
      organisationName: 'org',
      applicationByApplicationId: {
        latestDraftRevision: {
          certificationUrl: {
            __typename: 'certificationUrl'
          }
        }
      }
    };
    const query: FacilitiesRowItemContainer_query = {
      ' $fragmentRefs': {
        ApplyButtonContainer_query: true
      },
      ' $refType': 'FacilitiesRowItemContainer_query'
    };

    const r = shallow(
      <FacilitiesRowItemComponent
        facilitySearchResult={facilitySearchResult}
        query={query}
        reportingYear={2019}
      />
    );
    expect(r).toMatchSnapshot();
  });

  it('should show Pending Certification in the status if the application is in draft and a certificationUrl exists', async () => {
    const facilitySearchResult: FacilitiesRowItemContainer_facilitySearchResult = {
      ' $fragmentRefs': {
        ApplyButtonContainer_applyButtonDetails: true
      },
      ' $refType': 'FacilitiesRowItemContainer_facilitySearchResult',
      facilityName: 'fac',
      facilityType: 'EIO',
      facilityBcghgid: '123',
      lastSwrsReportingYear: 2019,
      applicationRevisionStatus: 'DRAFT',
      organisationName: 'org',
      applicationByApplicationId: {
        latestDraftRevision: {
          certificationUrl: {
            __typename: 'certificationUrl'
          }
        }
      }
    };
    const query: FacilitiesRowItemContainer_query = {
      ' $fragmentRefs': {
        ApplyButtonContainer_query: true
      },
      ' $refType': 'FacilitiesRowItemContainer_query'
    };

    const r = shallow(
      <FacilitiesRowItemComponent
        facilitySearchResult={facilitySearchResult}
        query={query}
        reportingYear={2019}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('Badge').text()).toBe('DRAFT (Pending Certification)');
  });

  it('should not show Pending Certification in the status if the application is in draft but a certificationUrl does not exist', async () => {
    const facilitySearchResult: FacilitiesRowItemContainer_facilitySearchResult = {
      ' $fragmentRefs': {
        ApplyButtonContainer_applyButtonDetails: true
      },
      ' $refType': 'FacilitiesRowItemContainer_facilitySearchResult',
      facilityName: 'fac',
      facilityType: 'EIO',
      facilityBcghgid: '123',
      lastSwrsReportingYear: 2019,
      applicationRevisionStatus: 'DRAFT',
      organisationName: 'org',
      applicationByApplicationId: {
        latestDraftRevision: {
          certificationUrl: null
        }
      }
    };
    const query: FacilitiesRowItemContainer_query = {
      ' $fragmentRefs': {
        ApplyButtonContainer_query: true
      },
      ' $refType': 'FacilitiesRowItemContainer_query'
    };

    const r = shallow(
      <FacilitiesRowItemComponent
        facilitySearchResult={facilitySearchResult}
        query={query}
        reportingYear={2019}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('Badge').text()).toBe('DRAFT');
  });

  it('should not show Pending Certification in the status if the application is not in draft state and a certificationUrl exists', async () => {
    const facilitySearchResult: FacilitiesRowItemContainer_facilitySearchResult = {
      ' $fragmentRefs': {
        ApplyButtonContainer_applyButtonDetails: true
      },
      ' $refType': 'FacilitiesRowItemContainer_facilitySearchResult',
      facilityName: 'fac',
      facilityType: 'EIO',
      facilityBcghgid: '123',
      lastSwrsReportingYear: 2019,
      applicationRevisionStatus: 'APPROVED',
      organisationName: 'org',
      applicationByApplicationId: {
        latestDraftRevision: {
          certificationUrl: {
            __typename: 'certificationUrl'
          }
        }
      }
    };
    const query: FacilitiesRowItemContainer_query = {
      ' $fragmentRefs': {
        ApplyButtonContainer_query: true
      },
      ' $refType': 'FacilitiesRowItemContainer_query'
    };

    const r = shallow(
      <FacilitiesRowItemComponent
        facilitySearchResult={facilitySearchResult}
        query={query}
        reportingYear={2019}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('Badge').text()).toBe('APPROVED');
  });
});
