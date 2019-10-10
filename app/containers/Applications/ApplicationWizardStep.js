import React from 'react';
import FormLoaderContainer from '../Forms/FormLoaderContainer';

/*
 * The ApplicationWizardStep renders a form and, where applicable,
 * (TODO) starts by presenting a summary of existing data to the user
 * (TODO) this stub should still be a fragment container so it is responsible for
 * aggregating all required sub fragments
 */
const ApplicationWizardStep = ({query, formId, onStepComplete}) => {
  return (
    <FormLoaderContainer
      query={query}
      formId={formId}
      onFormComplete={onStepComplete}
    />
  );
};

export default ApplicationWizardStep;
