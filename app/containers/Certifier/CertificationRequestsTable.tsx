// Import React from 'react';
// import {Table, Button, Alert} from 'react-bootstrap';
// import moment from 'moment-timezone';
// import Link from 'next/link';
// import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
// import {CertificationRequestsTable_query} from '__generated__/CertificationRequestsTable_query.graphql';

// const TIME_ZONE = 'America/Vancouver';

// function formatListViewDate(date) {
//   return date ? moment.tz(date, TIME_ZONE).format('MMM D, YYYY') : '';
// }

// interface Props {
//   relay: RelayProp;
//   query: CertificationRequestsTable_query;
// }

// export const CertificationRequestsTableComponent: React.FunctionComponent<Props> = ({
//   query
// }) => {
//   return query.certificationRequests.edges.length === 0 ? (
//     <Alert variant="info">You have no current certification requests.</Alert>
//   ) : (
//     <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>Facility</th>
//           <th>Organisation</th>
//           <th>Status</th>
//           <th>Certified By</th>
//           <th>Date Certified</th>
//           <th />
//         </tr>
//       </thead>
//       <tbody>
//         {query.certificationRequests.edges.map(({node}) => {
//           const status =
//             node.applicationRevisionByApplicationIdAndVersionNumber
//               .applicationRevisionStatusesByApplicationIdAndVersionNumber
//               .edges[0].node.applicationRevisionStatus;

//           const facility =
//             node.applicationByApplicationId.facilityByFacilityId.facilityName;

//           const organisation =
//             node.applicationByApplicationId.facilityByFacilityId
//               .organisationByOrganisationId.operatorName;

//           const certifierName = node.certifiedBy
//             ? `${node.ciipUserByCertifiedBy.firstName} ${node.ciipUserByCertifiedBy.lastName}`
//             : '';

//           const applicationId = node.applicationByApplicationId.id;
//           const {
//             versionNumber
//           } = node.applicationByApplicationId.latestDraftRevision;

//           return (
//             <tr key={node.id}>
//               <td>{facility}</td>
//               <td>{organisation}</td>
//               <td>{status}</td>
//               <td>{certifierName}</td>
//               <td>{formatListViewDate(node.certifiedAt)}</td>
//               <td>
//                 <Link
//                   href={`/certifier/certify?applicationId=${applicationId}&version=${versionNumber}`}
//                 >
//                   <Button className="w-100">View</Button>
//                 </Link>
//               </td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </Table>
//   );
// };

// export default createFragmentContainer(CertificationRequestsTableComponent, {
//   query: graphql`
//     fragment CertificationRequestsTable_query on CiipUser {
//       certificationRequests {
//         edges {
//           node {
//             id
//             certifiedAt
//             certifiedBy
//             ciipUserByCertifiedBy {
//               firstName
//               lastName
//             }
//             applicationByApplicationId {
//               id
//               latestDraftRevision {
//                 versionNumber
//               }
//               facilityByFacilityId {
//                 facilityName
//                 organisationByOrganisationId {
//                   operatorName
//                 }
//               }
//             }
//             applicationRevisionByApplicationIdAndVersionNumber {
//               applicationRevisionStatusesByApplicationIdAndVersionNumber {
//                 edges {
//                   node {
//                     applicationRevisionStatus
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   `
// });
