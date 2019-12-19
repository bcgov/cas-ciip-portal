import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import MathJax from 'react-mathjax2';
import {IncentiveSegmentContainer_incentivePayment} from 'IncentiveSegmentContainer_incentivePayment.graphql';
import BenchmarkChart from 'components/Incentives/BenchmarkChart';

interface Props {
  incentivePayment: IncentiveSegmentContainer_incentivePayment;
}

const IncentiveSegmentContainer: React.FunctionComponent<Props> = ({
  incentivePayment
}) => {
  const {
    benchmark,
    eligibilityThreshold
  } = incentivePayment.benchmarkByBenchmarkId;

  const formula = `
  1 - \\left({ ${incentivePayment.emissionIntensity} - ${benchmark}
    \\over
    ${eligibilityThreshold} - ${benchmark}
  }\\right) \\times ${incentivePayment.carbonTaxEligibleFlat}`;

  return (
    <tr>
      <td>{incentivePayment.productByProductId.name}</td>
      <td>
        <MathJax.Context input="tex">
          <MathJax.Node>{formula}</MathJax.Node>
        </MathJax.Context>
      </td>
      <td>CAD {incentivePayment.incentiveAmountProRated} </td>
      <td>CAD {incentivePayment.incentiveAmountFlat} </td>
      <td>
        <BenchmarkChart
          emissionIntensity={incentivePayment.emissionIntensity}
          benchmark={benchmark}
          eligibilityThreshold={eligibilityThreshold}
        />
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
      incentiveAmountFlat
      incentiveAmountProRated
      emissionIntensity
      carbonTaxEligibleFlat
      productByProductId {
        name
      }
      benchmarkByBenchmarkId {
        benchmark
        eligibilityThreshold
      }
    }
  `
});
