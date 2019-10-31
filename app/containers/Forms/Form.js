import React from 'react';
import {graphql, commitMutation, createRefetchContainer} from 'react-relay';
import Alert from 'react-bootstrap/Alert';
import {useRouter} from 'next/router';
import SurveyWrapper from '../../components/Survey/SurveyWrapper';
import updateApplicationStatusMutation from '../../mutations/application/updateApplicationStatusMutation';
import FormWithProductUnits from './FormWithProductUnits';
import FormWithFuelUnits from './FormWithFuelUnits';

export const FormComponent = ({
  query,
  relay,
  onFormComplete,
  initialData,
  initialDataSource,
  certificationPage
}) => {
  const {result} = query || {};

  const router = useRouter();

  // Mutation: stores the result of the form
  const updateFormResult = graphql`
    mutation FormLoaderContainerMutation($input: UpdateFormResultInput!) {
      updateFormResult(input: $input) {
        formResult {
          id
          formResult
        }
      }
    }
  `;

  // Function: store the form result
  const storeResult = formResult => {
    const {environment} = relay;
    const variables = {
      input: {
        id: result.id,
        formResultPatch: {
          formResult: JSON.stringify(formResult)
        }
      }
    };

    const mutation = updateFormResult;
    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: response => {
        // This update Mutation needs an updater function
        // window.location.reload();
        console.log('Store Result Response received from server.', response);
      },
      onError: err => console.error(err)
    });
  };

  console.log(result);
  // Change application status to 'pending' on application submit
  const submitApplication = async () => {
    const {environment} = relay;
    const variables = {
      input: {
        id:
          result.applicationByApplicationId.applicationStatusesByApplicationId
            .edges[0].node.id,
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
    console.log('form data', formData);
    storeResult(formData);
    console.log('Complete!', result.data);
    certificationPage ? submitApplication() : onFormComplete();
  };

  if (!result) return null;
  const {
    formJsonByFormId: {formJson}
  } = result;
  return (
    <>
      {initialData && Object.keys(initialData).length > 0 && (
        <>
          <Alert variant="info">
            We filled this form for you with the data coming from{' '}
            {initialDataSource}. Please review it and either submit or edit it.
          </Alert>
        </>
      )}
      <FormWithFuelUnits query={query} formJson={formJson}>
        <FormWithProductUnits query={query} formJson={formJson}>
          <SurveyWrapper initialData={initialData} onComplete={onComplete} />
        </FormWithProductUnits>
      </FormWithFuelUnits>
    </>
  );
};

export default createRefetchContainer(
  FormComponent,
  {
    query: graphql`
      fragment Form_query on Query
        @argumentDefinitions(formResultId: {type: "ID!"}) {
        ...FormWithProductUnits_query
        ...FormWithFuelUnits_query
        result: formResult(id: $formResultId) {
          id
          formJsonByFormId {
            formJson
          }
          applicationByApplicationId {
            id
            applicationStatusesByApplicationId(orderBy: CREATED_AT_DESC) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    `
  },
  graphql`
    query FormRefetchQuery($formResultId: ID!) {
      query {
        ...Form_query @arguments(formResultId: $formResultId)
      }
    }
  `
);
