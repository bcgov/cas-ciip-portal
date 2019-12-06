import React from 'react';
import {Badge} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';
import {CiipApplicationStatus} from 'FacilitiesRowItemContainer_facility.graphql';
// Import Link from 'next/link';

const statusBadgeColor: Record<
  CiipApplicationStatus,
  'info' | 'danger' | 'success' | 'warning' | 'primary' | 'secondary'
> = {
  DRAFT: 'warning',
  PENDING: 'info',
  REJECTED: 'danger',
  APPROVED: 'success',
  CHANGES_SUBMITTED: 'primary',
  REQUESTED_CHANGES: 'secondary'
};
export const FacilitiesRowItem = props => {
  const {facility = {}} = props;
  const {edges} = facility?.applicationsByFacilityId || {};
  const {applicationStatus} = edges?.[0]?.node || {};

  return (
    <tr>
      <td>{facility.facilityName}</td>
      <td>{facility.facilityMailingAddress}</td>
      <td>{facility.facilityPostalCode}</td>
      <td>{facility.facilityCity}</td>
      <td>{facility.facilityProvince}</td>
      <td>
        <Badge
          pill
          style={{width: '100%'}}
          variant={statusBadgeColor[applicationStatus.applicationStatus]}
        >
          {applicationStatus.applicationStatus}
        </Badge>
      </td>
    </tr>
  );
};

export default createFragmentContainer(FacilitiesRowItem, {
  facility: graphql`
    fragment FacilitiesRowItemContainer_facility on Facility {
      facilityName
      facilityMailingAddress
      facilityCity
      facilityProvince
      facilityPostalCode
      hasSwrsReport(reportingYear: "2018")
      applicationsByFacilityId {
        edges {
          node {
            id
            applicationStatus {
              id
              applicationStatus
            }
          }
        }
      }
    }
  `
});
