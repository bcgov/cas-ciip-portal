/**
 * @flow
 * @relayHash cf7be922ce92019d2c2344e26ea0ddda
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ApplicationListSearchQueryVariables = {|
  searchField?: ?string,
  searchValue?: ?string,
  orderByField?: ?string,
  direction?: ?string,
|};
export type ApplicationListSearchQueryResponse = {|
  +searchApplicationList: {|
    +nodes: $ReadOnlyArray<?{|
      +applicationId: ?string,
      +facilityName: ?string,
      +operatorName: ?string,
      +applicationStatus: ?string,
      +submissionDate: ?any,
    |}>
  |}
|};
export type ApplicationListSearchQuery = {|
  variables: ApplicationListSearchQueryVariables,
  response: ApplicationListSearchQueryResponse,
|};
*/


/*
query ApplicationListSearchQuery(
  $searchField: String
  $searchValue: String
  $orderByField: String
  $direction: String
) {
  searchApplicationList(searchField: $searchField, searchValue: $searchValue, orderByField: $orderByField, direction: $direction) {
    nodes {
      applicationId
      facilityName
      operatorName
      applicationStatus
      submissionDate
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "searchField",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "searchValue",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "orderByField",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "direction",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "searchApplicationList",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "direction",
        "variableName": "direction"
      },
      {
        "kind": "Variable",
        "name": "orderByField",
        "variableName": "orderByField"
      },
      {
        "kind": "Variable",
        "name": "searchField",
        "variableName": "searchField"
      },
      {
        "kind": "Variable",
        "name": "searchValue",
        "variableName": "searchValue"
      }
    ],
    "concreteType": "ApplicationsConnection",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "nodes",
        "storageKey": null,
        "args": null,
        "concreteType": "Application",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "applicationId",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "facilityName",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "operatorName",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "applicationStatus",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "submissionDate",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ApplicationListSearchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ApplicationListSearchQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ApplicationListSearchQuery",
    "id": null,
    "text": "query ApplicationListSearchQuery(\n  $searchField: String\n  $searchValue: String\n  $orderByField: String\n  $direction: String\n) {\n  searchApplicationList(searchField: $searchField, searchValue: $searchValue, orderByField: $orderByField, direction: $direction) {\n    nodes {\n      applicationId\n      facilityName\n      operatorName\n      applicationStatus\n      submissionDate\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c065fdd2db599ce64d6b26f94e08ea36';
module.exports = node;
