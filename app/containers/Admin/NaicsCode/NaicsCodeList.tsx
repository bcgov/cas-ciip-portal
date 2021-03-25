import React from 'react';
import {ListGroup} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import {NaicsCodeList_query} from '__generated__/NaicsCodeList_query.graphql';

interface Props {
  query: NaicsCodeList_query;
}

export const NaicsCodeListContainer: React.FunctionComponent<Props> = ({
  query
}) => {
  return (
    <ListGroup>
      {query.allNaicsCodes.edges.map((edge) => (
        <ListGroup.Item>{edge.node.naicsCode}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default createFragmentContainer(NaicsCodeListContainer, {
  query: graphql`
    fragment NaicsCodeList_query on Query {
      allNaicsCodes {
        edges {
          node {
            naicsCode
            ciipSector
            naicsDescription
            deletedAt
          }
        }
      }
    }
  `
});
