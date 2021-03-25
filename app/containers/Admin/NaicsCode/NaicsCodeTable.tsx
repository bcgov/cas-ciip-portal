import React, {useState} from 'react';
import {Table, Button} from 'react-bootstrap';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {NaicsCodeTable_query} from '__generated__/NaicsCodeTable_query.graphql';
import NaicsCodeTableRow from './NaicsCodeTableRow';
import CreateNaicsCodeModal from 'components/Admin/CreateNaicsCodeModal';
import createNaicsCodeMutation from 'mutations/naics_code/createNaicsCodeMutation';

interface Props {
  relay: RelayProp;
  query: NaicsCodeTable_query;
}

export const NaicsCodeTableContainer: React.FunctionComponent<Props> = (
  props
) => {
  const [validated, setValidated] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showActiveCodeError, setShowActiveCodeError] = useState(false);
  const {query} = props;

  const handleClose = () => {
    setShowCreateModal(false);
    setValidated(false);
    setShowActiveCodeError(false);
  };

  const naicsCodeIsActive = (naicsCode) => {
    let codeExists = false;
    query.allNaicsCodes.edges.forEach((edge) => {
      if (edge.node.naicsCode === naicsCode) {
        codeExists = true;
      }
    });
    return codeExists;
  };

  const handleCreateNaicsCode = async (e: React.SyntheticEvent<any>) => {
    const form = e.currentTarget;
    e.stopPropagation();
    e.preventDefault();
    e.persist();

    if (naicsCodeIsActive(e.target[0].value)) setShowActiveCodeError(true);
    else if (form.checkValidity() === true) {
      setValidated(true);
      const {environment} = props.relay;
      const variables = {
        input: {
          naicsCodeInput: e.target[0].value,
          ciipSectorInput: e.target[1].value ? e.target[1].value : null,
          naicsDescriptionInput: e.target[2].value
        }
      };
      try {
        await createNaicsCodeMutation(environment, variables);
      } catch (e) {
        console.error(e);
      }
      handleClose();
    }
  };

  return (
    <>
      <div style={{textAlign: 'right'}}>
        <Button
          style={{marginTop: '-100px'}}
          onClick={() => setShowCreateModal(true)}
        >
          New NAICS Code
        </Button>
      </div>
      <CreateNaicsCodeModal
        validated={validated}
        onSubmit={handleCreateNaicsCode}
        show={showCreateModal}
        onClose={() => handleClose()}
        showActiveCodeError={showActiveCodeError}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">NAICS Code</th>
            <th scope="col">CIIP Sector</th>
            <th scope="col">NAICS Description</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {query.allNaicsCodes?.edges.map(({node}) => {
            return (
              <NaicsCodeTableRow
                key={node.id}
                naicsCode={node}
                connectionId={query.allNaicsCodes.__id}
              />
            );
          })}
        </tbody>
      </Table>
      <style jsx global>{`
        .table thead th {
          color: white;
          background: #003366;
        }
      `}</style>
    </>
  );
};

export default createFragmentContainer(NaicsCodeTableContainer, {
  query: graphql`
    fragment NaicsCodeTable_query on Query {
      allNaicsCodes(
        first: 2147483647
        filter: {deletedAt: {isNull: true}}
        orderBy: NAICS_CODE_ASC
      ) @connection(key: "NaicsCodeTableContainer_allNaicsCodes", filters: []) {
        __id
        edges {
          node {
            id
            naicsCode
            ...NaicsCodeTableRow_naicsCode
          }
        }
      }
    }
  `
});
