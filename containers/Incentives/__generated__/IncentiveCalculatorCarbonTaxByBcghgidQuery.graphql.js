/**
 * @flow
 * @relayHash b49dfa3b598f70d7f7f65434dde46748
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type IncentiveCalculatorCarbonTaxByBcghgidQueryVariables = {|
  bcghgidInput?: ?string,
  reportingYear?: ?string,
|};
export type IncentiveCalculatorCarbonTaxByBcghgidQueryResponse = {|
  +getCarbonTaxByBcghgid: {|
    +nodes: $ReadOnlyArray<?{|
      +reportId: ?number,
      +organisationId: ?number,
      +fuelType: ?string,
      +calculatedCarbonTax: ?any,
    |}>
  |}
|};
export type IncentiveCalculatorCarbonTaxByBcghgidQuery = {|
  variables: IncentiveCalculatorCarbonTaxByBcghgidQueryVariables,
  response: IncentiveCalculatorCarbonTaxByBcghgidQueryResponse,
|};
*/


/*
query IncentiveCalculatorCarbonTaxByBcghgidQuery(
  $bcghgidInput: String
  $reportingYear: String
) {
  getCarbonTaxByBcghgid(bcghgidInput: $bcghgidInput, reportingYear: $reportingYear) {
    nodes {
      reportId
      organisationId
      fuelType
      calculatedCarbonTax
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "bcghgidInput",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "reportingYear",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "getCarbonTaxByBcghgid",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "bcghgidInput",
        "variableName": "bcghgidInput"
      },
      {
        "kind": "Variable",
        "name": "reportingYear",
        "variableName": "reportingYear"
      }
    ],
    "concreteType": "EstimatedCarbonTaxPaidsConnection",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "nodes",
        "storageKey": null,
        "args": null,
        "concreteType": "EstimatedCarbonTaxPaid",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "reportId",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "organisationId",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "fuelType",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "calculatedCarbonTax",
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
    "name": "IncentiveCalculatorCarbonTaxByBcghgidQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "IncentiveCalculatorCarbonTaxByBcghgidQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "IncentiveCalculatorCarbonTaxByBcghgidQuery",
    "id": null,
    "text": "query IncentiveCalculatorCarbonTaxByBcghgidQuery(\n  $bcghgidInput: String\n  $reportingYear: String\n) {\n  getCarbonTaxByBcghgid(bcghgidInput: $bcghgidInput, reportingYear: $reportingYear) {\n    nodes {\n      reportId\n      organisationId\n      fuelType\n      calculatedCarbonTax\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd2153f328392f1489f6f049164183c05';
module.exports = node;
