import React from 'react';
import {Nav} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import Link from 'next/link';

const ApplicationFormNavbarComponent = props => {
  const {application} = props.query;
  return (
    <Nav justify variant="pills" style={{marginBottom: '2rem'}}>
      {application.orderedFormResults.edges.map(({node}) => (
        <Nav.Item key={node.id}>
          <Link
            passHref
            href={{
              pathname: '/ciip-application',
              query: {
                formResultId: node.id,
                applicationId: application.id
              }
            }}
          >
            <Nav.Link active={node.id === props.formResultId}>
              {node.formJsonByFormId.name}
            </Nav.Link>
          </Link>
        </Nav.Item>
      ))}
      <Nav.Item key="submit">
        <Link
          passHref
          href={{
            pathname: '/ciip-application',
            query: {
              applicationId: application.id,
              confirmationPage: true
            }
          }}
        >
          <Nav.Link>Summary</Nav.Link>
        </Link>
      </Nav.Item>
    </Nav>
  );
};

export default createFragmentContainer(ApplicationFormNavbarComponent, {
  query: graphql`
    fragment ApplicationFormNavbar_query on Query
      @argumentDefinitions(
        formResultId: {type: "ID!"}
        applicationId: {type: "ID!"}
      ) {
      application(id: $applicationId) {
        id
        orderedFormResults {
          edges {
            node {
              id
              formJsonByFormId {
                name
              }
            }
          }
        }
      }
      ...ApplicationWizardConfirmation_query
        @arguments(applicationId: $applicationId)
    }
  `
});
