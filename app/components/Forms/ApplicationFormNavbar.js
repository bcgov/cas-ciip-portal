import React from 'react';
import {useRouter} from 'next/router';
import {Nav} from 'react-bootstrap';
import {createFragmentContainer} from 'react-relay';

const ApplicationFormNavbarComponent = props => {
  const router = useRouter();
  const {wizard, setRouterQueryParam} = props;
  return (
    <>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link
            onClick={() =>
              setRouterQueryParam(
                router,
                'formId',
                wizard.edges[0].node.formJsonByFormId.id
              )
            }
          >
            Admin
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() =>
              setRouterQueryParam(
                router,
                'formId',
                wizard.edges[1].node.formJsonByFormId.id
              )
            }
          >
            Emission
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() =>
              setRouterQueryParam(
                router,
                'formId',
                wizard.edges[2].node.formJsonByFormId.id
              )
            }
          >
            Fuel
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() =>
              setRouterQueryParam(
                router,
                'formId',
                wizard.edges[3].node.formJsonByFormId.id
              )
            }
          >
            Electicity & Heat
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() =>
              setRouterQueryParam(
                router,
                'formId',
                wizard.edges[4].node.formJsonByFormId.id
              )
            }
          >
            Production
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setRouterQueryParam(
                router,
                'formId',
                wizard.edges[5].node.formJsonByFormId.id
              );
            }}
          >
            Certifier
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default createFragmentContainer(ApplicationFormNavbarComponent, {});
