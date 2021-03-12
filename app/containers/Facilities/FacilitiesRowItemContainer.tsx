import React from 'react';
import {Badge} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';
import {
  CiipApplicationRevisionStatus,
  FacilitiesRowItemContainer_facilityApplication
} from 'FacilitiesRowItemContainer_facilityApplication.graphql';
import {FacilitiesRowItemContainer_query} from 'FacilitiesRowItemContainer_query.graphql';
import ApplyButtonContainer from 'containers/Applications/ApplyButtonContainer';
import {getUserFriendlyStatusLabel} from 'lib/text-transforms';

interface Props {
  facilityApplication: FacilitiesRowItemContainer_facilityApplication;
  reportingYear: number;
  query: FacilitiesRowItemContainer_query;
}
const statusBadgeColor: Record<
  CiipApplicationRevisionStatus,
  'info' | 'danger' | 'success' | 'warning' | 'primary' | 'secondary'
> = {
  DRAFT: 'warning',
  SUBMITTED: 'info',
  REJECTED: 'danger',
  APPROVED: 'success',
  REQUESTED_CHANGES: 'secondary'
};
export const FacilitiesRowItemComponent: React.FunctionComponent<Props> = ({
  facilityApplication,
  query,
  reportingYear
}) => {
  const {
    applicationStatus,
    applicationId,
    operatorName,
    facilityName,
    facilityType,
    facilityBcghgid,
    lastSwrsReportingYear
  } = facilityApplication;
  const hasCertificationUrl = Boolean(
    facilityApplication?.applicationByApplicationId?.latestDraftRevision
      ?.certificationUrl
  );
  const isCertified = Boolean(
    facilityApplication?.applicationByApplicationId?.latestDraftRevision
      ?.certificationUrl?.certifiedBy
  );

  let certificationStatus = null;

  if (applicationStatus === 'DRAFT' && isCertified)
    certificationStatus = ' (Certified)';
  else if (applicationStatus === 'DRAFT' && hasCertificationUrl)
    certificationStatus = ' (Pending Certification)';

  return (
    <tr>
      <td>{operatorName}</td>
      <td>{facilityName}</td>
      <td>{facilityType}</td>
      <td>{facilityBcghgid}</td>
      <td>{lastSwrsReportingYear}</td>
      <td>
        {' '}
        {applicationStatus ? (
          <Badge
            pill
            style={{width: '100%', textTransform: 'uppercase'}}
            variant={statusBadgeColor[applicationStatus]}
          >
            {getUserFriendlyStatusLabel(applicationStatus)}
            {certificationStatus}
          </Badge>
        ) : (
          <>Application not started</>
        )}
      </td>
      <td>{applicationId}</td>
      <td>
        <ApplyButtonContainer
          applyButtonDetails={facilityApplication}
          reportingYear={reportingYear}
          query={query}
        />
      </td>
    </tr>
  );
};

export default createFragmentContainer(FacilitiesRowItemComponent, {
  facilityApplication: graphql`
    fragment FacilitiesRowItemContainer_facilityApplication on FacilityApplication {
      ...ApplyButtonContainer_applyButtonDetails
      facilityName
      facilityType
      facilityBcghgid
      lastSwrsReportingYear
      applicationId
      applicationStatus
      operatorName
      applicationByApplicationId {
        latestDraftRevision {
          certificationUrl {
            certifiedBy
          }
        }
      }
    }
  `,
  query: graphql`
    fragment FacilitiesRowItemContainer_query on Query {
      ...ApplyButtonContainer_query
    }
  `
});
