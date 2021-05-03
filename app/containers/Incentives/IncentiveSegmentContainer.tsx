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
      <td>{productName}</td>
      <td>{Number(emissionIntensity).toFixed(4)}</td>
      <td>{Number(benchmark).toFixed(4)}</td>
      <td>{Number(eligibilityThreshold).toFixed(4)}</td>
      <td>{Number(incentiveMultiplier).toFixed(4)}</td>
      <td>{Number(paymentAllocationFactor).toFixed(4)}</td>
      <td>{Number(incentiveRatio).toFixed(4)}</td>
      <td>
        <Money amount={Number(incentiveProduct).toFixed(2)} />
      </td>
      <td>
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
