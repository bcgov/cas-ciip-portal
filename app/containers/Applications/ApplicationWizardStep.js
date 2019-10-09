import React from 'react';
import FormLoaderContainer from '../Forms/FormLoaderContainer';

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
