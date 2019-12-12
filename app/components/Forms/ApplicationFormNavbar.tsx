import React from 'react';
import {Nav} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import Link from 'next/link';
import {ApplicationFormNavbar_application} from 'ApplicationFormNavbar_application.graphql';

interface Props {
  application: ApplicationFormNavbar_application;
  formResultId: string;
  confirmationPage: boolean;
  version: string;
}

const ApplicationFormNavbarComponent: React.FunctionComponent<Props> = props => {
  const {application} = props;
  console.log(application);
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
                  applicationId: application.id,
                  version: props.version
                }
              }}
            >
              <Nav.Link
                active={
                  node.id === props.formResultId && !props.confirmationPage
                }
              >
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
                confirmationPage: true,
                version: props.version
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
  application: graphql`
    fragment ApplicationFormNavbar_application on Application {
      id
      orderedFormResults(versionNumberInput: $version) {
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
  `
});
