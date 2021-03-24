import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {NaicsCodeTableRow_naicsCode} from '__generated__/NaicsCodeTableRow_naicsCode.graphql';
import updateNaicsCodeMutation from 'mutations/naics_code/updateNaicsCodeMutation';
import {nowMoment} from 'functions/formatDates';

interface Props {
  relay: RelayProp;
  naicsCode: NaicsCodeTableRow_naicsCode;
  connectionId: string;
}

export const NaicsCodeTableRowContainer: React.FunctionComponent<Props> = (
  props
) => {
  const {naicsCode, connectionId} = props;
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDeleteNaicsCode = async () => {
    const {environment} = props.relay;
    const variables = {
      input: {
        id: naicsCode.id,
        naicsCodePatch: {
          naicsCode: naicsCode.naicsCode,
          ciipSector: naicsCode.ciipSector,
          naicsDescription: naicsCode.naicsDescription,
          deletedAt: nowMoment().format('YYYY-MM-DDTHH:mm:ss')
        }
      }
    };
    await updateNaicsCodeMutation(environment, variables, connectionId);
  };

  const confirmationModal = (
    <Modal
      centered
      size="sm"
      show={showConfirmModal}
      onHide={() => setShowConfirmModal(false)}
      aria-modal="true"
    >
      <Modal.Header closeButton>
        <Modal.Title style={{margin: 'auto'}}>Delete NAICS Code</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{textAlign: 'center'}}>
        <Button onClick={handleDeleteNaicsCode} variant="danger">
          Confirm Delete
        </Button>
      </Modal.Body>
    </Modal>
  );

  return (
    <>
      {confirmationModal}
      <tr>
        <td>{naicsCode.naicsCode}</td>
        <td>{naicsCode.ciipSector}</td>
        <td>{naicsCode.naicsDescription}</td>
        <td style={{textAlign: 'center'}}>
          <Button
            variant="outline-danger"
            onClick={() => setShowConfirmModal(true)}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};

export default createFragmentContainer(NaicsCodeTableRowContainer, {
  naicsCode: graphql`
    fragment NaicsCodeTableRow_naicsCode on NaicsCode {
      id
      naicsCode
      ciipSector
      naicsDescription
      deletedAt
    }
  `
});
