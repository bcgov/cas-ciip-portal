import React from 'react';
import {useRouter} from 'next/router';
import {graphql, createFragmentContainer} from 'react-relay';
import ApplicationFormNavbar from 'components/Forms/ApplicationFormNavbar';
import {ApplicationWizard_query} from 'ApplicationWizard_query.graphql';
import ApplicationWizardStep from './ApplicationWizardStep';
import LoadingSpinner from 'components/LoadingSpinner';
import ApplicationDecision from 'components/Application/ApplicationDecision';

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
  loading: boolean;
}

/*
 * The ApplicationWizard container retrieves the ordered list of forms to render in the
 * application process. Each ApplicationWizardStep is rendered, and at the end the
 * ApplicationWizardConfirmation is rendered.
 */
export const ApplicationWizardComponent: React.FunctionComponent<Props> = ({
  query,
  loading
}) => {
  const {application} = query || {};
  const router = useRouter();
  const {formResultId} = router.query;
  const confirmationPage = Boolean(router.query.confirmationPage);
  const {
    orderedFormResults: {edges: orderedFormResults},
    latestDraftRevision,
    latestSubmittedRevision,
    applicationRevisionByStringVersionNumber: applicationRevision
  } = application;
  const reviewComments = query.application.reviewCommentsByApplicationId?.edges.map(
    ({node}) => node.description
  );
  const revisionInProgress =
    latestSubmittedRevision?.versionNumber < latestDraftRevision.versionNumber;

  // Redirect a reporter trying to edit an application revision that was already submitted
  if (applicationRevision.isImmutable) {
    if (
      latestDraftRevision.versionNumber > latestSubmittedRevision.versionNumber
    )
      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
          version: latestDraftRevision.versionNumber
        }
      });
    else
      router.replace({
        pathname: '/reporter/view-application',
        query: {
          ...router.query,
          version: latestSubmittedRevision.versionNumber
        }
      });
    return null;
  }

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

        if (!goToConfirmation)
          setRouterQueryParam(router, 'formResultId', formResultId);
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
        application={query.application}
        formResultId={formResultId as string}
        confirmationPage={confirmationPage}
        version={router.query.version as string}
      />
      {!loading && (
        <ApplicationWizardStep
          query={query}
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
    fragment ApplicationWizard_query on Query
    @argumentDefinitions(
      formResultId: {type: "ID!"}
      applicationId: {type: "ID!"}
      version: {type: "String!"}
    ) {
      application(id: $applicationId) {
        id
        currentUserCanEdit
        orderedFormResults(versionNumberInput: $version) {
          edges {
            node {
              id
            }
          }
        }
        latestDraftRevision {
          versionNumber
        }
        latestSubmittedRevision {
          versionNumber
        }
        applicationRevisionByStringVersionNumber(versionNumberInput: $version) {
          isImmutable
        }
        reviewCommentsByApplicationId(
          filter: {resolved: {isNull: true}, deletedBy: {isNull: true}}
        ) {
          edges {
            node {
              description
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
