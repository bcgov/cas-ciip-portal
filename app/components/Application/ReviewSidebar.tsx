import React from 'react';
import {Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

interface Props {
  reviewStep: string;
  onClose: () => void;
  onCompleted: () => void;
}

export const ApplicationReviewStep: React.FunctionComponent<Props> = ({
  reviewStep,
  onClose,
  onCompleted
}) => {
  return (
    <div id="sidebar" className="col-md-4 col-xxl-3">
      <button
        type="button"
        id="close"
        aria-label={`Close ${reviewStep} Review`}
        onClick={onClose}
      >
        ×
      </button>
      <h2>{reviewStep} Review</h2>
      <Button
        variant="outline-primary"
        type="button"
        onClick={onCompleted}
        style={{
          padding: '0.75rem .9rem',
          display: 'block',
          margin: 'auto'
        }}
      >
        <FontAwesomeIcon icon={faCheck} style={{marginRight: '0.5rem'}} />
        Mark this review step completed
      </Button>
      <div id="scrollable-comments" tabIndex={0}>
        HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO
        HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO
        HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO
        HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO
        HELLO HELLO sd sdjf sdjfh lk ie dsdfo o od pd j h y ii k k i i i y y y y
        j j n n b g g g g g j u i k j n k l m n b b v v h k i k j n k l m n b b
        v v h k h k i k j n k l m n b b v v h k i k j n k l m n b b v v h k i k
        j n k l m n b b v v h k i k j n k l m n b b v v h k i k j n k l m n b b
        v v h k i k j n k l m n b b v v h k i k j n k l m n b b v v h k i k j n
        k l m n b b v v h k i k j n k l m n b b v v h k i k j n k l m n b b v v
        h k i k j n k l m n b b v v h k i k j n k l m n b b v v h k i k j n k l
        m n b b v v h k i k j n k l m n b b v v h k i k j n k l m n b b v v h k
        i k j n k l m n b b v v h k i k j n k l m n b b v v h k i k j n k l m n
        b b v v h k i k j n k l m n b b v v h k i k j n k l m n b b v v h k i k
        j n k l m n b b v v
      </div>
      <div id="button-footer">
        <Button variant="link" style={{padding: 0}}>
          Show Resolved
        </Button>
        <Button variant="primary">+ New Comment</Button>
      </div>
      <style jsx>{`
        #sidebar {
          position: fixed;
          top: 68px;
          right: 0;
          height: calc(100% - 68px);
          background: #f7f7f7;
          border: 1px solid transparent;
          border-left-color: #dfdfdf;
          padding: 0 1.5em;
        }
        #close {
          font-size: 2.2rem;
          position: absolute;
          top: 0;
          left: 1rem;
          cursor: pointer;
          border: none;
          background: none;
        }
        h2 {
          margin: 15px 0;
          text-align: center;
        }
        #scrollable-comments {
          overflow-y: scroll;
          height: calc(100% - 108px - 3rem - 53px);
          margin: 1.5rem 0;
          padding: 0.5em 0.7em 0 0.5em;
        }
        #scrollable-comments::-webkit-scrollbar {
          -webkit-appearance: none;
          width: 8px;
        }
        #scrollable-comments::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background-color: rgba(0, 0, 0, 0.5);
          box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
        }
        #button-footer {
          position: absolute;
          bottom: 0;
          margin-bottom: 15px;
          width: calc(100% - 3em);
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default ApplicationReviewStep;
