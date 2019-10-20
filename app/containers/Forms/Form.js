import React, {useEffect, useState} from 'react';
import {graphql, commitMutation, createRefetchContainer} from 'react-relay';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
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

  // TODO(Dylan): This block of code commented out until we figure out how formResults & Applications are being connected.
  // Should be done transactionally as a stored procedure once a flow has been established

  // Mutation: stores a status along with the form result
  // const createApplicationStatus = graphql`
  //   mutation FormLoaderContainerApplicationStatusMutation(
  //     $input: CreateApplicationStatusInput!
  //   ) {
  //     createApplicationStatus(input: $input) {
  //       applicationStatus {
  //         rowId
  //       }
  //     }
  //   }
  // `;

  // Function: store the application status
  // const storeApplicationStatus = resultId => {
  //   const variables = {
  //     input: {
  //       applicationStatus: {
  //         applicationStatus: 'pending',
  //         formResultId: resultId
  //       }
  //     }
  //   };

  //   const mutation = createApplicationStatus;
  //   commitMutation(environment, {
  //     mutation,
  //     variables,
  //     onCompleted: response => {
  //       console.log(response);
  //       console.log('Store Application Status Response received from server.');
  //       console.log('Application Status Created.');
  //     },
  //     onError: err => console.error(err)
  //   });
  // };

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
        console.log(response);
        console.log('Store Result Response received from server.');
        // FIXME
        // StoreApplicationStatus(response.createFormResult.formResult.rowId);
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
      {/* {!editable && (
        // TODO: add some margins, and disable the button while submitting
        <div>
          <Button style={{margin: '5px'}} onClick={() => setEditable(true)}>
            Edit
          </Button>
          <Button
            style={{margin: '5px 0px 5px 5px'}}
            onClick={() => onComplete({data: initialData})}
          >
            Submit
          </Button>
          <style jsx>
            {`
              div {
                display: flex;
                justify-content: flex-end;
              }
            `}
          </style>
        </div>
      )} */}
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
