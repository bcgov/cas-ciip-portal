import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {Variant} from 'react-bootstrap/esm/types';

interface NumberCircleProps {
  number: number;
  style: Variant;
}

interface Props {
  steps: Array<{
    number: number;
    description: string;
    badgeStyle: Variant;
  }>;
  title?: string;
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
          margin-top: -1.75rem;
          width: 2.44rem;
          line-height: 2.44rem;
          border-radius: 50%;
          text-align: center;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export const ProgressStepIndicator: React.FunctionComponent<Props> = ({
  steps,
  title
}) => {
  return (
    <div className="progressStepIndicator">
      {title && (
        <>
          <Row className="mb-4">
            <Col>
              <h2>{title}</h2>
            </Col>
          </Row>
        </>
      )}
      <div className="progress ml-1 mr-1">
        <div
          role="progressbar"
          className="progress-bar"
          aria-valuenow={0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="progress bar indicating the steps represented by this component"
          style={{width: '0%'}}
        />
      </div>
      <div className="d-flex flex-row justify-content-between mb-3">
        {steps.map((step) => (
          <NumberedCircle
            key={`circle-${step.number}`}
            number={step.number}
            style={step.badgeStyle}
          />
        ))}
      </div>
      <Row>
        {steps.map((step) => (
          <Col key={`description-${step.number}`} className="stepDescription">
            {step.description}
          </Col>
        ))}
      </Row>
      <style jsx>{`
        h2 {
          font-size: 1.5rem;
        }
        .progressStepIndicator :global(.stepDescription) {
          text-align: center;
          font-weight: 500;
        }
        .progressStepIndicator :global(.stepDescription:first-child) {
          text-align: left;
        }
        .progressStepIndicator :global(.stepDescription:last-child) {
          text-align: right;
        }
      `}</style>
    </div>
  );
};

export default ProgressStepIndicator;
