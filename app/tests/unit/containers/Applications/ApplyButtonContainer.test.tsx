import React from 'react';
import {shallow} from 'enzyme';
import {ApplyButton} from 'containers/Applications/ApplyButtonContainer';

describe('The apply button', () => {
  it('should render an Apply For CIIP button if no applicationByApplicationId exists and the application window is open', () => {
    const r = shallow(
      <ApplyButton
        relay={null}
        applyButtonDetails={{
          ' $refType': 'ApplyButtonContainer_applyButtonDetails',
          applicationByApplicationId: null,
          applicationRevisionStatus: null,
          facilityByFacilityId: {
            rowId: 1,
            hasSwrsReport: true
          }
        }}
        query={{
          ' $refType': 'ApplyButtonContainer_query',
          openedReportingYear: {
            reportingYear: 2018
          }
        }}
      />
    );

    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').at(2).text()).toBe(
      'Apply for CIIP for this facility'
    );
  });

  it('should render a warning modal if no swrs report exists', () => {
    const r = shallow(
      <ApplyButton
        relay={null}
        applyButtonDetails={{
          ' $refType': 'ApplyButtonContainer_applyButtonDetails',
          applicationByApplicationId: null,
          applicationRevisionStatus: null,
          facilityByFacilityId: {
            rowId: 1,
            hasSwrsReport: false
          }
        }}
        query={{
          ' $refType': 'ApplyButtonContainer_query',
          openedReportingYear: {
            reportingYear: 2018
          }
        }}
      />
    );

    expect(r).toMatchSnapshot();
    expect(r.exists('ModalTitle')).toBe(true);
    expect(r.find('ModalTitle').text()).toBe(
      'Attention: Missing Emissions Report'
    );
  });

  it('should render a disabled button if no applicationByApplicationId exists and the application window is closed', () => {
    const r = shallow(
      <ApplyButton
        relay={null}
        applyButtonDetails={{
          ' $refType': 'ApplyButtonContainer_applyButtonDetails',
          applicationByApplicationId: null,
          applicationRevisionStatus: null,
          facilityByFacilityId: {
            rowId: 1,
            hasSwrsReport: true
          }
        }}
        query={{
          ' $refType': 'ApplyButtonContainer_query',
          openedReportingYear: null
        }}
      />
    );

    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').prop('disabled')).toBe(true);
    expect(r.find('Button').text()).toBe('The application window is closed');
  });

  it('should render a Resume Application button if an application revision exists with draft status and the application window is open', () => {
    const r = shallow(
      <ApplyButton
        relay={null}
        applyButtonDetails={{
          ' $refType': 'ApplyButtonContainer_applyButtonDetails',
          applicationByApplicationId: {
            id: 'foo',
            latestDraftRevision: {
              id: 'bar',
              legalDisclaimerAccepted: false,
              versionNumber: 1
            },
            latestSubmittedRevision: null
          },
          applicationRevisionStatus: 'DRAFT',
          facilityByFacilityId: {
            rowId: 1,
            hasSwrsReport: true
          }
        }}
        query={{
          ' $refType': 'ApplyButtonContainer_query',
          openedReportingYear: {
            reportingYear: 2018
          }
        }}
      />
    );

    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').text()).toBe('Resume CIIP application');
  });

  it('should render a disabled button if an application revision exists with draft status and the application window is closed', () => {
    const r = shallow(
      <ApplyButton
        relay={null}
        applyButtonDetails={{
          ' $refType': 'ApplyButtonContainer_applyButtonDetails',
          applicationByApplicationId: {
            id: 'foo',
            latestDraftRevision: {
              id: 'bar',
              legalDisclaimerAccepted: false,
              versionNumber: 1
            },
            latestSubmittedRevision: null
          },
          applicationRevisionStatus: 'DRAFT',
          facilityByFacilityId: {
            rowId: 1,
            hasSwrsReport: true
          }
        }}
        query={{
          ' $refType': 'ApplyButtonContainer_query',
          openedReportingYear: null
        }}
      />
    );

    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').prop('disabled')).toBe(true);
    expect(r.find('Button').text()).toBe('The application window is closed');
  });

  it('should render a View Application button if an application revision exists with submitted status', () => {
    const r = shallow(
      <ApplyButton
        relay={null}
        applyButtonDetails={{
          ' $refType': 'ApplyButtonContainer_applyButtonDetails',
          applicationByApplicationId: {
            id: 'foo',
            latestDraftRevision: {
              id: 'bar',
              legalDisclaimerAccepted: false,
              versionNumber: 1
            },
            latestSubmittedRevision: {
              id: 'bar',
              versionNumber: 1
            }
          },
          applicationRevisionStatus: 'SUBMITTED',
          facilityByFacilityId: {
            rowId: 1,
            hasSwrsReport: true
          }
        }}
        query={{
          ' $refType': 'ApplyButtonContainer_query',
          openedReportingYear: null
        }}
      />
    );

    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').text()).toBe('View Submitted Application');
  });

  it('should render a View Application button if an application revision exists with approved status', () => {
    const r = shallow(
      <ApplyButton
        relay={null}
        applyButtonDetails={{
          ' $refType': 'ApplyButtonContainer_applyButtonDetails',
          applicationByApplicationId: {
            id: 'foo',
            latestDraftRevision: {
              id: 'bar',
              legalDisclaimerAccepted: false,
              versionNumber: 1
            },
            latestSubmittedRevision: {
              id: 'bar',
              versionNumber: 1
            }
          },
          applicationRevisionStatus: 'APPROVED',
          facilityByFacilityId: {
            rowId: 1,
            hasSwrsReport: true
          }
        }}
        query={{
          ' $refType': 'ApplyButtonContainer_query',
          openedReportingYear: null
        }}
      />
    );

    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').text()).toBe('View Submitted Application');
  });

  it('should render a View Application button if an application revision exists with rejected status', () => {
    const r = shallow(
      <ApplyButton
        relay={null}
        applyButtonDetails={{
          ' $refType': 'ApplyButtonContainer_applyButtonDetails',
          applicationByApplicationId: {
            id: 'foo',
            latestDraftRevision: {
              id: 'bar',
              legalDisclaimerAccepted: false,
              versionNumber: 1
            },
            latestSubmittedRevision: {
              id: 'bar',
              versionNumber: 1
            }
          },
          applicationRevisionStatus: 'REJECTED',
          facilityByFacilityId: {
            rowId: 1,
            hasSwrsReport: true
          }
        }}
        query={{
          ' $refType': 'ApplyButtonContainer_query',
          openedReportingYear: null
        }}
      />
    );

    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').text()).toBe('View Submitted Application');
  });

  it('should render a View Application button if an application revision exists with requested changes status', () => {
    const r = shallow(
      <ApplyButton
        relay={null}
        applyButtonDetails={{
          ' $refType': 'ApplyButtonContainer_applyButtonDetails',
          applicationByApplicationId: {
            id: 'foo',
            latestDraftRevision: {
              id: 'bar',
              legalDisclaimerAccepted: false,
              versionNumber: 1
            },
            latestSubmittedRevision: {
              id: 'bar',
              versionNumber: 1
            }
          },
          applicationRevisionStatus: 'REQUESTED_CHANGES',
          facilityByFacilityId: {
            rowId: 1,
            hasSwrsReport: true
          }
        }}
        query={{
          ' $refType': 'ApplyButtonContainer_query',
          openedReportingYear: null
        }}
      />
    );

    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').text()).toBe('View Submitted Application');
  });
});
