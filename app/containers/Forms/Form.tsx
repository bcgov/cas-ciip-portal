import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import Alert from 'react-bootstrap/Alert';
import SurveyWrapper from '../../components/Survey/SurveyWrapper';
import FormWithProductUnits from './FormWithProductUnits';
import FormWithFuelUnits from './FormWithFuelUnits';

export const FormComponent = ({
  query,
  initialData,
  initialDataSource,
  onComplete,
  onValueChanged
}) => {
  const {result} = query || {};

  if (!result) return null;
  const {
    formJsonByFormId: {formJson}
  } = result;
  return (
    <>
      {initialData && Object.keys(initialData).length > 0 && initialDataSource && (
        <>
          <Alert variant="info">
            We filled this form for you with the data coming from{' '}
            {initialDataSource}. Please review it and either submit or edit it.
          </Alert>
        </>
      )}
      <FormWithFuelUnits query={query} formJson={formJson}>
        <FormWithProductUnits query={query} formJson={formJson}>
          {/*
          // @ts-ignore formJson is injected by FormWithProductUnits */}
          <SurveyWrapper
            initialData={initialData}
            onComplete={onComplete}
            onValueChanged={onValueChanged}
          />
        </FormWithProductUnits>
      </FormWithFuelUnits>
    </>
  );
};

export default createFragmentContainer(FormComponent, {
  query: graphql`
    fragment Form_query on Query
      @argumentDefinitions(formResultId: {type: "ID!"}) {
      ...FormWithProductUnits_query
      ...FormWithFuelUnits_query
      result: formResult(id: $formResultId) {
        formJsonByFormId {
          formJson
        }
      }
    }
  `
});
