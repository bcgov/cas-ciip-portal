import React from 'react';
import {Card} from 'react-bootstrap';

interface Props {
  serviceUrl: string;
}

const ReportAProblem: React.FunctionComponent<Props> = ({serviceUrl}) => {
  return (
    <Card className="admin-control-card">
      <Card.Body
        style={{
          height: 324,
          background: '#f5f5f5',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <p>
          <span role="img" aria-label="waving hand">
            👋
          </span>{' '}
          Something wrong?
          <br />
          <a href={serviceUrl}>Report a problem</a> to the development team.
        </p>
      </Card.Body>
      <style jsx>{`
        p {
          font-weight: bold;
          text-align: center;
          margin: 0;
        }
      `}</style>
    </Card>
  );
};

export default ReportAProblem;
