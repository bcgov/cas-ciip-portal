/**
 * @flow
 * @relayHash 93f2cf30011fdc175ff34b5d61fbbc76
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UpdateProductByRowIdInput = {|
  clientMutationId?: ?string,
  productPatch: ProductPatch,
  rowId: number,
|};
export type ProductPatch = {|
  rowId?: ?number,
  name?: ?string,
  description?: ?string,
  state?: ?string,
  parent?: ?$ReadOnlyArray<?number>,
  createdAt?: ?any,
  createdBy?: ?string,
  deletedAt?: ?any,
  deletedBy?: ?string,
|};
export type ProductRowItemUpdateProductMutationVariables = {|
  input: UpdateProductByRowIdInput
|};
export type ProductRowItemUpdateProductMutationResponse = {|
  +updateProductByRowId: ?{|
    +product: ?{|
      +rowId: number
    |}
  |}
|};
export type ProductRowItemUpdateProductMutation = {|
  variables: ProductRowItemUpdateProductMutationVariables,
  response: ProductRowItemUpdateProductMutationResponse,
|};
*/


/*
mutation ProductRowItemUpdateProductMutation(
  $input: UpdateProductByRowIdInput!
) {
  updateProductByRowId(input: $input) {
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
    "type": "UpdateProductByRowIdInput!",
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
    "name": "ProductRowItemUpdateProductMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateProductByRowId",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateProductPayload",
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
    "name": "ProductRowItemUpdateProductMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateProductByRowId",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateProductPayload",
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
    "name": "ProductRowItemUpdateProductMutation",
    "id": null,
    "text": "mutation ProductRowItemUpdateProductMutation(\n  $input: UpdateProductByRowIdInput!\n) {\n  updateProductByRowId(input: $input) {\n    product {\n      rowId\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b90e512f60b5176ac9012fd712849b03';
module.exports = node;
