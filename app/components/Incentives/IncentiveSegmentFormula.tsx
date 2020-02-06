import getConfig from 'next/config';
import React from 'react';
import MathJax from 'react-mathjax2';

import {Row, Col} from 'react-bootstrap';

const IncentiveSegmentFormula = () => {
  const formula = String.raw`
    1 - \left({
      Emission Intensity - Benchmark
      \over
      Eligibility Threshold - Benchmark
    }\right) \times Carbon Tax Payed Eligible for Incentive`;
  return (
    <Row>
      <Col md={12}>
        {process.env.NO_MATHJAX ||
        getConfig()?.publicRuntimeConfig.NO_MATHJAX ? null : (
          <MathJax.Context input="tex">
            <MathJax.Node>{formula}</MathJax.Node>
          </MathJax.Context>
        )}
      </Col>
    </Row>
  );
};

export default IncentiveSegmentFormula;
