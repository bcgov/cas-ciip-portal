import React from 'react';
import {Card} from 'react-bootstrap';
import LegalDisclaimerText from 'components/LegalDisclaimerText';

interface Props {
  children?: React.ReactNode;
}

const SignatureDisclaimerCard: React.FunctionComponent<Props> = ({
  children
}) => {
  return (
    <Card style={{margin: '1rem 0'}}>
      <Card.Body>
        <Card.Title className="blue">Legal Disclaimer</Card.Title>
        <Card.Text style={{padding: '10px 0 10px 0'}}>{children}</Card.Text>
        <Card>
          <div tabIndex={0} id="disclaimer-text" className="show-scrollbar">
            <Card.Body>
              <LegalDisclaimerText />
            </Card.Body>
          </div>
        </Card>
      </Card.Body>
      <style jsx>{`
        #disclaimer-text {
          max-height: 19.2em;
          background: #eee;
          overflow-y: scroll;
        }
        .show-scrollbar::-webkit-scrollbar {
          -webkit-appearance: none;
          width: 8px;
        }
        .show-scrollbar::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background-color: rgba(0, 0, 0, 0.5);
          box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </Card>
  );
};

export default SignatureDisclaimerCard;
