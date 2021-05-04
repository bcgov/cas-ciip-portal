import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import Money from 'components/helpers/Money';
import {IncentiveSegmentContainer_ciipIncentiveByProduct} from 'IncentiveSegmentContainer_ciipIncentiveByProduct.graphql';

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
      <td className="text-left">{productName}</td>
      <td className="text-right">
        {Number.parseFloat(Number(emissionIntensity).toFixed(4))}
      </td>
      <td className="text-right">
        {Number.parseFloat(Number(benchmark).toFixed(4))}
      </td>
      <td className="text-right">
        {Number.parseFloat(Number(eligibilityThreshold).toFixed(4))}
      </td>
      <td className="text-right">
        {Number.parseFloat(Number(incentiveMultiplier).toFixed(4))}
      </td>
      <td className="text-right">
        {Number.parseFloat(Number(paymentAllocationFactor).toFixed(4))}
      </td>
      <td className="text-right">
        {Number.parseFloat(Number(incentiveRatio).toFixed(4))}
      </td>
      <td className="text-right">
        <Money amount={Number(incentiveProduct).toFixed(2)} />
      </td>
      <td className="text-right">
        <Money amount={Number(incentiveProductMax).toFixed(2)} />
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
      incentiveProductMax
      emissionIntensity
      benchmark
      eligibilityThreshold
    }
  `
});
