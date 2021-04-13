import React from 'react';
import {Nav} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import Link from 'next/link';
import {ApplicationFormNavbar_applicationRevision} from 'ApplicationFormNavbar_applicationRevision.graphql';
import ApplicationPage from 'pages/reporter/application/[applicationId]';

interface Props {
  applicationRevision: ApplicationFormNavbar_applicationRevision;
  selectedFormId: string;
  confirmationPage: boolean;
}

const ApplicationFormNavbarComponent: React.FunctionComponent<Props> = ({
  applicationRevision,
  selectedFormId,
  confirmationPage
}) => {
  return (
    <div className="nav-guide-container">
      <Nav justify className="nav-guide" variant="pills">
        {applicationRevision.orderedFormResults.edges.map(({node}) => (
          <Nav.Item key={node.id}>
            <Link
              passHref
              href={ApplicationPage.getRoute(
                applicationRevision.applicationByApplicationId.id,
                node.formJsonByFormId.id
              )}
            >
              <Nav.Link active={node.id === selectedFormId}>
                {node.formJsonByFormId.name}{' '}
              </Nav.Link>
            </Link>
          </Nav.Item>
        ))}
        <Nav.Item key="submit">
          <Link
            passHref
            href={ApplicationPage.getRoute(
              applicationRevision.applicationByApplicationId.id,
              undefined,
              true
            )}
          >
            <Nav.Link active={confirmationPage}>Summary</Nav.Link>
          </Link>
        </Nav.Item>
        <style jsx global>{`
          .nav-guide-container {
            border: 1px solid #bbb;
            padding: 30px;
            background: #eee;
            border-radius: 6px;
            margin-bottom: 36px;
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
  applicationRevision: graphql`
    fragment ApplicationFormNavbar_applicationRevision on ApplicationRevision {
      applicationByApplicationId {
        id
      }
      orderedFormResults {
        edges {
          node {
            id
            formJsonByFormId {
              id
              name
            }
          }
        }
      }
    }
  `
});
