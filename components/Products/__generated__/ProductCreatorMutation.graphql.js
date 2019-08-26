/**
 * @flow
 * @relayHash b55daf1d94a0cb06faf8284286098172
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
|};
export type ProductCreatorMutationVariables = {|
  input: CreateProductInput
|};
export type ProductCreatorMutationResponse = {|
  +createProduct: ?{|
    +product: ?{|
      +rowId: number
    |}
  |}
|};
export type ProductCreatorMutation = {|
  variables: ProductCreatorMutationVariables,
  response: ProductCreatorMutationResponse,
|};
*/


/*
mutation ProductCreatorMutation(
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
    "name": "ProductCreatorMutation",
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
    "name": "ProductCreatorMutation",
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
    "name": "ProductCreatorMutation",
    "id": null,
    "text": "mutation ProductCreatorMutation(\n  $input: CreateProductInput!\n) {\n  createProduct(input: $input) {\n    product {\n      rowId\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '21bc6575bcab2bbe4a71a1742c02ffa9';
module.exports = node;
