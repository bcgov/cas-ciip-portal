import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
// Import MathJax from 'react-mathjax2';
import {IncentiveSegmentContainer_incentivePayment} from 'IncentiveSegmentContainer_incentivePayment.graphql';
// Import BenchmarkChart from 'components/Incentives/BenchmarkChart';

interface Props {
  incentivePayment: IncentiveSegmentContainer_incentivePayment;
}

const IncentiveSegmentContainer: React.FunctionComponent<Props> = ({
  incentivePayment
}) => {
  return (
    <tr>
      <td>{incentivePayment.productByProductId.name}</td>
      <td>
        {/* <MathJax.Context input="tex">
          <MathJax.Node>{formula}</MathJax.Node>
        </MathJax.Context> */}
      </td>
      <td>CAD {incentivePayment.incentiveAmount} </td>
      <td>
        {/* <BenchmarkChart
          quantity={Number(reported.quantity)}
          benchmark={benchmark}
          eligibilityThreshold={eligibilityThreshold}
        /> */}
      </td>
      <style jsx>
        {`
          td {
            vertical-align: middle;
          }
        `}
      </style>
    </tr>
  );
};

export default createFragmentContainer(IncentiveSegmentContainer, {
  incentivePayment: graphql`
    fragment IncentiveSegmentContainer_incentivePayment on CiipIncentivePayment {
      id
      incentiveAmount
      emissionIntensity
      productByProductId {
        name
        units
      }
    }
  `
});
