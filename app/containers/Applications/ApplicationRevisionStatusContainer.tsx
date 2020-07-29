import React, {useState} from 'react';
import {Row, Col, Dropdown, Button, Modal} from 'react-bootstrap';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import DropdownMenuItemComponent from 'components/DropdownMenuItemComponent';
import createApplicationRevisionStatusMutation from 'mutations/application/createApplicationRevisionStatusMutation';
import {CiipApplicationRevisionStatus} from 'ApplicationRowItemContainer_applicationSearchResult.graphql';

interface Props {
  applicationRevisionStatus;
  applicationRowId;
  relay: RelayProp;
}

const statusBadgeColor: Record<
  CiipApplicationRevisionStatus,
  'info' | 'danger' | 'success' | 'warning' | 'primary' | 'secondary'
> = {
  DRAFT: 'warning',
  SUBMITTED: 'info',
  REJECTED: 'danger',
  APPROVED: 'success',
  REQUESTED_CHANGES: 'secondary'
};

export const ApplicationRevisionStatusComponent: React.FunctionComponent<Props> = (
  props
) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [currentRevisionStatus, setCurrentRevisionStatus] = useState(
    props.applicationRevisionStatus.applicationRevisionStatus
  );

  // Save Application status to database
  const setApplicationRevisionStatus = async (
    status: CiipApplicationRevisionStatus
  ) => {
    const variables = {
      input: {
        applicationRevisionStatus: {
          applicationId: props.applicationRowId,
          applicationRevisionStatus: status,
          versionNumber: props.applicationRevisionStatus.versionNumber
        }
      },
      version: props.applicationRevisionStatus.versionNumber.toString()
    };
    const response = await createApplicationRevisionStatusMutation(
      props.relay.environment,
      variables
    );
    console.log(response);
  };

  const handleConfirm = async () => {
    setShowConfirmationModal(false);
    await setApplicationRevisionStatus(currentRevisionStatus);
  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
    setCurrentRevisionStatus(
      props.applicationRevisionStatus.applicationRevisionStatus
    );
  };

  const renderStatusConfirmationModal = (
    eventKey: CiipApplicationRevisionStatus
  ) => {
    setCurrentRevisionStatus(eventKey);
    setShowConfirmationModal(true);
  };

  const confirmStatusChangeModal = (
    <Modal
      show={showConfirmationModal}
      onHide={() => setShowConfirmationModal(false)}
    >
      <Modal.Header>
        <Modal.Title>Confirm Status Change</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Changing this status will result in an email being sent to the
          reporter notifying them that their application status has been
          changed.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const {
    isCurrentVersion
  } = props.applicationRevisionStatus.applicationRevisionByApplicationIdAndVersionNumber;

  return (
    <>
      <Row>
        <Col md={3}>
          <h3>Application Status*: </h3>
        </Col>
        {confirmStatusChangeModal}
        {isCurrentVersion ? (
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
                {Object.keys(statusBadgeColor)
                  .filter(
                    (status) =>
                      !['DRAFT', currentRevisionStatus].includes(status)
                  )
                  .map((status) => (
                    <DropdownMenuItemComponent
                      key={status}
                      itemEventKey={status}
                      itemFunc={renderStatusConfirmationModal}
                      itemTitle={status}
                    />
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        ) : (
          <Col md={2}>
            <Button
              disabled
              variant={
                statusBadgeColor[
                  props.applicationRevisionStatus.applicationRevisionStatus
                ]
              }
            >
              {props.applicationRevisionStatus.applicationRevisionStatus}
            </Button>
          </Col>
        )}
      </Row>
      <Row>
        <Col md={12}>
          <p>
            * Status changes will be immediately confirmed by email
            notification.
          </p>
        </Col>
      </Row>
    </>
  );
};

export default createFragmentContainer(ApplicationRevisionStatusComponent, {
  applicationRevisionStatus: graphql`
    fragment ApplicationRevisionStatusContainer_applicationRevisionStatus on ApplicationRevisionStatus {
      applicationRevisionStatus
      versionNumber
      applicationRevisionByApplicationIdAndVersionNumber {
        isCurrentVersion
      }
    }
  `
});
