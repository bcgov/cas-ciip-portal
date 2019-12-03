import React, {useRef} from 'react';
import SignaturePad from 'react-signature-canvas';
import {Button, Container, Row, Col} from 'react-bootstrap';

const CertificationSignature: React.FunctionComponent = () => {
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
  const save = () =>
    console.log(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));

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
          <input type="file" onChange={e => uploadImage(e)} />
        </Col>
        <Col md={{span: 3, offset: 2}}>
          <Button style={{marginRight: '5px'}} onClick={save}>
            Save
          </Button>
          <Button onClick={clear}>Clear</Button>
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

export default CertificationSignature;
