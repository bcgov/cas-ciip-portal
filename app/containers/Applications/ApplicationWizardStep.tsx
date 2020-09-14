import React, {useState} from 'react';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {ApplicationWizardStep_query} from 'ApplicationWizardStep_query.graphql';
import {Row, Col} from 'react-bootstrap';
import ApplicationComments from 'containers/Applications/ApplicationCommentsContainer';
import Form from 'containers/Forms/Form';
import updateFormResultMutation from 'mutations/form/updateFormResultMutation';
import ApplicationWizardConfirmation from './ApplicationWizardConfirmation';

interface Props {
  query: ApplicationWizardStep_query;
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
  onStepComplete,
  confirmationPage,
  relay
}) => {
  const {application, formResult} = query;

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

  // Define a callback methods on survey complete
  const onComplete = (result) => {
    const formData = result.data;
    storeResult(formData);
    onStepComplete();
  };

  const onValueChanged = async (change) => {
    const {formData} = change;
    await storeResult(formData);
  };

  if (confirmationPage)
    return (
      <ApplicationWizardConfirmation
        query={query}
        application={query.application}
      />
    );
  if (!formResult) return null;

  if (!application) return null;

  const form = (
    <Form
      query={query}
      isSaved={isSaved}
      onComplete={onComplete}
      onValueChanged={onValueChanged}
    />
  );

  if (formResult.hasUnresolvedComments)
    return (
      <Row>
        <Col md={8}>{form}</Col>
        <Col md={4}>
          <ApplicationComments formResult={formResult} review={false} />
        </Col>
      </Row>
    );
  return form;
};

export default createFragmentContainer(ApplicationWizardStep, {
  query: graphql`
    fragment ApplicationWizardStep_query on Query
      @argumentDefinitions(
        formResultId: {type: "ID!"}
        applicationId: {type: "ID!"}
        version: {type: "String!"}
      ) {
      ...Form_query @arguments(formResultId: $formResultId)
      ...ApplicationWizardConfirmation_query

      formResult(id: $formResultId) {
        id
        formResult
        hasUnresolvedComments
        ...ApplicationCommentsContainer_formResult
      }
      application(id: $applicationId) {
        ...ApplicationWizardConfirmation_application
          @arguments(version: $version)
      }
    }
  `
});
