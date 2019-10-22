import React, {useEffect, useState} from 'react';
import {graphql, commitMutation, createRefetchContainer} from 'react-relay';
import Alert from 'react-bootstrap/Alert';
import SurveyWrapper from '../../components/Survey/SurveyWrapper';
import FormWithProductUnits from './FormWithProductUnits';
import FormWithFuelUnits from './FormWithFuelUnits';

const Form = ({
  query,
  relay,
  applicationId,
  onFormComplete,
  startsEditable,
  initialData,
  initialDataSource
}) => {
  const {json} = query || {};
  const {environment} = relay;

  const [editable, setEditable] = useState(startsEditable);
  useEffect(() => {
    setEditable(startsEditable);
  }, [startsEditable]);

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
      {!editable && (
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
  Form,
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
