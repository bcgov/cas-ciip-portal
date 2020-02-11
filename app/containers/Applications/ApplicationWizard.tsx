import React from 'react';
import {useRouter} from 'next/router';
import {graphql, createFragmentContainer} from 'react-relay';
import ApplicationFormNavbar from 'components/Forms/ApplicationFormNavbar';
import ApplicationWizardStep from './ApplicationWizardStep';

const setRouterQueryParam = (router, key, value, replace = false) => {
  const newUrl = {
    pathname: router.pathname,
    query: {
      ...router.query,
      [key]: value
    }
  };
  if (replace) router.replace(newUrl, newUrl, {shallow: true});
  else router.push(newUrl, newUrl, {shallow: true});
};

/*
 * The ApplicationWizard container retrieves the ordered list of forms to render in the
 * application process. Each ApplicationWizardStep is rendered, and at the end the
 * ApplicationWizardConfirmation is rendered.
 */
const ApplicationWizard = ({query}) => {
  const {application} = query || {};
  const router = useRouter();
  const {formResultId} = router.query;
  const confirmationPage = Boolean(router.query.confirmationPage);
  const orderedFormResults = application.orderedFormResults.edges;

  if (!confirmationPage && !formResultId) {
    setRouterQueryParam(
      router,
      'formResultId',
      orderedFormResults[0].node.id,
      true
      // If we're landing on the wizard page
      // We want to trigger a replace instead of a push in that case
    );
    return null;
  }

  const onStepComplete = () => {
    for (let i = 0; i < orderedFormResults.length; i++) {
      if (orderedFormResults[i].node.id === formResultId) {
        const goToConfirmation = i === orderedFormResults.length - 1;
        const formResultId = goToConfirmation
          ? undefined
          : orderedFormResults[i + 1].node.id;
        setRouterQueryParam(router, 'formResultId', formResultId);
        if (goToConfirmation) {
          router.query.formResultId = formResultId;
          setRouterQueryParam(router, 'confirmationPage', true);
        }
      }
    }
  };

  const onStepBack = () => {
    for (let i = 0; i < orderedFormResults.length; i++) {
      if (orderedFormResults[i].node.id === formResultId) {
        setRouterQueryParam(
          router,
          'formResultId',
          orderedFormResults[i - 1].node.id
        );
      }
    }
  };

  if (!application) return <>This is not the application you are looking for</>;
  return (
    <>
      <ApplicationFormNavbar
        application={query.application}
        formResultId={formResultId as string}
        confirmationPage={confirmationPage}
        version={router.query.version as string}
      />
      <ApplicationWizardStep
        query={query}
        confirmationPage={confirmationPage}
        onStepComplete={onStepComplete}
        onStepBack={onStepBack}
      />
    </>
  );
};

export default createFragmentContainer(ApplicationWizard, {
  query: graphql`
    fragment ApplicationWizard_query on Query
      @argumentDefinitions(
        formResultId: {type: "ID!"}
        applicationId: {type: "ID!"}
        version: {type: "String!"}
      ) {
      application(id: $applicationId) {
        id
        orderedFormResults(versionNumberInput: $version) {
          edges {
            node {
              id
            }
          }
        }
        ...ApplicationFormNavbar_application
      }
      ...ApplicationWizardStep_query
        @arguments(
          formResultId: $formResultId
          applicationId: $applicationId
          version: $version
        )
    }
  `
});
