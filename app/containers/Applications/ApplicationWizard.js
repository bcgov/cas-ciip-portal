import React, {useState} from 'react';
import Router from 'next/router';
import {graphql, createFragmentContainer} from 'react-relay';
import ApplicationWizardStep from './ApplicationWizardStep';
import ApplicationWizardConfirmation from './ApplicationWizardConfirmation';

/*
 * The ApplicationWizard container retrieves the ordered list of forms to render in the
 * application process. Each ApplicationWizardStep is rendered, and at the end the
 * ApplicationWizardConfirmation is rendered.
 */
const ApplicationWizard = ({query}) => {
  const {wizard, application} = query || {};

  const [renderFinalPage, setRenderFinalPage] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const onStepComplete = () => {
    if (currentStep < wizard.edges.length - 1) setCurrentStep(currentStep + 1);
    else setRenderFinalPage(true);
  };

  if (!application) return <>This is not the application you are looking for</>;

  if (!wizard) return null;

  if (renderFinalPage) return <ApplicationWizardConfirmation />;

  const {
    formId,
    prepopulateFromCiip,
    prepopulateFromSwrs,
    formJsonByFormId: {name}
  } = wizard.edges[currentStep].node;

  return (
    <>
      <ApplicationWizardStep
        query={query}
        formId={formId}
        prepopulateFromCiip={prepopulateFromCiip}
        prepopulateFromSwrs={prepopulateFromSwrs}
        formName={name}
        onStepComplete={onStepComplete}
      />
    </>
  );
};

export default createFragmentContainer(ApplicationWizard, {
  query: graphql`
    fragment ApplicationWizard_query on Query
      @argumentDefinitions(
        formId: {type: "ID!"}
        applicationId: {type: "ID!"}
      ) {
      application(id: $applicationId) {
        __typename
      }

      wizard: allCiipApplicationWizards(orderBy: FORM_POSITION_ASC) {
        edges {
          node {
            formId
            prepopulateFromCiip
            prepopulateFromSwrs
            formJsonByFormId {
              id
              name
            }
          }
        }
      }
      ...ApplicationWizardStep_query
        @arguments(formId: $formId, applicationId: $applicationId)
    }
  `
});
