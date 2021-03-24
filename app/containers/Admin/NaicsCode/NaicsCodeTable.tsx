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
  const {query} = props;

  const handleCreateNaicsCode = async (e: React.SyntheticEvent<any>) => {
    const form = e.currentTarget;
    e.stopPropagation();
    e.preventDefault();
    e.persist();
    setValidated(true);
    if (form.checkValidity === true) {
      const {environment} = props.relay;
      const variables = {
        input: {
          naicsCodeInput: e.target[0].value,
          ciipSectorInput: e.target[1].value ? e.target[1].value : null,
          naicsDescriptionInput: e.target[2].value
        }
      };

      await createNaicsCodeMutation(environment, variables);
      setShowCreateModal(false);
    }
  };

  return (
    <>
      <div style={{textAlign: 'right'}}>
        <Button
          style={{marginTop: '-100px'}}
          onClick={() => setShowCreateModal(true)}
        >
          New Naics Code
        </Button>
      </div>
      <CreateNaicsCodeModal
        validated={validated}
        handleCreateNaicsCode={handleCreateNaicsCode}
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
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
                naicsCode={node}
                connectionId={query.allNaicsCodes.__id}
              />
            );
          })}
        </tbody>
      </Table>
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
            ...NaicsCodeTableRow_naicsCode
          }
        }
      }
    }
  `
});
