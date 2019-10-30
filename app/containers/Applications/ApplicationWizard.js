import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {graphql, createFragmentContainer} from 'react-relay';
import ApplicationFormNavbar from '../../components/Forms/ApplicationFormNavbar';
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
  const {wizard, application, formJson} = query || {};

  const router = useRouter();
  const {confirmationPage} = router.query;

  useEffect(() => {
    if (confirmationPage) return;
    if (!formJson)
      setRouterQueryParam(
        router,
        'formId',
        wizard.edges[0].node.formJsonByFormId.id,
        !formJson
        // If we're landing on the wizard page, the formJson isn't defined.
        // We want to trigger a replace instead of a push in that case
      );
  }, [confirmationPage, formJson, router, wizard.edges]);

  const onStepComplete = () => {
    for (let i = 0; i < wizard.edges.length; i++) {
      if (wizard.edges[i].node.formJsonByFormId.id === formJson.id) {
        // This is breaking in the nav beacause it is setting the router before it is going to the final page
        const goToConfirmation = i === wizard.edges.length - 1;
        const formId = goToConfirmation
          ? undefined
          : wizard.edges[i + 1].node.formJsonByFormId.id;
        setRouterQueryParam(router, 'formId', formId);
        if (goToConfirmation)
          setRouterQueryParam(router, 'confirmationPage', true);
      }
    }
  };

  if (!application) return <>This is not the application you are looking for</>;

  if (!wizard || !formJson) return null;

  const {
    prepopulateFromCiip,
    prepopulateFromSwrs,
    formJsonByFormId: {name}
  } = wizard.edges.find(
    ({node}) => node.formJsonByFormId.id === formJson.id
  ).node;

  return (
    <>
      <ApplicationFormNavbar
        router={router}
        setRouterQueryParam={setRouterQueryParam}
        wizard={wizard}
        confirmationPage={confirmationPage}
        application={application}
      />
      <ApplicationWizardStep
        query={query}
        prepopulateFromCiip={prepopulateFromCiip}
        prepopulateFromSwrs={prepopulateFromSwrs}
        formName={name}
        confirmationPage={confirmationPage}
        formJsonRowId={query.formJson.rowId}
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
        id
        rowId
        # get the formResult id here & add to query params, then get the result in wizardStep
      }
      formJson(id: $formId) {
        id # instead of this id
        rowId
      }
      wizard: allCiipApplicationWizards(orderBy: FORM_POSITION_ASC) {
        edges {
          node {
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
