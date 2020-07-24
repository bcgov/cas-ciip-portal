import React from 'react';
import {Card} from 'react-bootstrap';

interface Props {
  overrideJustification: string;
}

const ApplicationOverrideNotification: React.FunctionComponent<Props> = ({
  overrideJustification
}) => {
  if (overrideJustification)
    return (
      <Card id="justification-card">
        <Card.Header className="bg-danger">
          Error validation override is active
        </Card.Header>
        <Card.Body tabIndex={0}>
          <Card.Text>
            <strong>
              There were errors in this application that the reporter has chosen
              to override. Justification for overriding the errors is provided
              in the box below:
            </strong>
          </Card.Text>
          <Card>
            <div id="justification" className="scrollbar">
              <Card.Body>{overrideJustification}</Card.Body>
            </div>
          </Card>
        </Card.Body>
        <style jsx>{`
          #justification-card {
            margin: 1rem 0;
          }
          #justification {
            max-height: 19.2em;
            background: #eee;
            overflow-y: scroll;
          }
          .scrollbar::-webkit-scrollbar {
            -webkit-appearance: none;
            width: 8px;
          }
          .scrollbar::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: rgba(0, 0, 0, 0.5);
            box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
          }
        `}</style>
      </Card>
    );
};

export default ApplicationOverrideNotification;
