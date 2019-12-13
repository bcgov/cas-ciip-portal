import React from 'react';
// Import {Button, Badge} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';
// Import {CiipApplicationRevisionStatus} from 'ApplicationRowItemContainer_applicationSearchResult.graphql';
// Import Link from 'next/link';

// const statusBadgeColor: Record<
//   CiipApplicationRevisionStatus,
//   'info' | 'danger' | 'success' | 'warning' | 'primary' | 'secondary'
// > = {
//   DRAFT: 'warning',
//   PENDING: 'info',
//   REJECTED: 'danger',
//   APPROVED: 'success',
//   CHANGES_SUBMITTED: 'primary',
//   REQUESTED_CHANGES: 'secondary'
// };
export const ApplicationRowItem = props => {
  const {applicationSearchResult = {}} = props;
  console.log(applicationSearchResult);
  return <></>;
  // Return (
  //   <tr>
  //     <td>{application.rowId}</td>
  //     <td>{application.operatorName}</td>
  //     <td>{application.facilityName}</td>
  //     <td>{application.reportingYear}</td>
  //     <td>{application.submissionDate}</td>
  //     <td>
  //       <Badge
  //         pill
  //         style={{width: '100%'}}
  //         variant={statusBadgeColor[application.applicationRevisionStatus]}
  //       >
  //         {application.applicationRevisionStatus}
  //       </Badge>
  //     </td>
  //     <td>
  //       <Link
  //         href={{
  //           pathname: '/application-review',
  //           query: {
  //             applicationId: application.rowId,
  //             applicationGUID: application.applicationByRowId.id,
  //             reportingYear: application.reportingYear,
  //             bcghgid: application.bcghgid
  //           }
  //         }}
  //       >
  //         <Button variant="primary">View Application</Button>
  //       </Link>
  //     </td>
  //   </tr>
  // );
};

export default createFragmentContainer(ApplicationRowItem, {
  applicationSearchResult: graphql`
    fragment ApplicationRowItemContainer_applicationSearchResult on ApplicationSearchResult {
      rowId
      id
      operatorName
      facilityName
      applicationRevisionStatus
      reportingYear
      bcghgid
    }
  `
});
