import React from 'react';
import {graphql, commitMutation, createRefetchContainer} from 'react-relay';
import Alert from 'react-bootstrap/Alert';
import SurveyWrapper from '../../components/Survey/SurveyWrapper';
import FormWithProductUnits from './FormWithProductUnits';
import FormWithFuelUnits from './FormWithFuelUnits';

export const FormComponent = ({
  query,
  relay,
  applicationId,
  onFormComplete,
  initialData,
  initialDataSource
}) => {
  const {json} = query || {};

  // Mutation: stores the result of the form
  const createFormResult = graphql`
    mutation FormLoaderContainerMutation($input: CreateFormResultInput!) {
      createFormResult(input: $input) {
        formResult {
          rowId
        }
      }
    }
  `;

  // Function: store the form result
  const storeResult = formResult => {
    const {environment} = relay;
    const variables = {
      input: {
        formResult: {
          applicationId,
          formId: json.rowId,
          userId: 2,
          formResult: JSON.stringify(formResult)
        }
      }
    };

    const mutation = createFormResult;
    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: response => {
        console.log('Store Result Response received from server.', response);
      },
      onError: err => console.error(err)
    });
  };

  // Define a callback methods on survey complete
  const onComplete = result => {
    const formData = result.data;
    console.log('form data', formData);
    storeResult(formData);
    console.log('Complete!', result.data);
    onFormComplete();
  };

  if (!json) return null;
  const {formJson} = json;

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
          {({formJson}) => (
            <SurveyWrapper
              formJson={formJson}
              initialData={initialData}
              onComplete={onComplete}
            />
          )}
        </FormWithProductUnits>
      </FormWithFuelUnits>
    </>
  );
};

export default createRefetchContainer(
  FormComponent,
  {
    query: graphql`
      fragment Form_query on Query @argumentDefinitions(formId: {type: "ID!"}) {
        json: formJson(id: $formId) {
          rowId
          formJson
        }
        ...FormWithProductUnits_query
        ...FormWithFuelUnits_query
      }
    `
  },
  graphql`
    query FormRefetchQuery($formId: ID!) {
      query {
        ...Form_query @arguments(formId: $formId)
      }
    }
  `
);
