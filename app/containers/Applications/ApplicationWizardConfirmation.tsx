import React, {useRef, useState} from 'react';
import {Button, Row} from 'react-bootstrap';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import SubmitApplication from 'components/SubmitApplication';
import {ApplicationWizardConfirmation_query} from 'ApplicationWizardConfirmation_query.graphql';
import createCertificationUrlMutation from '../../mutations/form/createCertificationUrl';
import ApplicationDetailsContainer from './ApplicationDetailsContainer';
/*
 * The ApplicationWizardConfirmation renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */

interface Props {
  query: ApplicationWizardConfirmation_query;
  relay: RelayProp;
}

export const ApplicationWizardConfirmationComponent: React.FunctionComponent<Props> = props => {
  const [copySuccess, setCopySuccess] = useState('');
  const [url, setUrl] = useState();
  const copyArea = useRef(url);

  const copyToClipboard = () => {
    const el = copyArea;
    el.current.select();
    document.execCommand('copy');
    setCopySuccess('Copied!');
  };

  const createCertificationUrl = async () => {
    const {environment} = props.relay;
    const variables = {
      input: {
        certificationUrl: {
          /**  The rowId in ggircs_portal.certification_url is the primary key (thus required in the relay variables)
               but the actual rowId is generated on the postgres level with a trigger, so a placeholder rowId is set here */
          rowId: 'placeholder',
          applicationId: props.query.application.rowId
        }
      }
    };
    const response = await createCertificationUrlMutation(
      environment,
      variables
    );
    console.log(response);
    if (window) {
      setUrl(
        `${window.location.host}/certification-redirect?rowId=${response.createCertificationUrl.certificationUrl.rowId}&id=${props.query.application.id}`
      );
    } else console.log('No window location found');
  };

  return (
    <>
      <h1>Summary of your application:</h1>
      <h5>
        Please review the information you have provided before continuing.
      </h5>
      <br />

      <ApplicationDetailsContainer isAnalyst={false} query={props.query} />
      <br />
      {props.query.application.certificationSignature ? (
        <>
          <h5>
            Thank you for reviewing the application information. The Certifier
            has signed off on this application. You may now submit the
            application.
          </h5>
          <br />
          <SubmitApplication application={props.query.application} />
        </>
      ) : (
        <>
          <h5>
            Thank you for reviewing the application information. You may now
            generate a Certification page to be signed prior to submission.
          </h5>
          <br />
          <Row>
            <Button onClick={createCertificationUrl}>
              Generate Certification Page
            </Button>
          </Row>
          <br />
          <Row>
            <input
              ref={copyArea}
              readOnly
              style={{width: '50%', marginRight: '10px'}}
              value={url}
            />
            <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
            <span style={{color: 'green'}}>{copySuccess}</span>
          </Row>{' '}
        </>
      )}
    </>
  );
};

export default createFragmentContainer(ApplicationWizardConfirmationComponent, {
  query: graphql`
    fragment ApplicationWizardConfirmation_query on Query
      @argumentDefinitions(applicationId: {type: "ID!"}) {
      application(id: $applicationId) {
        id
        rowId
        certificationSignature
        applicationStatus {
          id
        }
        ...SubmitApplication_application
      }
      ...ApplicationDetailsContainer_query
        @arguments(applicationId: $applicationId)
    }
  `
});
