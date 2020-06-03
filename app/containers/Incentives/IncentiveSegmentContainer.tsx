import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
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
    incentiveProductMax,
    benchmark,
    eligibilityThreshold,
    incentiveRatio,
    incentiveMultiplier,
    paymentAllocationFactor,
    emissionIntensity
  } = ciipIncentiveByProduct;

  return (
    <tr>
      <td>{productName}</td>
      <td>{Number.parseFloat(Number(emissionIntensity).toFixed(4))}</td>
      <td>{Number.parseFloat(Number(benchmark).toFixed(4))}</td>
      <td>{Number.parseFloat(Number(eligibilityThreshold).toFixed(4))}</td>
      <td>
        <BenchmarkChart
          emissionIntensity={Number(emissionIntensity)}
          benchmark={Number(benchmark)}
          eligibilityThreshold={Number(eligibilityThreshold)}
        />
      </td>
      <td>{Number.parseFloat(Number(incentiveRatio).toFixed(4))}</td>
      <td>{Number.parseFloat(Number(incentiveMultiplier).toFixed(4))}</td>
      <td>{Number.parseFloat(Number(paymentAllocationFactor).toFixed(4))}</td>
      <td>{Number(incentiveProduct).toFixed(2)}</td>
      <td>{Number(incentiveProductMax).toFixed(2)}</td>
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
      incentiveProductMax
      emissionIntensity
      benchmark
      eligibilityThreshold
      incrementalCarbonTax
    }
  `
});
