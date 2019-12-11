import React from 'react';
import {Nav} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import Link from 'next/link';

const ApplicationFormNavbarComponent = props => {
  const {application} = props.query;
  return (
    <div className="nav-guide-container">
      <Nav justify className="nav-guide" variant="pills">
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
            <Nav.Link active={props.confirmationPage}>Summary</Nav.Link>
          </Link>
        </Nav.Item>
        <style jsx global>{`
          .nav-guide-container {
            border: 1px solid #bbb;
            padding: 30px;
            background: #eee;
            border-radius: 6px;
            margin-bottom: 60px;
          }
          .nav-guide.nav-pills {
            border: 1px solid #00336675;
            border-radius: 5px;
          }

          .nav-guide.nav-pills .nav-item {
            display: flex;
            justify-content: center;
            align-items: center;
            background: white;
            border-left: 1px solid #0369;
          }

          .nav-guide.nav-pills .nav-item a {
            color: #036;
          }

          .nav-guide.nav-pills .nav-item a.active {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0;
            background: #036;
            color: white;
          }
        `}</style>
      </Nav>
    </div>
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
      ...ApplicationDetailsContainer_query
        @arguments(applicationId: $applicationId)
    }
  `
});
