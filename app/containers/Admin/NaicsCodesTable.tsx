import React from 'react';
import {Table, Button} from 'react-bootstrap';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {NaicsCodesTable_query} from '__generated__/NaicsCodesTable_query.graphql';

interface Props {
  relay: RelayProp;
  query: NaicsCodesTable_query;
}

export const NaicsCodesTableComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {query} = props;
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
          {query.allNaicsCodes.edges.map(({node}) => {
            return (
              <tr key={node.id}>
                <td>{node.naicsCode}</td>
                <td>{node.ciipSector}</td>
                <td>{node.naicsDescription}</td>
                <td>
                  <Button onClick={() => console.log('edit stuff')}>
                    Edit
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default createFragmentContainer(NaicsCodesTableComponent, {
  query: graphql`
    fragment NaicsCodesTable_query on Query {
      allNaicsCodes(
        filter: {deletedAt: {equalTo: null}}
        orderBy: NAICS_CODE_DESC
      ) {
        edges {
          node {
            id
            naicsCode
            ciipSector
            naicsDescription
          }
        }
      }
    }
  `
});
