import React, {useState} from 'react';
import {Dropdown, Button, Badge, Modal} from 'react-bootstrap';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import DropdownMenuItemComponent from 'components/DropdownMenuItemComponent';
import createApplicationRevisionStatusMutation from 'mutations/application/createApplicationRevisionStatusMutation';
import {CiipApplicationRevisionStatus} from 'createApplicationRevisionStatusMutation.graphql';
import {getUserFriendlyStatusLabel} from 'lib/text-transforms';

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
      {confirmStatusChangeModal}
      {isCurrentVersion ? (
        <Dropdown
          as="span"
          style={{width: '100%', fontSize: '1rem', marginLeft: '2rem'}}
        >
          <Dropdown.Toggle
            pill
            as={Badge}
            style={{
              padding: '0.6em 1em',
              fontSize: '1em',
              textTransform: 'uppercase'
            }}
            variant={
              statusBadgeColor[
                props.applicationRevisionStatus.applicationRevisionStatus
              ]
            }
            id="dropdown"
          >
            {getUserFriendlyStatusLabel(
              props.applicationRevisionStatus.applicationRevisionStatus
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{width: '100%'}}>
            {Object.keys(statusBadgeColor)
              .filter(
                (status) => !['DRAFT', currentRevisionStatus].includes(status)
              )
              .map((status) => (
                <DropdownMenuItemComponent
                  key={status}
                  itemEventKey={status}
                  itemFunc={renderStatusConfirmationModal}
                  itemTitle={getUserFriendlyStatusLabel(status)}
                />
              ))}
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          disabled
          variant={
            statusBadgeColor[
              props.applicationRevisionStatus.applicationRevisionStatus
            ]
          }
          style={{fontSize: '1rem', marginLeft: '2rem'}}
        >
          {props.applicationRevisionStatus.applicationRevisionStatus}
        </Button>
      )}
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
