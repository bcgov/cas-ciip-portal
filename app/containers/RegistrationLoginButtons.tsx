import React from 'react';
import {Col, Card, Button} from 'react-bootstrap';
import LoginButton from '../components/LoginButton';
import {createFragmentContainer, graphql} from 'react-relay';
import {RegistrationLoginButtons_query} from 'RegistrationLoginButtons_query.graphql';
// Import {dateTimeFormat} from 'functions/formatDates';

interface Props {
  query: RegistrationLoginButtons_query;
}

export const RegistrationLoginButtonsComponent: React.FunctionComponent<Props> = ({
  query
}) => {
  const applicationCloseTime = query?.openedReportingYear?.applicationCloseTime;
  // Const applicationDeadline =
  //   applicationCloseTime &&
  //   dateTimeFormat(applicationCloseTime, 'days_string');

  const cardText = applicationCloseTime ? (
    // `Operators must submit a CIIP application form by ${applicationDeadline}.
    'As part of the application, information about the operation’s energy use, emissions, and production is required.'
  ) : (
    <>
      The due date for CIIP application forms has passed. <br />
      You may still log in to view your submitted CIIP applications and submit
      any changes requested by the Climate Action Secretariat.
    </>
  );

  return (
    <Col md={{span: 5, offset: 1}}>
      <Card style={{width: '100%', margin: '30px 0'}}>
        <Card.Body>
          <Card.Title className="blue">
            Apply for the CleanBC Industrial Incentive Program (CIIP)
          </Card.Title>
          <Card.Text style={{padding: '10px 0 10px 0'}}>{cardText}</Card.Text>
          <a
            href="/register"
            style={{padding: '15px', display: 'block'}}
            className="full-width btn btn-primary btn-lg"
          >
            Register and Apply
          </a>
        </Card.Body>
      </Card>
      <LoginButton>
        <Button className="login-link" type="submit" variant="outline-dark">
          Already have an account? Click here to login.
        </Button>
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

export default createFragmentContainer(RegistrationLoginButtonsComponent, {
  query: graphql`
    fragment RegistrationLoginButtons_query on Query {
      openedReportingYear {
        applicationCloseTime
      }
    }
  `
});
