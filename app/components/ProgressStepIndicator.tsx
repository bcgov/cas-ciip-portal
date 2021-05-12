import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {Variant} from 'react-bootstrap/esm/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

interface NumberCircleProps {
  completed: boolean;
  number: number;
  style: Variant;
}

interface Props {
  steps: Array<{
    number: number;
    description: string;
    badgeStyle: Variant;
    completed?: boolean;
  }>;
  title?: string;
  ariaLabel?: string;
}

const NumberedCircle: React.FunctionComponent<NumberCircleProps> = ({
  completed = false,
  number,
  style
}) => {
  return (
    <>
      <div className={`numberedCircle badge-${style}`}>
        {completed ? (
          <FontAwesomeIcon
            icon={faCheck}
            style={{
              fontSize: '30px',
              verticalAlign: 'middle',
              height: '0.8em'
            }}
          />
        ) : (
          number
        )}
      </div>
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
  title = null,
  ariaLabel = null
}) => {
  const totalCompleted = steps.filter((s) => s.completed).length;
  const currStep = Math.max(totalCompleted - 1, 0);
  const progress = Math.round((currStep / Math.max(steps.length - 1, 1)) * 100);
  return (
    <div className="progressStepIndicator">
      {title && (
        <>
          <Row className="mb-4">
            <Col>
              <h2 id="progressTitle">{title}</h2>
            </Col>
          </Row>
        </>
      )}
      <div className="progress ml-1 mr-1">
        <div
          role="progressbar"
          className="progress-bar"
          aria-valuenow={currStep}
          aria-valuemin={0}
          aria-valuemax={steps.length ? steps.length - 1 : 0}
          aria-valuetext={steps.length ? steps[currStep].description : ''}
          aria-labelledby={title && 'progressTitle'}
          aria-label={ariaLabel}
          style={{width: `${progress}%`}}
        />
      </div>
      <div className="d-flex flex-row justify-content-between mb-3">
        {steps.map((step) => (
          <NumberedCircle
            key={`circle-${step.number}`}
            number={step.number}
            style={step.badgeStyle}
            completed={step.completed}
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
          flex-grow: 2; /* Items in the middle have twice the space under the circled number */
        }
        .progressStepIndicator :global(.stepDescription:first-child) {
          text-align: left;
          flex-grow: 1;
        }
        .progressStepIndicator :global(.stepDescription:last-child) {
          text-align: right;
          flex-grow: 1;
        }
      `}</style>
    </div>
  );
};

export default ProgressStepIndicator;
