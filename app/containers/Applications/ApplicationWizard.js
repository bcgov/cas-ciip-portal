import {format} from 'url';
import React, {useState, useEffect, useCallback} from 'react';
import {useRouter} from 'next/router';
import {graphql, createFragmentContainer} from 'react-relay';
import ApplicationWizardStep from './ApplicationWizardStep';
import ApplicationWizardConfirmation from './ApplicationWizardConfirmation';

/*
 * The ApplicationWizard container retrieves the ordered list of forms to render in the
 * application process. Each ApplicationWizardStep is rendered, and at the end the
 * ApplicationWizardConfirmation is rendered.
 */
const ApplicationWizard = ({query}) => {
  const {wizard, application, formJson} = query || {};

  const [renderFinalPage, setRenderFinalPage] = useState(false);

  const router = useRouter();

  const setFormId = useCallback(formId => {
    const newUrl = format({
      pathname: router.pathname,
      query: {
        ...router.query,
        formId
      }
    });
    const as = newUrl;
    if (formJson) router.push(newUrl, as, {shallow: true});
    else router.replace(newUrl, as, {shallow: true});
  });

  useEffect(() => {
    if (renderFinalPage) return;
    if (!formJson) setFormId(wizard.edges[0].node.formJsonByFormId.id);
  }, [formJson, renderFinalPage, setFormId, wizard.edges]);

  const onStepComplete = () => {
    for (let i = 0; i < wizard.edges.length; i++) {
      if (wizard.edges[i].node.formJsonByFormId.id === formJson.id) {
        // TODO: handle final page
        setFormId(wizard.edges[i + 1].node.formJsonByFormId.id);
      }
    }
  };

  if (!application) return <>This is not the application you are looking for</>;

  if (!wizard || !formJson) return null;

  if (renderFinalPage) return <ApplicationWizardConfirmation />;

  const {
    prepopulateFromCiip,
    prepopulateFromSwrs,
    formJsonByFormId: {name}
  } = wizard.edges.find(
    ({node}) => node.formJsonByFormId.id === formJson.id
  ).node;

  return (
    <>
      <ApplicationWizardStep
        query={query}
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
      formJson(id: $formId) {
        id
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
