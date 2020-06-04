import React, {useRef} from 'react';
import {createFragmentContainer, RelayProp} from 'react-relay';
import SignaturePad from 'react-signature-canvas';
import {Button, Container, Row, Col} from 'react-bootstrap';
import updateCertificationUrlMutation from 'mutations/form/updateCertificationUrlMutation';

interface Props {
  relay: RelayProp;
  submitted?: boolean;
  certificationIdsToSign: string[];
}

export const CertificationSignature: React.FunctionComponent<Props> = ({
  relay,
  certificationIdsToSign,
  submitted = false
}) => {
  const sigCanvas: any = useRef({});

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

  const saveSignatures = (signature) => {
    const {environment} = relay;
    certificationIdsToSign.forEach(async function (id) {
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
      console.log(response);
    });
  };

  const toDataURL = async () => {
    const signature = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL('image/png');
    saveSignatures(signature);
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
        <Col md={{span: 3, offset: 2}}>
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
