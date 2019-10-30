import React from 'react';
import {Nav} from 'react-bootstrap';
import {createFragmentContainer} from 'react-relay';
import Link from 'next/link';

const ApplicationFormNavbarComponent = props => {
  const {wizard, application} = props;
  return (
    <>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        {wizard.edges.map(({node}) => (
          <Nav.Item key={node.formJsonByFormId.id}>
            <Link
              passHref
              href={{
                pathname: '/ciip-application',
                query: {
                  formId: node.formJsonByFormId.id,
                  applicationId: application.id
                }
              }}
            >
              <Nav.Link>{node.formJsonByFormId.name}</Nav.Link>
            </Link>
          </Nav.Item>
        ))}
      </Nav>
    </>
  );
};

export default createFragmentContainer(ApplicationFormNavbarComponent, {});
