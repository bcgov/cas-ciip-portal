import React from 'react';
import {Badge} from 'react-bootstrap';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {
  CiipApplicationStatus,
  FacilitiesRowItemContainer_facilitySearchResult
} from 'FacilitiesRowItemContainer_facilitySearchResult.graphql';
import ApplyButton from '../../components/ApplyButton';
interface Props {
  relay: RelayProp;
  facilitySearchResult: FacilitiesRowItemContainer_facilitySearchResult;
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
  const {facilitySearchResult} = props;
  const {applicationStatus} = facilitySearchResult;

  return (
    <tr>
      <td>{facilitySearchResult.organisationName}</td>
      <td>{facilitySearchResult.facilityName}</td>
      <td>{facilitySearchResult.facilityMailingAddress}</td>
      <td>{facilitySearchResult.facilityPostalCode}</td>
      <td>{facilitySearchResult.facilityCity}</td>
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
        <ApplyButton applyButtonDetails={props.facilitySearchResult} />
      </td>
    </tr>
  );
};

export default createFragmentContainer(FacilitiesRowItemComponent, {
  facilitySearchResult: graphql`
    fragment FacilitiesRowItemContainer_facilitySearchResult on FacilitySearchResult {
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
