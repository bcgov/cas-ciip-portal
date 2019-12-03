import React from 'react';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {ApplicationWizardStep_query} from 'ApplicationWizardStep_query.graphql';
import Form from '../Forms/Form';
import updateFormResultMutation from '../../mutations/form/updateFormResultMutation';
import ApplicationWizardConfirmation from './ApplicationWizardConfirmation';

interface Props {
  query: ApplicationWizardStep_query;
  onStepComplete: () => void;
  onStepBack: () => void;
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
  onStepBack,
  confirmationPage,
  relay
}) => {
  const {application, formResult} = query;

  // Function: store the form result
  const storeResult = async result => {
    const {environment} = relay;
    const variables = {
      input: {
        id: formResult.id,
        formResultPatch: {
          formResult: result
        }
      }
    };
    const response = await updateFormResultMutation(environment, variables);
    console.log('response', response);
  };

  // Define a callback methods on survey complete
  const onComplete = result => {
    const formData = result.data;
    storeResult(formData);
    onStepComplete();
  };

  const onValueChanged = async change => {
    const {formData} = change;
    await storeResult(formData);
  };

  if (confirmationPage) return <ApplicationWizardConfirmation query={query} />;
  if (!formResult) return null;

  if (!application) return null;
  // Save Application status to database
  return (
    // Save Application status to database
    <Form // Save Application status to database
      query={query} // Save Application status to database
      onComplete={onComplete}
      onValueChanged={onValueChanged}
      onBack={onStepBack}
    />
  );
};

export default createFragmentContainer(ApplicationWizardStep, {
  query: graphql`
    fragment ApplicationWizardStep_query on Query
      @argumentDefinitions(
        formResultId: {type: "ID!"}
        applicationId: {type: "ID!"}
      ) {
      ...Form_query @arguments(formResultId: $formResultId)
      ...ApplicationWizardConfirmation_query
        @arguments(applicationId: $applicationId)

      formResult(id: $formResultId) {
        id
        formResult
      }
      application(id: $applicationId) {
        applicationStatus {
          id
        }
      }
    }
  `
});
