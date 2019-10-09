import React from 'react';
import FormLoaderContainer from '../Forms/FormLoaderContainer';

/*
 * The ApplicationWizardStep renders a form and, where applicable,
 * (TODO) starts by presenting a summary of existing data to the user
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
