import React from 'react';
import {Badge} from 'react-bootstrap';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {
  CiipApplicationStatus,
  FacilitiesRowItemContainer_facilityApplicationStatus
} from 'FacilitiesRowItemContainer_facilityApplicationStatus.graphql';
import ApplyButton from '../../components/ApplyButton';
interface Props {
  relay: RelayProp;
  facilityApplicationStatus: FacilitiesRowItemContainer_facilityApplicationStatus;
  key: number;
}
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
export const FacilitiesRowItemComponent: React.FunctionComponent<Props> = props => {
  const {facilityApplicationStatus} = props;
  const {applicationStatus} = facilityApplicationStatus;

  return (
    <tr>
      <td>{facilityApplicationStatus.organisationName}</td>
      <td>{facilityApplicationStatus.facilityName}</td>
      <td>{facilityApplicationStatus.facilityMailingAddress}</td>
      <td>{facilityApplicationStatus.facilityPostalCode}</td>
      <td>{facilityApplicationStatus.facilityCity}</td>
      <td>
        {' '}
        {applicationStatus ? (
          <>
            <Badge
              pill
              style={{width: '100%'}}
              variant={statusBadgeColor[applicationStatus]}
            >
              {applicationStatus}
            </Badge>
          </>
        ) : (
          <>Application not started</>
        )}
      </td>
      <td>
        <ApplyButton applyButtonDetails={props.facilityApplicationStatus} />
      </td>
    </tr>
  );
};

export default createFragmentContainer(FacilitiesRowItemComponent, {
  facilityApplicationStatus: graphql`
    fragment FacilitiesRowItemContainer_facilityApplicationStatus on FacilityApplicationStatus {
      ...ApplyButton_applyButtonDetails
      facilityName
      facilityMailingAddress
      facilityCity
      facilityPostalCode
      applicationStatus
      organisationName
    }
  `
});
