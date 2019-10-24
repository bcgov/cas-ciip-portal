import React from 'react';
import {graphql, createRefetchContainer} from 'react-relay';
import {Table, Dropdown, Button} from 'react-bootstrap';
import Organisation from './Organisation';
import UserOrganisation from './UserOrganisation';

const Organisations = props => {
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
    props.relay.refetch();
    props.handleOrgChange(null);
  };

  const cancelClaim = () => {
    props.handleOrgChange(null);
    props.handleContextChange();
    props.handleInputChange('');
  };

  if (!user) {
    return (
      <>
        You are not registered to report for any organisation at this time.
        {props.confirmOrg ? (
          <>
            <h1>Claim {props.orgInput}?</h1>
            <Button onClick={claimOrg}>Confirm</Button>
            <Button variant="danger" onClick={cancelClaim}>
              Cancel
            </Button>
          </>
        ) : (
          <Dropdown>
            <b>Add an Organisation:</b> &nbsp;
            <Dropdown.Toggle
              as="input"
              onChange={changeInput}
            ></Dropdown.Toggle>
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
  }

  return (
    <>
      <Table striped bordered hover style={{textAlign: 'center'}}>
        <thead>
          <tr>
            <th>Organisation</th>
            <th>Access Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {user.userOrganisationsByUserId.edges.map(({node}) => {
            return <UserOrganisation key={node.id} userOrganisation={node} />;
          })}
        </tbody>
      </Table>
      {props.confirmOrg ? (
        <>
          <h1>Claim {props.orgInput}?</h1>
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

export default createRefetchContainer(
  Organisations,
  {
    query: graphql`
      fragment Organisations_query on Query
        @argumentDefinitions(id: {type: "ID!"}) {
        user(id: "WyJ1c2VycyIsMV0=") {
          id
          userOrganisationsByUserId {
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
  },
  graphql`
    query OrganisationsRefetchQuery($id: ID!) {
      query {
        ...Organisations_query @arguments(id: $id)
      }
    }
  `
);
