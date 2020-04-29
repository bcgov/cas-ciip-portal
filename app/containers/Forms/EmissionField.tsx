import React, {useState} from 'react';
import {FieldProps} from 'react-jsonschema-form';
import ObjectField from 'react-jsonschema-form/lib/components/fields/ObjectField';
import {Button, Col} from 'react-bootstrap';

/**
 * This custom ObjectField component injects the read-only data for a product when the
 * product id changes
 */
export const EmissionFieldComponent: React.FunctionComponent<FieldProps> = (
  props
) => {
  const [hideZeroEmissions, setHideZeroEmissions] = useState(
    'show-zero-emissions'
  );
  const toggleZeroEmissions = () => {
    setHideZeroEmissions(hideZeroEmissions === '' ? 'show-zero-emissions' : '');
  };

  return (
    <div className={hideZeroEmissions}>
      <Col md={12} className="emission-toggle">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={toggleZeroEmissions}
        >
          {hideZeroEmissions === ''
            ? 'Show gases with no reported emissions'
            : 'Hide gases with no reported emissions'}
        </Button>
      </Col>
      <ObjectField {...props} />
      <style jsx global>
        {`
          .emission-toggle {
            text-align: right;
            position: relative;
            top: -52px;
          }
          .emission .zero-emission,
          .emission-form .zero-emission {
            display: none !important;
          }

          .emission-form .show-zero-emissions .zero-emission {
            display: block !important;
          }
          .emission .emission-row {
            display: none !important;
          }

          .emission-form .field-array hr {
            display: none !important;
          }
          .emission-form .form-group {
            margin-bottom: 0;
          }

          .emission-row {
            margin-bottom: 1.5em;
            border-bottom: 1px solid #dcdcdc;
            padding-bottom: 20px !important;
          }

          .emission-form .form-submit {
            margin-top: 100px;
          }
        `}
      </style>
    </div>
  );
};

export default EmissionFieldComponent;
