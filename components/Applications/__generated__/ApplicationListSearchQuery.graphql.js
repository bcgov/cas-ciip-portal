/**
 * @flow
 * @relayHash b09a506a3ee68a21e2069a11ce116211
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
      +bcghgid: ?string,
      +reportingYear: ?string,
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
      bcghgid
      reportingYear
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
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "bcghgid",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "reportingYear",
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
    "text": "query ApplicationListSearchQuery(\n  $searchField: String\n  $searchValue: String\n  $orderByField: String\n  $direction: String\n) {\n  searchApplicationList(searchField: $searchField, searchValue: $searchValue, orderByField: $orderByField, direction: $direction) {\n    nodes {\n      applicationId\n      facilityName\n      operatorName\n      applicationStatus\n      submissionDate\n      bcghgid\n      reportingYear\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3bb8e524785fa9e3de7c8e5608175957';
module.exports = node;
