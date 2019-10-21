import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Accordion, Dropdown, Button} from 'react-bootstrap';
import Organisation from './Organisation';

const Organisations = props => {
  const {allOrganisations} = props.query;
  if (
    !allOrganisations ||
    !allOrganisations.edges ||
    allOrganisations.edges.length === 0
  ) {
    return (
      <>You are not registered to report for any organisation at this time.</>
    );
  }

  const changeInput = event => {
    event.stopPropagation();
    event.preventDefault();
    event.persist();
    props.handleInputChange(event.target.value);
  };

  const selectOrg = org => {
    props.handleInputChange(org);
    props.handleContextChange();
  };

  const claimOrg = org => {
    console.log(`I CLAIM THIS ${org} ORG IN THE NAME OF GRAGNAR!! RAWR!`);
    props.handleContextChange();
    props.handleInputChange('');
  };

  const cancelClaim = () => {
    props.handleOrgChange(null);
    props.handleContextChange();
    props.handleInputChange('');
  };

  return (
    <>
      <Accordion defaultActiveKey={allOrganisations.edges[0].node.id}>
        {allOrganisations.edges.map(({node}) => {
          return <Organisation key={node.id} organisation={node} />;
        })}
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
      </Accordion>
    </>
  );
};

export default createFragmentContainer(Organisations, {
  query: graphql`
    fragment Organisations_query on Query {
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
