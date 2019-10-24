import React, {useEffect} from 'react';
import {useRouter, NextRouter} from 'next/router';
import {graphql, createFragmentContainer} from 'react-relay';
import ApplicationWizardStep from './ApplicationWizardStep';
import ApplicationWizardConfirmation from './ApplicationWizardConfirmation';
import {ApplicationWizard_query} from './__generated__/ApplicationWizard_query.graphql';

const setRouterQueryParam = (
  router: NextRouter,
  key: string,
  value: string,
  replace = false
): void => {
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

type Props = {
  query: ApplicationWizard_query;
};

/*
 * The ApplicationWizard container retrieves the ordered list of forms to render in the
 * application process. Each ApplicationWizardStep is rendered, and at the end the
 * ApplicationWizardConfirmation is rendered.
 */
const ApplicationWizard: React.SFC<Props> = ({query}) => {
  const {wizard, application, formJson} = query;

  const router = useRouter();
  const confirmationPage = router.query.confirmationPage === 'true';

  useEffect(() => {
    if (confirmationPage) return;
    if (formJson === undefined)
      setRouterQueryParam(
        router,
        'formId',
        wizard.edges[0].node.formJsonByFormId.id,
        true
        // If we're landing on the wizard page, the formJson isn't defined.
        // We want to trigger a replace instead of a push in that case
      );
  }, [confirmationPage, formJson, router, wizard.edges]);

  const onStepComplete = (): void => {
    for (let i = 0; i < wizard.edges.length; i++) {
      if (wizard.edges[i].node.formJsonByFormId.id === formJson.id) {
        const goToConfirmation = i === wizard.edges.length - 1;
        const formId = goToConfirmation
          ? undefined
          : wizard.edges[i + 1].node.formJsonByFormId.id;
        setRouterQueryParam(router, 'formId', formId);
        if (goToConfirmation)
          setRouterQueryParam(router, 'confirmationPage', 'true');
      }
    }
  };

  if (application === undefined)
    return <>This is not the application you are looking for</>;

  if (wizard === undefined || formJson === undefined) return null;

  if (confirmationPage) return <ApplicationWizardConfirmation />;

  const {
    prepopulateFromSwrs,
    formJsonByFormId: {name}
  } = wizard.edges.find(
    ({node}) => node.formJsonByFormId.id === formJson.id
  ).node;

  return (
    <>
      <ApplicationWizardStep
        query={query}
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
      formJson(id: $formId) {
        id
      }
      wizard: allCiipApplicationWizards(orderBy: FORM_POSITION_ASC) {
        edges {
          node {
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
