import getConfig from 'next/config';
import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import MathJax from 'react-mathjax2';
import {IncentiveSegmentContainer_ciipIncentiveByProduct} from 'IncentiveSegmentContainer_ciipIncentiveByProduct.graphql';
import BenchmarkChart from 'components/Incentives/BenchmarkChart';

interface Props {
  ciipIncentiveByProduct: IncentiveSegmentContainer_ciipIncentiveByProduct;
}

const IncentiveSegmentContainer: React.FunctionComponent<Props> = ({
  ciipIncentiveByProduct
}) => {
  const {
    benchmark,
    eligibilityThreshold,
    incentiveRatio,
    incentiveMultiplier,
    paymentAllocationFactor,
    carbonTax
  } = ciipIncentiveByProduct;

  // Const formula = `
  // 1 - \\left({ ${ciipIncentiveByProduct.emissionIntensity} - ${benchmark}
  //   \\over
  //   ${eligibilityThreshold} - ${benchmark}
  // }\\right) \\times ${ciipIncentiveByProduct.carbonTax}`;

  console.log(
    incentiveRatio,
    incentiveMultiplier,
    paymentAllocationFactor,
    carbonTax
  );

  const formula = `
  ${incentiveRatio} \\times ${incentiveMultiplier}
  \\times \\left({ ${paymentAllocationFactor}} \\over 100 \\right)
  \\times ${carbonTax}`;

  return (
    <tr>
      <td>{ciipIncentiveByProduct.productName}</td>
      <td>
        {process.env.NO_MATHJAX ||
        getConfig()?.publicRuntimeConfig.NO_MATHJAX ? null : (
          <MathJax.Context input="tex">
            <MathJax.Node>{formula}</MathJax.Node>
          </MathJax.Context>
        )}
      </td>
      <td>CAD {ciipIncentiveByProduct.incentiveProduct} </td>
      <td>
        <BenchmarkChart
          emissionIntensity={Number(incentiveRatio)}
          benchmark={Number(benchmark)}
          eligibilityThreshold={Number(eligibilityThreshold)}
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
  ciipIncentiveByProduct: graphql`
    fragment IncentiveSegmentContainer_ciipIncentiveByProduct on CiipIncentiveByProduct {
      productName
      incentiveRatio
      incentiveMultiplier
      paymentAllocationFactor
      carbonTax
      incentiveProduct
      benchmark
      eligibilityThreshold
    }
  `
});
