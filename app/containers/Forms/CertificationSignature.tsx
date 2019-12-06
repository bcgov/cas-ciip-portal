import React, {useRef} from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import SignaturePad from 'react-signature-canvas';
import Link from 'next/link';
import {Button, Container, Row, Col} from 'react-bootstrap';
import updateApplicationMutation from 'mutations/application/updateApplicationMutation';
import updateApplicationStatusMutation from 'mutations/application/updateApplicationStatusMutation';
import {CertificationSignature_application} from 'CertificationSignature_application.graphql';

interface Props {
  application: CertificationSignature_application;
  user: number;
  relay: RelayProp;
}

const CertificationSignature: React.FunctionComponent<Props> = props => {
  const sigCanvas: any = useRef({});

  const uploadImage = e => {
    e.persist();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64 = reader.result;
      sigCanvas.current.fromDataURL(base64);
    };
  };

  const clear = () => sigCanvas.current.clear();
  const saveSignature = async () => {
    const signature = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL('image/png');
    const {environment} = props.relay;
    const variables = {
      input: {
        id: props.application.id,
        applicationPatch: {
          certificationSignature: signature,
          certifiedByUser: props.user
        }
      }
    };
    const response = await updateApplicationMutation(environment, variables);
    console.log(response);
  };

  const submitApplication = async () => {
    const {environment} = props.relay;
    const variables = {
      input: {
        id: props.application.applicationStatus.id,
        applicationStatusPatch: {
          applicationStatus: 'pending'
        }
      }
    };
    const response = await updateApplicationStatusMutation(
      environment,
      variables
    );
    console.log(response);
  };

  return (
    <Container>
      <h3>Certifier Signature:</h3>
      <Row>
        <Col md={12}>
          <SignaturePad
            ref={sigCanvas}
            canvasProps={{className: 'signatureCanvas'}}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          {props.application.certificationSignature ? (
            <span style={{color: 'green'}}>Signed Successfully!</span>
          ) : (
            <input
              accept="image/*"
              type="file"
              onChange={e => uploadImage(e)}
            />
          )}
        </Col>
        <Col md={{span: 3, offset: 2}}>
          {props.application.certificationSignature ? (
            <Link
              passHref
              href={{
                pathname: '/complete-submit'
              }}
            >
              <Button
                className="float-right"
                style={{marginTop: '10px'}}
                onClick={submitApplication}
              >
                Submit Application
              </Button>
            </Link>
          ) : (
            <>
              <Button
                variant="success"
                style={{marginRight: '5px'}}
                onClick={saveSignature}
              >
                Sign
              </Button>
              <Button variant="danger" onClick={clear}>
                Clear
              </Button>
            </>
          )}
        </Col>
      </Row>
      <style jsx global>
        {`
          .signatureCanvas {
            border: 1px solid #bbb;
            background: #eee;
            border-radius: 6px;
            margin-bottom: 60px;
          }
        `}
      </style>
    </Container>
  );
};

export default createFragmentContainer(CertificationSignature, {
  application: graphql`
    fragment CertificationSignature_application on Application {
      id
      certificationSignature
      applicationStatus {
        id
      }
    }
  `
});
