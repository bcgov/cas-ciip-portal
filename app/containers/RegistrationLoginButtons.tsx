import React from "react";
import { Col, Card } from "react-bootstrap";
import { createFragmentContainer, graphql } from "react-relay";
import { RegistrationLoginButtons_query } from "RegistrationLoginButtons_query.graphql";
import { dateTimeFormat } from "functions/formatDates";

interface Props {
  query: RegistrationLoginButtons_query;
}

export const RegistrationLoginButtonsComponent: React.FunctionComponent<Props> = ({
  query,
}) => {
  const applicationCloseTime = query?.openedReportingYear?.applicationCloseTime;
  const applicationDeadline =
    applicationCloseTime && dateTimeFormat(applicationCloseTime, "days_string");

  const cardText = applicationCloseTime ? (
    <>
      <p>
        Operators must submit a CIIP application form by{" "}
        <strong>{applicationDeadline}</strong>.
      </p>
      <p>
        As part of the application, information about the operation’s energy
        use, emissions, and production is required.
      </p>
    </>
  ) : (
    <>
      <p>In 2024, CIIP applications will be accepted from May 21 to June 28.</p>
      <p>
        Outside of this period, you may still log in to view your submitted CIIP
        applications and submit any changes requested by the Climate Action
        Secretariat.
      </p>
    </>
  );

  return (
    <Col md={{ span: 5, offset: 1 }}>
      <Card style={{ width: "100%", margin: "30px 0" }}>
        <Card.Body>
          <Card.Title className="blue">
            Apply for the CleanBC Industrial Incentive Program (CIIP)
          </Card.Title>
          {cardText}
        </Card.Body>
      </Card>

      <style jsx global>{`
        .login-link {
          padding: 20px;
          width: 100%;
          text-decoration: underline;
        }
        :global(.card-body > p:first-of-type) {
          padding: 10px 0 0 0;
        }
        :global(.card-body > p:last-of-type) {
          padding: 0 0 10px 0;
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
  `,
});
