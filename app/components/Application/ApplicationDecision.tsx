import React from 'react';
import {Alert} from 'react-bootstrap';
import {getUserFriendlyStatusLabel} from 'lib/text-transforms';

interface Props {
  actionRequired: Boolean;
  decision: string;
  reviewComments: string[];
}

const BS_ALERT = {
  REQUESTED_CHANGES: 'warning',
  REJECTED: 'danger',
  APPROVED: 'success'
};

const DECISION_TEXT = {
  REQUESTED_CHANGES: '',
  REJECTED:
    'Thank you for applying to the CIIP. Unfortunately this submission did not meet program requirements and a payment cannot be granted.',
  APPROVED:
    'This application has been approved. Your incentive payment is being processed. No further action is required from you at this time.'
};

const ApplicationDecision: React.FunctionComponent<Props> = ({
  actionRequired,
  decision,
  reviewComments,
  children
}) => {
  const heading = actionRequired
    ? 'Action Required'
    : decision === 'REQUESTED_CHANGES'
    ? 'Changes Requested'
    : `Decision: ${getUserFriendlyStatusLabel(decision)}`;

  // Items will not be re-ordered after mounting, so using index is safe
  // eslint-disable-next-line react/no-array-index-key
  const items = reviewComments.map((c, i) => <li key={`comment-${i}`}>{c}</li>);

  return (
    <Alert variant={actionRequired ? 'danger' : BS_ALERT[decision]}>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>
        {actionRequired
          ? 'Changes to your application have been requested. Please read these review notes and gather the relevant information before revising your application.'
          : DECISION_TEXT[decision]}
      </p>
      {reviewComments.length > 0 && (
        <>
          <hr />
          <p className="h5">Reviewer Notes:</p>
          <ul>{items}</ul>
        </>
      )}
      {children}
    </Alert>
  );
};

export default ApplicationDecision;
