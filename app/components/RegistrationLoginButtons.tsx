import React from 'react';
import {Col, Card} from 'react-bootstrap';
import LoginButton from './LoginButton';

interface Props {
  applicationDeadline: string;
}

const RegistrationLoginButtons: React.FunctionComponent<Props> = ({
  applicationDeadline
}) => {
  return (
    <Col md={{span: 5, offset: 1}}>
      <Card style={{width: '100%', margin: '30px 0'}}>
        <Card.Body>
          <Card.Title className="blue">
            Apply for the CleanBC Industrial Incentive Program (CIIP)
          </Card.Title>
          <Card.Text style={{padding: '10px 0 10px 0'}}>
            Operators must submit a CIIP application form by{' '}
            {applicationDeadline}. As part of the application, information about
            the operation’s energy use, emissions, and production is required.
          </Card.Text>
          <LoginButton
            style={{padding: '15px'}}
            className="full-width"
            variant="primary"
            size="lg"
          >
            Register and Apply
          </LoginButton>
        </Card.Body>
      </Card>
      <LoginButton className="login-link" variant="outline-dark">
        Already have an account? Click here to login.
      </LoginButton>
      <style jsx global>{`
        .login-link {
          padding: 20px;
          width: 100%;
          text-decoration: underline;
        }
      `}</style>
    </Col>
  );
};

export default RegistrationLoginButtons;
