import React, {useState} from 'react';
import {FieldProps} from 'react-jsonschema-form';
import ObjectField from 'react-jsonschema-form/lib/components/fields/ObjectField';
import {Button, Col} from 'react-bootstrap';

/**
 * This custom ObjectField component injects the read-only data for a product when the
 * product id changes
 */
export const EmissionFieldComponent: React.FunctionComponent<FieldProps> = props => {
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
        `}
      </style>
    </div>
  );
};

export default EmissionFieldComponent;
