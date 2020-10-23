import React, {useRef} from 'react';
import {useRouter} from 'next/router';
import {createFragmentContainer, RelayProp} from 'react-relay';
import SignaturePad from 'react-signature-canvas';
import {Button, Container, Row, Col} from 'react-bootstrap';
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
  const router = useRouter();

  const readImage = (e) => {
    e.persist();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const canvasWidth = sigCanvas?.current?._canvas?.width;
    const canvasHeight = sigCanvas?.current?._canvas?.height;
    reader.onloadend = () => {
      const base64 = reader.result;
      // Ensure signature file does not exceed size of the canvas
      sigCanvas.current.fromDataURL(base64, {
        width: canvasWidth * 0.75 || 500,
        height: canvasHeight * 0.75 || 200
      });
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
          },
          messages: {
            success: 'Signed Successfully! Redirecting to requests page'
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
    } else router.push('/certifier/requests');
  };

  return (
    <Container id="signature-component">
      <h3>Certifier Signature:</h3>
      <p>
        To create a digital signature, click, hold and drag your pointer within
        the box to draw your signature. Use the Clear button below the signature
        box to delete the signature and start again. Alternatively, you can
        select &quot;Choose File&quot; to upload an existing signature image
        file from your computer (.png, .jpg, .jpeg). When you&apos;re ready to
        submit your certification, click &quot;Sign&quot; below the signature
        box.
      </p>
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
            <label>
              Upload an existing signature image:
              <input
                accept="image/*"
                type="file"
                onChange={(e) => readImage(e)}
              />
            </label>
          )}
        </Col>
        <Col md={{offset: 2, span: 3}}>
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
          @media print {
            #signature-component {
              display: none !important;
            }
          }
        `}
      </style>
    </Container>
  );
};

export default createFragmentContainer(CertificationSignature, {});
