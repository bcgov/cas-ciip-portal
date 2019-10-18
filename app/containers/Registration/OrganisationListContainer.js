import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Dropdown, DropdownButton} from 'react-bootstrap';

const OrganisationListContainer = props => {
  const {query} = props;

  // Const query = graphql`
  //   query OrganisationListContainerQuery {
  //     query {
  //       ...OrganisationListContainer_query
  //     }
  //   }
  // `;

  if (query.allOrganisations) {
    const organisations = [...query.allOrganisations.edges];

    return (
      <DropdownButton title="Select Organisation...">
        {organisations.map(org => (
          <Dropdown.Item key={org.node.rowId}>
            {org.node.operatorName}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  }

  return <>Loading</>;
};

export default createFragmentContainer(OrganisationListContainer, {
  query: graphql`
    fragment OrganisationListContainer_query on Query {
      allOrganisations {
        edges {
          node {
            rowId
            operatorName
          }
        }
      }
    }
  `
});
