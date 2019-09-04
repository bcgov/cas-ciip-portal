/**
 * @flow
 * @relayHash ca816ff73014ed017e311b88673cb0cc
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateProductInput = {|
  clientMutationId?: ?string,
  product: ProductInput,
|};
export type ProductInput = {|
  rowId?: ?number,
  name: string,
  description?: ?string,
  state?: ?string,
  parent?: ?$ReadOnlyArray<?number>,
  createdAt?: ?any,
  createdBy?: ?string,
  deletedAt?: ?any,
  deletedBy?: ?string,
|};
export type ProductRowItemProductMutationVariables = {|
  input: CreateProductInput
|};
export type ProductRowItemProductMutationResponse = {|
  +createProduct: ?{|
    +product: ?{|
      +rowId: number
    |}
  |}
|};
export type ProductRowItemProductMutation = {|
  variables: ProductRowItemProductMutationVariables,
  response: ProductRowItemProductMutationResponse,
|};
*/


/*
mutation ProductRowItemProductMutation(
  $input: CreateProductInput!
) {
  createProduct(input: $input) {
    product {
      rowId
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateProductInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "rowId",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ProductRowItemProductMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createProduct",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateProductPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "product",
            "storageKey": null,
            "args": null,
            "concreteType": "Product",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductRowItemProductMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createProduct",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateProductPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "product",
            "storageKey": null,
            "args": null,
            "concreteType": "Product",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "ProductRowItemProductMutation",
    "id": null,
    "text": "mutation ProductRowItemProductMutation(\n  $input: CreateProductInput!\n) {\n  createProduct(input: $input) {\n    product {\n      rowId\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '12693dd97aefb68d57cfb34f49cd5ef1';
module.exports = node;
