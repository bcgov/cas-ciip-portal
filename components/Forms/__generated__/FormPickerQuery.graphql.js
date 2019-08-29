/**
 * @flow
 * @relayHash b4f0114cc0ae0e4d587b92e69c4be2ef
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type FormPickerQueryVariables = {||};
export type FormPickerQueryResponse = {|
  +allFormJsons: ?{|
    +nodes: $ReadOnlyArray<?{|
      +rowId: number,
      +name: string,
      +formJson: any,
    |}>
  |}
|};
export type FormPickerQuery = {|
  variables: FormPickerQueryVariables,
  response: FormPickerQueryResponse,
|};
*/


/*
query FormPickerQuery {
  allFormJsons {
    nodes {
      rowId
      name
      formJson
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "rowId",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "formJson",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FormPickerQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "allFormJsons",
        "storageKey": null,
        "args": null,
        "concreteType": "FormJsonsConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "nodes",
            "storageKey": null,
            "args": null,
            "concreteType": "FormJson",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "FormPickerQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "allFormJsons",
        "storageKey": null,
        "args": null,
        "concreteType": "FormJsonsConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "nodes",
            "storageKey": null,
            "args": null,
            "concreteType": "FormJson",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
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
    "operationKind": "query",
    "name": "FormPickerQuery",
    "id": null,
    "text": "query FormPickerQuery {\n  allFormJsons {\n    nodes {\n      rowId\n      name\n      formJson\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f463eb54bc743f79e84165ac36a5575d';
module.exports = node;
