/**
 * @flow
 * @relayHash fc662458f045a37f71df63c5f02f3f6f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type FormLoaderQueryVariables = {|
  rowId: number
|};
export type FormLoaderQueryResponse = {|
  +formJsonByRowId: ?{|
    +id: string,
    +name: string,
    +formJson: any,
  |}
|};
export type FormLoaderQuery = {|
  variables: FormLoaderQueryVariables,
  response: FormLoaderQueryResponse,
|};
*/


/*
query FormLoaderQuery(
  $rowId: Int!
) {
  formJsonByRowId(rowId: $rowId) {
    id
    name
    formJson
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "rowId",
    "type": "Int!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "formJsonByRowId",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "rowId",
        "variableName": "rowId"
      }
    ],
    "concreteType": "FormJson",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "name",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "formJson",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FormLoaderQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "FormLoaderQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "FormLoaderQuery",
    "id": null,
    "text": "query FormLoaderQuery(\n  $rowId: Int!\n) {\n  formJsonByRowId(rowId: $rowId) {\n    id\n    name\n    formJson\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8e0ff20013735a06e5a00d1b36b35038';
module.exports = node;
