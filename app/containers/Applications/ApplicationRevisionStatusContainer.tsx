import React from 'react';
import {Row, Col, Dropdown} from 'react-bootstrap';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import DropdownMenuItemComponent from 'components/DropdownMenuItemComponent';
import createApplicationRevisionStatusMutation from 'mutations/application/createApplicationRevisionStatusMutation';

interface Props {
  applicationRevisionStatus;
  applicationRowId;
  relay: RelayProp;
}

const statusBadgeColor = {
  PENDING: 'info',
  DRAFT: 'warning',
  REJECTED: 'danger',
  APPROVED: 'success'
};

export const ApplicationRevisionStatusComponent: React.FunctionComponent<Props> = props => {
  // Save Application status to database
  const setApplicationRevisionStatus = (eventKey, event) => {
    event.preventDefault();
    event.stopPropagation();
    event.persist();

    const date = new Date().toUTCString();

    const variables = {
      input: {
        applicationRevisionStatus: {
          applicationId: props.applicationRowId,
          applicationRevisionStatus: eventKey,
          createdAt: date,
          createdBy: 'Admin'
        }
      }
    };
    createApplicationRevisionStatusMutation(props.relay.environment, variables);
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
                statusBadgeColor[
                  props.applicationRevisionStatus.applicationRevisionStatus
                ]
              }
              id="dropdown"
            >
              {props.applicationRevisionStatus.applicationRevisionStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{width: '100%'}}>
              {Object.keys(statusBadgeColor).map(status => (
                <DropdownMenuItemComponent
                  key={status}
                  itemEventKey={status}
                  itemFunc={setApplicationRevisionStatus}
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

export default createFragmentContainer(ApplicationRevisionStatusComponent, {
  applicationRevisionStatus: graphql`
    fragment ApplicationRevisionStatusContainer_applicationRevisionStatus on ApplicationRevisionStatus {
      applicationRevisionStatus
    }
  `
});
