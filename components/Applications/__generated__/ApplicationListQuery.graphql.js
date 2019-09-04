/**
 * @flow
 * @relayHash 74ac0f92b5720c35eec2d73b33d383a5
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ApplicationListQueryVariables = {||};
export type ApplicationListQueryResponse = {|
  +allApplications: ?{|
    +nodes: $ReadOnlyArray<?{|
      +applicationId: ?number,
      +facilityName: ?string,
      +operatorName: ?string,
      +applicationStatus: ?string,
      +bcghgid: ?string,
      +reportingYear: ?string,
    |}>
  |}
|};
export type ApplicationListQuery = {|
  variables: ApplicationListQueryVariables,
  response: ApplicationListQueryResponse,
|};
*/


/*
query ApplicationListQuery {
  allApplications {
    nodes {
      applicationId
      facilityName
      operatorName
      applicationStatus
      bcghgid
      reportingYear
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "allApplications",
    "storageKey": null,
    "args": null,
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
    "name": "ApplicationListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ApplicationListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ApplicationListQuery",
    "id": null,
    "text": "query ApplicationListQuery {\n  allApplications {\n    nodes {\n      applicationId\n      facilityName\n      operatorName\n      applicationStatus\n      bcghgid\n      reportingYear\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2ff025bf8a1785c3e7719e3e2653e664';
module.exports = node;
