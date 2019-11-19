import React from 'react';
import {FieldProps} from 'react-jsonschema-form';

const EmissionSourceFields: React.FunctionComponent<FieldProps> = ({
  formData
}) => {
  return (
    <>
      <h5 style={{textAlign: 'left'}}>{formData}</h5>
      <style jsx global>{`
        .hidden-title label {
          display: none;
        }
      `}</style>
      <style jsx>{`
        h6 {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default EmissionSourceFields;
