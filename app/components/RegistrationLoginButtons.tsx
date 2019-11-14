import React from 'react';
import {Col, Card, Button} from 'react-bootstrap';
import LoginForm from './LoginForm';

const RegistrationLoginButtons = () => {
  return (
    <Col md={{span: 5, offset: 1}}>
      <Card style={{width: '100%', margin: '30px 0'}}>
        <Card.Body>
          <Card.Title className="blue">
            Apply for CleanBC Industrial Incentive Program (CIIP)
          </Card.Title>
          <Card.Text style={{padding: '10px 0 10px 0'}}>
            Operators must submit a CIIP application form by June 30, 2019. As
            part of the application, information about the operation’s energy
            use, emissions, and production is required.
          </Card.Text>
          <LoginForm>
            <Button
              type="submit"
              style={{padding: '15px'}}
              className="full-width"
              variant="primary"
              size="lg"
            >
              Register and Apply
            </Button>
          </LoginForm>
        </Card.Body>
      </Card>
      <LoginForm>
        <button type="submit" className="login-link text-center">
          Already have an account? Click here to login.
        </button>
      </LoginForm>
      <style jsx>{`
        .login-link {
          border: 1px solid #666;
          padding: 20px;
          border-radius: 4px;
          background-color: transparent;
          width: 100%;
          text-decoration: underline;
        }
      `}</style>
    </Col>
  );
};

export default RegistrationLoginButtons;
