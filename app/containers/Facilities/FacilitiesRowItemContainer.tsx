import React from 'react';
import {Badge} from 'react-bootstrap';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {
  CiipApplicationStatus,
  FacilitiesRowItemContainer_facilityApplicationStatus
} from 'FacilitiesRowItemContainer_facilityApplicationStatus.graphql';
// Import {useRouter} from 'next/router';
// import Link from 'next/link';
// import createApplicationMutation from 'mutations/application/createApplicationMutation';
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
  // Const {facilityByFacilityId} = facilityApplicationStatus;
  // const {hasSwrsReport} = facilityByFacilityId;
  // const {rowId} = facilityByFacilityId;
  // const {environment} = props.relay;
  // const router = useRouter();
  // const {applicationId} = facilityApplicationStatus;
  const {applicationStatus} = facilityApplicationStatus;
  // Const startApplication = async () => {
  //   const variables = {
  //     input: {
  //       facilityIdInput: rowId
  //     }
  //   };
  //   const response = await createApplicationMutation(environment, variables);
  //   console.log(response);
  //   router.push({
  //     pathname: hasSwrsReport
  //       ? '/ciip-application-swrs-import'
  //       : '/ciip-application',
  //     query: {
  //       applicationId: response.createApplicationMutationChain.application.id
  //     }
  //   });
  // };

  // const applyButton = () => {
  //   if (!applicationId) {
  //     return (
  //       <Button variant="primary" onClick={startApplication}>
  //         Apply for CIIP for this facility
  //       </Button>
  //     );
  //   }

  //   if (
  //     applicationId &&
  //     facilityApplicationStatus.applicationStatus === 'DRAFT'
  //   ) {
  //     return (
  //       <Link
  //         href={{
  //           pathname: '/ciip-application',
  //           query: {
  //             applicationId
  //           }
  //         }}
  //       >
  //         <Button variant="primary">Resume CIIP application</Button>
  //       </Link>
  //     );
  //   }

  //   if (
  //     applicationId &&
  //     facilityApplicationStatus.applicationStatus === 'PENDING'
  //   ) {
  //     return (
  //       <Link
  //         href={{
  //           pathname: '/view-application',
  //           query: {
  //             applicationId
  //           }
  //         }}
  //       >
  //         <Button variant="primary">View Submitted Application</Button>
  //       </Link>
  //     );
  //   }

  //   return null;
  // };

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
