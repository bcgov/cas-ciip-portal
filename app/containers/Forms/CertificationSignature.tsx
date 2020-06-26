import React, {useRef, useState} from 'react';
import {useRouter} from 'next/router';
import {createFragmentContainer, RelayProp} from 'react-relay';
import SignaturePad from 'react-signature-canvas';
import {Button, Container, Row, Col, Toast} from 'react-bootstrap';
import updateCertificationUrlMutation from 'mutations/form/updateCertificationUrlMutation';
import {updateCertificationUrlMutationResponse} from '__generated__/updateCertificationUrlMutation.graphql';

interface Props {
  relay: RelayProp;
  submitted?: boolean;
  certificationIdsToSign: string[];
  reportSubmissions?: (
    responses: updateCertificationUrlMutationResponse[]
  ) => void;
}

export const CertificationSignature: React.FunctionComponent<Props> = ({
  relay,
  certificationIdsToSign,
  submitted = false,
  reportSubmissions
}) => {
  const sigCanvas: any = useRef({});
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const readImage = (e) => {
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

  const saveSignatures = async function (signature) {
    const {environment} = relay;
    return Promise.all(
      certificationIdsToSign.map(async function (id) {
        const variables = {
          input: {
            id,
            certificationUrlPatch: {
              certificationSignature: signature
            }
          }
        };
        const response = await updateCertificationUrlMutation(
          environment,
          variables
        );
        return response;
      })
    );
  };

  const toDataURL = async () => {
    const signature = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL('image/png');
    const responses = await saveSignatures(signature);
    if (reportSubmissions) {
      reportSubmissions(responses);
    } else setShowToast(true);
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
          {submitted ? (
            <span style={{color: 'green'}}>Signed Successfully!</span>
          ) : (
            <input
              accept="image/*"
              type="file"
              onChange={(e) => readImage(e)}
            />
          )}
        </Col>
        <Col md={3}>
          <Toast
            autohide
            show={showToast}
            delay={2000}
            onClose={async () => router.push('/certifier/requests')}
          >
            <Toast.Body style={{textAlign: 'center'}}>
              <p style={{color: 'green'}}>Signed successfully!</p>
              <p style={{color: 'black'}}>Redirecting to request list..</p>
            </Toast.Body>
          </Toast>
        </Col>
        <Col md={3}>
          {!submitted && (
            <>
              <Button
                variant="success"
                style={{marginRight: '5px'}}
                onClick={toDataURL}
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
            padding: 30px;
            width: 80%;
            background: #eee;
            border-radius: 6px;
            margin-bottom: 60px;
          }
        `}
      </style>
    </Container>
  );
};

export default createFragmentContainer(CertificationSignature, {});
