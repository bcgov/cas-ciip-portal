import React from 'react';
import {Col, ProgressBar, Row} from 'react-bootstrap';
import {Variant} from 'react-bootstrap/esm/types';

interface NumberCircleProps {
  number: number;
  style: Variant;
}

interface Props {
  steps: Array<{
    description: string;
    badgeStyle: Variant;
  }>;
}

const NumberedCircle: React.FunctionComponent<NumberCircleProps> = ({
  number,
  style
}) => {
  return (
    <>
      <div className={`numberedCircle badge-${style}`}>{number}</div>
      <style jsx>{`
        .numberedCircle {
          margin-top: -29px;
          width: 38px;
          line-height: 37px;
          border-radius: 50%;
          text-align: center;
          font-size: 16px;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export const ProgressStepIndicator: React.FunctionComponent<Props> = ({
  steps
}) => {
  return (
    <>
      <div>
        <ProgressBar now={0} />
        <div className="d-flex flex-row justify-content-between mb-3">
          {steps.map((step, index) => (
            <NumberedCircle number={index + 1} style={step.badgeStyle} />
          ))}
        </div>
        <Row>
          {steps.map((step) => (
            <Col className="stepDescription">{step.description}</Col>
          ))}
        </Row>
      </div>
      <style jsx global>{`
        .stepDescription {
          text-align: center;
          font-weight: 500;
        }
        .stepDescription:first-child {
          text-align: left;
        }
        .stepDescription:last-child {
          text-align: right;
        }
      `}</style>
    </>
  );
};

export default ProgressStepIndicator;
