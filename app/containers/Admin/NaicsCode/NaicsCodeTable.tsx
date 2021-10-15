import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { graphql, createFragmentContainer, RelayProp } from "react-relay";
import { NaicsCodeTable_query } from "__generated__/NaicsCodeTable_query.graphql";
import NaicsCodeTableRow from "./NaicsCodeTableRow";
import CreateNaicsCodeModal from "components/Admin/CreateNaicsCodeModal";
import createNaicsCodeMutation from "mutations/naics_code/createNaicsCodeMutation";
import withPromiseLoading from "lib/withPromiseLoading";

const LoadingCreateNaicsCodeModal = withPromiseLoading(
  CreateNaicsCodeModal,
  "onSubmit",
  "disabled"
);
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
  const { query } = props;

  const handleClose = () => {
    setShowCreateModal(false);
    setValidated(false);
    setShowActiveCodeError(false);
  };

  const naicsCodeIsActive = (naicsCode) => {
    return query.allNaicsCodes.edges.some(
      (edge) => edge.node.naicsCode === naicsCode
    );
  };

  const handleCreateNaicsCode = async (form: any) => {
    setValidated(true);

    if (naicsCodeIsActive(form[1].value)) setShowActiveCodeError(true);
    else if (form.checkValidity() === true) {
      const { environment } = props.relay;
      const variables = {
        input: {
          naicsCodeInput: form[1].value,
          ciipSectorInput: form[2].value ? form[2].value : null,
          naicsDescriptionInput: form[3].value,
        },
      };

      await createNaicsCodeMutation(environment, variables);
    }
  };

  return (
    <>
      <div style={{ textAlign: "right" }}>
        <Button
          style={{ marginTop: "-100px" }}
          onClick={() => setShowCreateModal(true)}
        >
          New NAICS Code
        </Button>
      </div>
      <LoadingCreateNaicsCodeModal
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
          {query.allNaicsCodes?.edges.map(({ node }) => {
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
        filter: { deletedAt: { isNull: true } }
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
  `,
});
