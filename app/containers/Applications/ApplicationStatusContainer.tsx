import React from 'react';
import {Row, Col, Dropdown} from 'react-bootstrap';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import DropdownMenuItemComponent from 'components/DropdownMenuItemComponent';
import createApplicationStatusMutation from 'mutations/application/createApplicationStatusMutation';

interface Props {
  applicationStatus;
  applicationRowId;
  relay: RelayProp;
}

const statusBadgeColor = {
  PENDING: 'info',
  DRAFT: 'warning',
  REJECTED: 'danger',
  APPROVED: 'success'
};

export const ApplicationStatusComponent: React.FunctionComponent<Props> = props => {
  // Save Application status to database
  const setApplicationStatus = (eventKey, event) => {
    event.preventDefault();
    event.stopPropagation();
    event.persist();

    const date = new Date().toUTCString();

    const variables = {
      input: {
        applicationStatus: {
          applicationId: props.applicationRowId,
          applicationStatus: eventKey,
          createdAt: date,
          createdBy: 'Admin'
        }
      }
    };
    createApplicationStatusMutation(props.relay.environment, variables);
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <h3>Application Status: </h3>
        </Col>
        <Col md={2}>
          <Dropdown style={{width: '100%'}}>
            <Dropdown.Toggle
              style={{width: '100%', textTransform: 'capitalize'}}
              variant={
                statusBadgeColor[props.applicationStatus.applicationStatus]
              }
              id="dropdown"
            >
              {props.applicationStatus.applicationStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{width: '100%'}}>
              {Object.keys(statusBadgeColor).map(status => (
                <DropdownMenuItemComponent
                  key={status}
                  itemEventKey={status}
                  itemFunc={setApplicationStatus}
                  itemTitle={status}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </>
  );
};

export default createFragmentContainer(ApplicationStatusComponent, {
  applicationStatus: graphql`
    fragment ApplicationStatusContainer_applicationStatus on ApplicationStatus {
      applicationStatus
    }
  `
});
