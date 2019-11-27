import React from 'react';
import {shallow} from 'enzyme';
import {FacilityComponent} from 'containers/Organisations/Facility';

describe('Facility', () => {
  let facility;
  beforeEach(() => {
    facility = {
      facilityName: 'f',
      facilityMailingAddress: '123',
      facilityCity: 'Vic',
      facilityProvince: 'BC',
      facilityPostalCode: '123abc',
      rowId: 1,

      organisationByOrganisationId: {
        operatorName: 'org'
      },

      applicationsByFacilityId: {
        edges: [
          {
            node: {
              id: 'id',
              applicationStatus: {
                id: 'ids',
                applicationStatus: 'pending'
              }
            }
          }
        ]
      }
    };
  });
  it('should render a Facility', async () => {
    const r = shallow(
      <FacilityComponent relay={{environment: {}}} facility={facility} />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('CardHeader').text()).toMatch(/Facility Name/);
  });

  it('should render a View Submitted App button if an applicationID exists and is not in draft status', async () => {
    const r = shallow(
      <FacilityComponent relay={{environment: {}}} facility={facility} />
    );
    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toEqual(true);

    expect(
      r
        .find('Button')
        .parent()
        .is('Link')
    ).toBe(true);
    expect(
      r
        .find('Button')
        .parent()
        .prop('href')
    ).toMatchObject({
      pathname: '/view-application',
      query: {applicationId: 'id'}
    });
  });

  it('should render a Resume Application button if an applicationID exists && has a draft status', async () => {
    facility.applicationsByFacilityId.edges[0].node.applicationStatus.applicationStatus =
      'draft';
    const r = shallow(
      <FacilityComponent relay={{environment: {}}} facility={facility} />
    );
    expect(r).toMatchSnapshot();
    expect(
      r
        .find('Button')
        .parent()
        .is('Link')
    ).toBe(true);

    expect(
      r
        .find('Button')
        .parent()
        .prop('href')
    ).toMatchObject({
      pathname: '/ciip-application',
      query: {applicationId: 'id'}
    });
  });

  it('should render an Apply For CIIP button if no applicationID exists', async () => {
    facility.applicationsByFacilityId = {};
    const r = shallow(
      <FacilityComponent relay={{environment: {}}} facility={facility} />
    );
    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').text()).toContain('Apply');
  });
});
