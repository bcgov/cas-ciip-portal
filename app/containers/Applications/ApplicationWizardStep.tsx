import React from 'react';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {useRouter} from 'next/router';
import {ApplicationWizardStep_query} from 'ApplicationWizardStep_query.graphql';
import Form from '../Forms/Form';
import updateApplicationStatusMutation from '../../mutations/application/updateApplicationStatusMutation';
import updateFormResultMutation from '../../mutations/form/updateFormResultMutation';
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
  const router = useRouter();
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

  // Change application status to 'pending' on application submit
  const submitApplication = async () => {
    const {environment} = relay;
    const variables = {
      input: {
        id: application.applicationStatus.id,
        applicationStatusPatch: {
          applicationStatus: 'pending'
        }
      }
    };
    const response = await updateApplicationStatusMutation(
      environment,
      variables
    );
    console.log(response);
    const newUrl = {
      pathname: '/complete-submit'
    };
    router.replace(newUrl, newUrl, {shallow: true});
  };

  // Define a callback methods on survey complete
  const onComplete = result => {
    const formData = result.data;
    storeResult(formData);
    router.query.certificationPage ? submitApplication() : onStepComplete();
  };

  const onValueChanged = async change => {
    const {formData} = change;
    await storeResult(formData);
  };

  if (confirmationPage) return <ApplicationWizardConfirmation query={query} />;
  if (!formResult) return null;

  if (!application) return null;

  return (
    <Form
      query={query}
      onComplete={onComplete}
      onValueChanged={onValueChanged}
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
