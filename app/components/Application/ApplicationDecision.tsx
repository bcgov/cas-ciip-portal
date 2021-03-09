import React from 'react';
import {Alert} from 'react-bootstrap';

interface Props {
  changesRequested: Boolean;
  decision?: string;
  reviewComments: string[];
}

const BS_ALERT = {
  REJECTED: 'danger',
  APPROVED: 'success'
};

const DECISION_TEXT = {
  REJECTED:
    'Thank you for applying to the CIIP. Unfortunately this submission did not meet program requirements and a payment cannot be granted.',
  APPROVED:
    'This application has been approved. Your incentive payment is being processed. No further action is required from you at this time.'
};

const ApplicationDecision: React.FunctionComponent<Props> = ({
  changesRequested,
  decision,
  reviewComments,
  children
}) => {
  const heading = changesRequested
    ? 'Action Required'
    : `Decision: ${decision[0].toUpperCase()}${decision
        .toLowerCase()
        .slice(1)}`;

  // eslint-disable-next-line react/no-array-index-key
  const items = reviewComments.map((c, i) => <li key={`comment-${i}`}>{c}</li>);

  return (
    <Alert variant={changesRequested ? 'danger' : BS_ALERT[decision]}>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>
        {changesRequested
          ? 'Changes to your application have been requested. Please read these review notes and gather the relevant information before revising your application.'
          : DECISION_TEXT[decision]}
      </p>
      {reviewComments.length > 0 && (
        <>
          <p className="h5">Reviewer Notes:</p>
          <ul>{items}</ul>
        </>
      )}
      {children}
    </Alert>
  );
};

export default ApplicationDecision;
