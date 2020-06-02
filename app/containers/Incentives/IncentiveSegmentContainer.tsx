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
    productName,
    incentiveProduct,
    benchmark,
    eligibilityThreshold,
    incrementalCarbonTax,
    emissionIntensity
  } = ciipIncentiveByProduct;

  const formula = `
  1 - \\left({ ${emissionIntensity} - ${benchmark}
    \\over
    ${eligibilityThreshold} - ${benchmark}
  }\\right) \\times ${incrementalCarbonTax}`;

  return (
    <tr>
      <td>{productName}</td>
      <td>
        {process.env.NO_MATHJAX ||
        getConfig()?.publicRuntimeConfig.NO_MATHJAX ? null : (
          <MathJax.Context input="tex">
            <MathJax.Node>{formula}</MathJax.Node>
          </MathJax.Context>
        )}
      </td>
      <td>CAD {incentiveProduct} </td>
      <td>
        <BenchmarkChart
          emissionIntensity={Number(emissionIntensity)}
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
      incentiveProduct
      emissionIntensity
      benchmark
      eligibilityThreshold
    }
  `
});
