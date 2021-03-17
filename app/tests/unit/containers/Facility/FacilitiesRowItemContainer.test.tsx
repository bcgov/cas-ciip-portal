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
      applicationId: 42
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
    expect(r.find('Badge').text()).toBe('Submitted');
  });

  it('should show Draft in the status if the application is in draft', async () => {
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
      applicationId: 42
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

  it('should show approved in the status if the application is approved', async () => {
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
      applicationId: 42
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
