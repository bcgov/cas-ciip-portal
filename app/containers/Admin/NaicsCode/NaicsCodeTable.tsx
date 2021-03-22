import React from 'react';
import {Table, Button} from 'react-bootstrap';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {NaicsCodeTable_query} from '__generated__/NaicsCodeTable_query.graphql';
import NaicsCodeTableRow from './NaicsCodeTableRow';

interface Props {
  relay: RelayProp;
  query: NaicsCodeTable_query;
}

export const NaicsCodeTableContainer: React.FunctionComponent<Props> = (
  props
) => {
  const {query} = props;
  console.log(query.allNaicsCodes?.edges);
  return (
    <>
      <div style={{textAlign: 'right'}}>
        <Button
          style={{marginTop: '-100px'}}
          // onClick={() => setDialogMode('create')}
        >
          New Naics Code
        </Button>
      </div>
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
            return <NaicsCodeTableRow naicsCode={node} />;
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
        filter: {deletedAt: {isNull: true}}
        orderBy: NAICS_CODE_DESC
      ) {
        edges {
          node {
            ...NaicsCodeTableRow_naicsCode
          }
        }
      }
    }
  `
});
