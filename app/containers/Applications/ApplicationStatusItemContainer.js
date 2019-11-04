import React from 'react';
import {Container, Row, Col, Dropdown} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';
import DropdownMenuItemComponent from '../../components/DropdownMenuItemComponent';

export const ApplicationStatusItem = props => {
  const statusBadgeColor = {
    pending: 'info',
    attention: 'warning',
    declined: 'danger',
    approved: 'success'
  };
  const {applicationStatus} = props;
  return (
    <>
      <Container>
        <Row>
          <Col md={3}>
            <h3>Application Status: </h3>
          </Col>
          <Col md={2}>
            <Dropdown style={{width: '100%'}}>
              <Dropdown.Toggle
                style={{width: '100%', textTransform: 'capitalize'}}
                variant={statusBadgeColor[applicationStatus.applicationStatus]}
                id="dropdown"
              >
                {applicationStatus.applicationStatus}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{width: '100%'}}>
                {Object.keys(statusBadgeColor).map(status => (
                  <DropdownMenuItemComponent
                    key={status}
                    itemEventKey={status}
                    itemFunc={props.setApplicationStatus}
                    itemTitle={status}
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default createFragmentContainer(ApplicationStatusItem, {
  applicationStatus: graphql`
    fragment ApplicationStatusItemContainer_applicationStatus on ApplicationStatus {
      applicationId
      applicationStatus
    }
  `
});
