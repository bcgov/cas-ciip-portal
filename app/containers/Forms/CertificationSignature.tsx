import React from 'react';
import SignaturePad from 'react-signature-canvas';

const CertificationSignature: React.FunctionComponent = () => {
  return (
    <>
      <h3>Certifier Signature:</h3>
      <SignaturePad canvasProps={{className: 'signatureCanvas'}} />
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
    </>
  );
};

export default CertificationSignature;
