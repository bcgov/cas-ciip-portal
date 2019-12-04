import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {CardDeck} from 'react-bootstrap';
// Import SortableTableHeader from 'components/SortableTableHeader';
// import SearchBox from 'components/SearchBox';
import LoadingSpinner from '../../components/LoadingSpinner';
import Facility from './Facility';

export const OrganisationFacilitiesComponent = props => {
  // Const {
  //   searchDisplay,
  //   direction,
  //   orderByField,
  //   searchField,
  //   searchValue,
  //   handleEvent
  // } = props;
  // useEffect(() => {
  //   const refetchVariables = {
  //     searchField,
  //     searchValue,
  //     orderByField,
  //     direction
  //   };
  //   props.relay.refetch(refetchVariables);
  // });
  // const tableHeaders = [
  //   {columnName: 'facility_name', displayName: 'Facility Name'},
  //   {columnName: 'address', displayName: 'Address'},
  //   {columnName: 'application_status', displayName: 'Status'}
  // ];
  // const dropdownSortItems = ['Facility Name', 'Address', 'Status'];
  // const displayNameToColumnNameMap = {
  //   'Facility Name': 'facility_name',
  //   Address: 'address',
  //   Status: 'application_status'
  // };

  const {organisation} = props.query;
  if (!organisation) return <LoadingSpinner />;

  return (
    <>
      <CardDeck>
        {organisation.facilitiesByOrganisationId.edges.map(({node}) => {
          return <Facility key={node.id} facility={node} />;
        })}
      </CardDeck>
    </>
  );
};

export default createFragmentContainer(OrganisationFacilitiesComponent, {
  query: graphql`
    fragment OrganisationFacilities_query on Query
      @argumentDefinitions(id: {type: "ID!"}) {
      organisation(id: $organisationId) {
        id
        facilitiesByOrganisationId(first: 2147483647)
          @connection(key: "organisation_facilitiesByOrganisationId") {
          edges {
            node {
              id
              ...Facility_facility
            }
          }
        }
      }
    }
  `
});
