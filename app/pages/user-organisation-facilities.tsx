// Import React, {Component} from 'react';
// import {graphql} from 'react-relay';
// import {userOrganisationFacilitiesQueryResponse} from 'userOrganisationFacilitiesQuery.graphql';
// import SearchTable from '../components/SearchTable';
// import DefaultLayout from '../layouts/default-layout';
// import OrganisationFacilities from '../containers/Organisations/OrganisationFacilities';

// interface Props {
//   query: userOrganisationFacilitiesQueryResponse['query'];
// }
// export default class UserOrganisationFacilities extends Component<Props> {
//   static query = graphql`
//     query userOrganisationFacilitiesQuery(
//       $organisationId: ID!
//       $organisationRowId: String
//       $orderByField: String
//       $direction: String
//       $searchField: String
//       $searchValue: String
//     ) {
//       query {
//         ...OrganisationFacilities_query
//           @arguments(
//             organisationRowId: $organisationRowId
//             orderByField: $orderByField
//             direction: $direction
//             searchField: $searchField
//             searchValue: $searchValue
//           )
//         session {
//           ...defaultLayout_session
//         }
//         organisation(id: $organisationId) {
//           operatorName
//         }
//       }
//     }
//   `;

//   static async getInitialProps() {
//     return {
//       variables: {
//         orderByField: 'facility_name',
//         direction: 'ASC'
//       }
//     };
//   }

//   render() {
//     const {organisation, session} = this.props.query;
//     const orgTitle = `Facilities for ${organisation.operatorName} `;
//     return (
//       <DefaultLayout showSubheader session={session} title={orgTitle}>
//         <SearchTable
//           query={this.props.query}
//           defaultOrderByField="facility_name"
//           defaultOrderByDisplay="Facility Name"
//         >
//           {props => <OrganisationFacilities {...props} />}
//         </SearchTable>
//       </DefaultLayout>
//     );
//   }
// }
