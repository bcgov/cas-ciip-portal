import React from 'react';
import {Button, Card} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

interface Props {
  reviewStep: string;
}

export const ApplicationReviewStep: React.FunctionComponent<Props> = ({
  reviewStep
}) => {
  return (
    <>
      <Card className="text-center justification-card">
        <div id="justification" className="scrollbar">
          <h1>{reviewStep} Review</h1>
          <Button style={{width: '80%'}} variant="outline-info">
            <FontAwesomeIcon icon={faCheck} />
            Mark this step as complete
          </Button>
          <Card.Body className="scrollbar">
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE COMMENTS GO HERE
            COMMENTS GO HERE
          </Card.Body>
        </div>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
      <style jsx>{`
        #justification-card {
          margin: 1rem 1rem 1rem 1rem;
        }
        #justification {
          position: fixed;
          padding: 1rem;
          max-height: 50em;
          background: #eee;
          overflow-y: scroll;
          align: center;
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
    </>
  );
};

export default ApplicationReviewStep;
