import React, {useEffect} from 'react';
import {graphql, createRefetchContainer} from 'react-relay';
import {Table, Dropdown, Button} from 'react-bootstrap';
import Organisation from './Organisation';
import UserOrganisation from './UserOrganisation';

const Organisations = props => {
  const {allUserOrganisations, allOrganisations} = props.query;
  console.log(props);

  useEffect(() => {
    const refetchVariables = {
      condition: {userId: Number(props.userId)}
    };
    console.log(refetchVariables);
    props.relay.refetch(refetchVariables, {force: true});
  });

  if (
    (!allUserOrganisations ||
      !allUserOrganisations.edges ||
      allUserOrganisations.edges.length === 0) &&
    (!allOrganisations ||
      !allOrganisations.edges ||
      allOrganisations.edges.length === 0)
  )
    return '...Loading';

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

  const claimOrg = () => {
    props.handleContextChange();
    props.handleInputChange('');
    props.handleOrgConfirm(props.relay.environment);
    props.handleOrgChange(null);
  };

  const cancelClaim = () => {
    props.handleOrgChange(null);
    props.handleContextChange();
    props.handleInputChange('');
  };

  if (
    !allUserOrganisations ||
    !allUserOrganisations.edges ||
    allUserOrganisations.edges.length === 0
  ) {
    return (
      <>
        You are not registered to report for any organisation at this time.
        {props.confirmOrg ? (
          <>
            <h1>Claim {props.orgInput}?</h1>
            <Button onClick={() => claimOrg(props.orgInput)}>Confirm</Button>
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
          {allUserOrganisations.edges.map(({node}) => {
            return <UserOrganisation key={node.id} userOrganisation={node} />;
          })}
        </tbody>
      </Table>
      {props.confirmOrg ? (
        <>
          <h1>Claim {props.orgInput}?</h1>
          <Button onClick={() => claimOrg(props.orgInput)}>Confirm</Button>
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
        @argumentDefinitions(condition: {type: "UserOrganisationCondition"}) {
        allUserOrganisations(condition: $condition) {
          edges {
            node {
              id
              ...UserOrganisation_userOrganisation
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
    query OrganisationsQuery($condition: UserOrganisationCondition!) {
      query {
        ...Organisations_query @arguments(condition: $condition)
      }
    }
  `
);
