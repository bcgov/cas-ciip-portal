import React, {useState} from 'react';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {ApplicationWizardStep_query} from 'ApplicationWizardStep_query.graphql';
import {Row, Col} from 'react-bootstrap';
import Form from 'containers/Forms/Form';
import updateFormResultMutation from 'mutations/form/updateFormResultMutation';
import ApplicationWizardConfirmation from './ApplicationWizardConfirmation';
import {ApplicationWizardStep_formResult} from 'ApplicationWizardStep_formResult.graphql';
import {ApplicationWizardStep_applicationRevision} from 'ApplicationWizardStep_applicationRevision.graphql';

interface Props {
  query: ApplicationWizardStep_query;
  formResult: ApplicationWizardStep_formResult;
  applicationRevision: ApplicationWizardStep_applicationRevision;
  review: React.ReactNode;
  onStepComplete: () => void;
  confirmationPage: boolean;
  relay: RelayProp;
}

/*
 * The ApplicationWizardStep renders a form and, where applicable,
 *  starts by presenting a summary of existing data to the user
 */
const ApplicationWizardStep: React.FunctionComponent<Props> = ({
  query,
  formResult,
  applicationRevision,
  review,
  onStepComplete,
  confirmationPage,
  relay
}) => {
  if ((!formResult && !confirmationPage) || !applicationRevision) return null;

  const [isSaved, setSaved] = useState(true);
  // Function: store the form result
  const storeResult = async (result) => {
    setSaved(false);
    const {environment} = relay;
    const variables = {
      input: {
        id: formResult.id,
        formResultPatch: {
          formResult: result
        }
      },
      messages: {
        failure: 'An error occured while saving your form.'
      }
    };
    await updateFormResultMutation(environment, variables);
    setSaved(true);
  };

  const onComplete = (result) => {
    const formData = result.data;
    storeResult(formData);
    onStepComplete();
  };

  const onValueChanged = async (change) => {
    const {formData} = change;
    await storeResult(formData);
  };

  if (confirmationPage) {
    const confirmation = (
      <ApplicationWizardConfirmation
        query={query}
        applicationRevision={applicationRevision}
      />
    );
    if (review) {
      return (
        <Row>
          <Col md={8}>{confirmation}</Col>
          <Col md={4}>{review}</Col>
        </Row>
      );
    }
    return confirmation;
  }

  const form = (
    <Form
      query={query}
      ciipFormResult={formResult}
      isSaved={isSaved}
      onComplete={onComplete}
      onValueChanged={onValueChanged}
    />
  );

  if (review)
    return (
      <Row>
        <Col md={8}>{form}</Col>
        <Col md={4}>{review}</Col>
      </Row>
    );
  return form;
};

export default createFragmentContainer(ApplicationWizardStep, {
  query: graphql`
    fragment ApplicationWizardStep_query on Query {
      ...Form_query
      ...ApplicationWizardConfirmation_query
    }
  `,
  applicationRevision: graphql`
    fragment ApplicationWizardStep_applicationRevision on ApplicationRevision {
      ...ApplicationWizardConfirmation_applicationRevision
    }
  `,
  formResult: graphql`
    fragment ApplicationWizardStep_formResult on FormResult {
      id
      ...Form_ciipFormResult
    }
  `
});
