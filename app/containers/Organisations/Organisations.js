import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Table, Dropdown, Button} from 'react-bootstrap';
import Organisation from './Organisation';
import UserOrganisation from './UserOrganisation';

export const Organisations = props => {
  const {user, allOrganisations} = props.query;
  if (!user) return '...Loading';

  const changeInput = event => {
    event.stopPropagation();
    event.preventDefault();
    event.persist();
    props.handleInputChange(event.target.value);
  };

  const selectOrg = (name, id) => {
    props.handleInputChange(name);
    props.handleOrgChange(id);
    props.handleContextChange();
  };

  const claimOrg = async () => {
    props.handleContextChange();
    props.handleInputChange('');
    await props.handleOrgConfirm(props.relay.environment);
    props.handleOrgChange(null);
  };

  const cancelClaim = () => {
    props.handleOrgChange(null);
    props.handleContextChange();
    props.handleInputChange('');
  };

  return (
    <>
      {user.userOrganisationsByUserId.edges.length === 0 ? (
        <>You are not registered to report for any organisation at this time.</>
      ) : (
        <Table striped bordered hover style={{textAlign: 'center'}}>
          <thead>
            <tr>
              <th>Organisation</th>
              <th>Access Status</th>
              <th>Facilities</th>
            </tr>
          </thead>
          <tbody>
            {user.userOrganisationsByUserId.edges.map(({node}) => {
              return <UserOrganisation key={node.id} userOrganisation={node} />;
            })}
          </tbody>
        </Table>
      )}

      {props.confirmOrg ? (
        <>
          <h4>Claim {props.orgInput}?</h4>
          <Button onClick={claimOrg}>Confirm</Button>
          <Button variant="danger" onClick={cancelClaim}>
            Cancel
          </Button>
        </>
      ) : (
        <Dropdown>
          <b>Add an Organisation:</b> &nbsp;
          <Dropdown.Toggle as="input" onChange={changeInput}></Dropdown.Toggle>
          <Dropdown.Menu>
            {allOrganisations.edges.map(({node}) => {
              return (
                <Organisation
                  key={node.id}
                  select
                  organisation={node}
                  orgInput={props.orgInput}
                  selectOrg={selectOrg}
                />
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
};

export default createFragmentContainer(Organisations, {
  query: graphql`
    fragment Organisations_query on Query
      @argumentDefinitions(id: {type: "ID!"}) {
      user(id: "WyJ1c2VycyIsMV0=") {
        id
        userOrganisationsByUserId(first: 2147483647)
          @connection(key: "Organisations_userOrganisationsByUserId") {
          edges {
            node {
              id
              ...UserOrganisation_userOrganisation
            }
          }
        }
      }

      allOrganisations {
        edges {
          node {
            id
            ...Organisation_organisation
          }
        }
      }
    }
  `
});
