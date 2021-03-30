import React from 'react';
import {Alert, Button, Table} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {AllowableProductsTable_query} from '__generated__/AllowableProductsTable_query.graphql';

interface Props {
  query: AllowableProductsTable_query;
}

export const AllowableProductsTableComponent: React.FunctionComponent<Props> = (
  props
) => {
  if (!props.query?.productNaicsCodesByNaicsCodeId.edges.length) {
    return (
      <Alert variant="secondary" id="no-search-results">
        No allowed products have been set for this NAICS code.
      </Alert>
    );
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col" className="centered">
              Mandatory
            </th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {props.query.productNaicsCodesByNaicsCodeId.edges.map((e) => (
            <tr>
              <td>{e.node.productByProductId.productName}</td>
              <td className="centered">
                {e.node.isMandatory ? (
                  <>
                    <FontAwesomeIcon icon={faCheck} />
                    <b> Yes</b>
                  </>
                ) : (
                  'No'
                )}
              </td>
              <td className="centered">
                <Button variant="outline-danger" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <style jsx global>{`
        .table thead th {
          color: white;
          background: #003366;
        }
        .table td.centered,
        .table th.centered {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default createFragmentContainer(AllowableProductsTableComponent, {
  query: graphql`
    fragment AllowableProductsTable_query on NaicsCode {
      productNaicsCodesByNaicsCodeId(first: 2147483647)
        @connection(
          key: "AllowableProductsTable_productNaicsCodesByNaicsCodeId"
        ) {
        edges {
          node {
            productByProductId {
              productName
            }
            isMandatory
          }
        }
      }
    }
  `
});
