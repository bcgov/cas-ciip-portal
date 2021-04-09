import React, {useMemo} from 'react';
import {useRouter} from 'next/router';
import {graphql, createFragmentContainer} from 'react-relay';
import ApplicationFormNavbar from 'components/Forms/ApplicationFormNavbar';
import {ApplicationWizard_query} from 'ApplicationWizard_query.graphql';
import ApplicationWizardStep from './ApplicationWizardStep';
import LoadingSpinner from 'components/LoadingSpinner';
import ApplicationDecision from 'components/Application/ApplicationDecision';
import {ApplicationWizard_applicationRevision} from '__generated__/ApplicationWizard_applicationRevision.graphql';

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

interface Props {
  query: ApplicationWizard_query;
  applicationRevision: ApplicationWizard_applicationRevision;
  loading: boolean;
}

/*
 * The ApplicationWizard container retrieves the ordered list of forms to render in the
 * application process. Each ApplicationWizardStep is rendered, and at the end the
 * ApplicationWizardConfirmation is rendered.
 */
export const ApplicationWizardComponent: React.FunctionComponent<Props> = ({
  query,
  applicationRevision,
  loading
}) => {
  const router = useRouter();
  const {formId} = router.query;
  const confirmationPage = Boolean(router.query.confirmationPage);
  const {
    orderedFormResults: {edges: orderedFormResults},
    applicationByApplicationId
  } = applicationRevision;
  const reviewSteps =
    applicationByApplicationId?.applicationReviewStepsByApplicationId.edges;
  // Merge review comments from all applicationReviewSteps into one list:
  const reviewComments = reviewSteps.reduce((mergedStepComments, step) => {
    const stepComments =
      step.node.reviewCommentsByApplicationReviewStepId.edges;
    return [
      ...mergedStepComments,
      ...stepComments.map((step) => step.node.description)
    ];
  }, []);
  const revisionInProgress = applicationRevision.versionNumber > 1;

  const formResult = useMemo(() => {
    if (!formId) return null;
    return orderedFormResults.find(
      ({node}) => formId === node.formJsonByFormId.id
    );
  }, [orderedFormResults, formId]);

  if (!confirmationPage && !formResult) {
    setRouterQueryParam(
      router,
      'formId',
      orderedFormResults[0].node.formJsonByFormId.id,
      true
      // If we're landing on the wizard page
      // We want to trigger a replace instead of a push in that case
    );
    return null;
  }

  const onStepComplete = () => {
    for (let i = 0; i < orderedFormResults.length; i++) {
      if (orderedFormResults[i].node.formJsonByFormId.id === formId) {
        const goToConfirmation = i === orderedFormResults.length - 1;
        const formId = goToConfirmation
          ? undefined
          : orderedFormResults[i + 1].node.formJsonByFormId.id;

        if (!goToConfirmation) setRouterQueryParam(router, 'formId', formId);
        else {
          const url = {
            pathName: router.pathname,
            query: {
              ...router.query,
              formResultId: undefined,
              confirmationPage: true
            }
          };
          router.push(url, url, {shallow: true});
        }
      }
    }
  };

  const review = revisionInProgress ? (
    <ApplicationDecision
      actionRequired
      decision="REQUESTED_CHANGES"
      reviewComments={reviewComments}
    />
  ) : null;

  return (
    <>
      <ApplicationFormNavbar
        applicationRevision={applicationRevision}
        selectedFormId={formId as string}
        confirmationPage={confirmationPage}
      />
      {!loading && (
        <ApplicationWizardStep
          query={query}
          applicationRevision={applicationRevision}
          formResult={formResult}
          confirmationPage={confirmationPage}
          onStepComplete={onStepComplete}
          review={review}
        />
      )}
      {loading && <LoadingSpinner />}
    </>
  );
};

export default createFragmentContainer(ApplicationWizardComponent, {
  query: graphql`
    fragment ApplicationWizard_query on Query {
      ...ApplicationWizardStep_query
    }
  `,
  applicationRevision: graphql`
    fragment ApplicationWizard_applicationRevision on ApplicationRevision {
      ...ApplicationFormNavbar_applicationRevision
      ...ApplicationWizardStep_applicationRevision
      versionNumber
      applicationByApplicationId {
        applicationReviewStepsByApplicationId {
          edges {
            node {
              reviewCommentsByApplicationReviewStepId(
                filter: {resolved: {isNull: true}, deletedBy: {isNull: true}}
              ) {
                edges {
                  node {
                    description
                  }
                }
              }
            }
          }
        }
      }
      orderedFormResults {
        edges {
          node {
            formJsonByFormId {
              id
            }
            ...ApplicationWizardStep_formResult
          }
        }
      }
    }
  `
});
