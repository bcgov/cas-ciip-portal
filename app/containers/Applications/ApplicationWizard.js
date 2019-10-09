import React, {useState} from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import ApplicationWizardStep from './ApplicationWizardStep';
import ApplicationWizardConfirmation from './ApplicationWizardConfirmation';

const ApplicationWizard = ({query}) => {
  const {wizard} = query || {};

  const [renderFinalPage, setRenderFinalPage] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const onStepComplete = () => {
    if (currentStep < wizard.edges.length - 1) setCurrentStep(currentStep + 1);
    else setRenderFinalPage(true);
  };

  if (!wizard) return null;

  if (renderFinalPage) return <ApplicationWizardConfirmation />;

  const {formId, prepopulateFromCiip, prepopulateFromSwrs} = wizard.edges[
    currentStep
  ].node;

  return (
    <>
      <ApplicationWizardStep
        query={query}
        formId={formId}
        prepopulateFromCiip={prepopulateFromCiip}
        prepopulateFromSwrs={prepopulateFromSwrs}
        onStepComplete={onStepComplete}
      />
    </>
  );
};

export default createFragmentContainer(ApplicationWizard, {
  query: graphql`
    fragment ApplicationWizard_query on Query
      @argumentDefinitions(formCondition: {type: "FormJsonCondition"}) {
      wizard: allCiipApplicationWizards(orderBy: FORM_POSITION_ASC) {
        edges {
          node {
            formId
            prepopulateFromCiip
            prepopulateFromSwrs
          }
        }
      }
      ...FormLoaderContainer_query @arguments(condition: $formCondition)
    }
  `
});
