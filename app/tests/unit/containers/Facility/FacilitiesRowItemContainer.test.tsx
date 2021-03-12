import React from 'react';
import {shallow} from 'enzyme';
import {FacilitiesRowItemContainer_facilityApplication} from 'FacilitiesRowItemContainer_facilityApplication.graphql';
import {FacilitiesRowItemContainer_query} from 'FacilitiesRowItemContainer_query.graphql';
import {FacilitiesRowItemComponent} from 'containers/Facilities/FacilitiesRowItemContainer';

describe('FacilitiesRowItem', () => {
  it('should match the previous snapshot', async () => {
    const facilityApplication: FacilitiesRowItemContainer_facilityApplication = {
      ' $fragmentRefs': {
        ApplyButtonContainer_applyButtonDetails: true
      },
      ' $refType': 'FacilitiesRowItemContainer_facilityApplication',
      facilityName: 'fac',
      facilityType: 'EIO',
      facilityBcghgid: '123',
      lastSwrsReportingYear: 2019,
      applicationStatus: 'SUBMITTED',
      operatorName: 'org',
      applicationId: 42,
      applicationByApplicationId: {
        latestDraftRevision: {
          certificationUrl: {
            certifiedBy: 1
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
        facilityApplication={facilityApplication}
        query={query}
        reportingYear={2019}
      />
    );
    expect(r).toMatchSnapshot();
  });

  it('should show Pending Certification in the status if the application is in draft and a certificationUrl exists', async () => {
    const facilityApplication: FacilitiesRowItemContainer_facilityApplication = {
      ' $fragmentRefs': {
        ApplyButtonContainer_applyButtonDetails: true
      },
      ' $refType': 'FacilitiesRowItemContainer_facilityApplication',
      facilityName: 'fac',
      facilityType: 'EIO',
      facilityBcghgid: '123',
      lastSwrsReportingYear: 2019,
      applicationStatus: 'DRAFT',
      operatorName: 'org',
      applicationId: 42,
      applicationByApplicationId: {
        latestDraftRevision: {
          certificationUrl: {
            certifiedBy: null
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
        facilityApplication={facilityApplication}
        query={query}
        reportingYear={2019}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('Badge').text()).toBe('Draft (Pending Certification)');
  });

  it('should show Certified in the status if the application is in draft and has been certified', async () => {
    const facilityApplication: FacilitiesRowItemContainer_facilityApplication = {
      ' $fragmentRefs': {
        ApplyButtonContainer_applyButtonDetails: true
      },
      ' $refType': 'FacilitiesRowItemContainer_facilityApplication',
      facilityName: 'fac',
      facilityType: 'EIO',
      facilityBcghgid: '123',
      lastSwrsReportingYear: 2019,
      applicationStatus: 'DRAFT',
      operatorName: 'org',
      applicationId: 42,
      applicationByApplicationId: {
        latestDraftRevision: {
          certificationUrl: {
            certifiedBy: 1
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
        facilityApplication={facilityApplication}
        query={query}
        reportingYear={2019}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('Badge').text()).toBe('Draft (Certified)');
  });

  it('should not show Pending Certification in the status if the application is in draft but a certificationUrl does not exist', async () => {
    const facilityApplication: FacilitiesRowItemContainer_facilityApplication = {
      ' $fragmentRefs': {
        ApplyButtonContainer_applyButtonDetails: true
      },
      ' $refType': 'FacilitiesRowItemContainer_facilityApplication',
      facilityName: 'fac',
      facilityType: 'EIO',
      facilityBcghgid: '123',
      lastSwrsReportingYear: 2019,
      applicationStatus: 'DRAFT',
      operatorName: 'org',
      applicationId: 42,
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
        facilityApplication={facilityApplication}
        query={query}
        reportingYear={2019}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('Badge').text()).toBe('Draft');
  });

  it('should not show Pending Certification in the status if the application is not in draft state and a certificationUrl exists', async () => {
    const facilityApplication: FacilitiesRowItemContainer_facilityApplication = {
      ' $fragmentRefs': {
        ApplyButtonContainer_applyButtonDetails: true
      },
      ' $refType': 'FacilitiesRowItemContainer_facilityApplication',
      facilityName: 'fac',
      facilityType: 'EIO',
      facilityBcghgid: '123',
      lastSwrsReportingYear: 2019,
      applicationStatus: 'APPROVED',
      operatorName: 'org',
      applicationId: 42,
      applicationByApplicationId: {
        latestDraftRevision: {
          certificationUrl: {
            certifiedBy: null
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
        facilityApplication={facilityApplication}
        query={query}
        reportingYear={2019}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('Badge').text()).toBe('Approved');
  });
});
