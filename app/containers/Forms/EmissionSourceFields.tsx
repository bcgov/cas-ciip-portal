import React from 'react';
import {FieldProps} from 'react-jsonschema-form';
import {Col, Row} from 'react-bootstrap';

const EmissionSourceFields: React.FunctionComponent<FieldProps> = ({
  formData
}) => {
  return (
    <Row style={{margin: '20px 0 20px 0'}} className="source-field-heading">
      <Col xs={12} md={4}>
        <h2 style={{textAlign: 'left'}}>{formData}</h2>
      </Col>
      <Col xs={12} md={3}>
        <p className="unit">Tonnes</p>
      </Col>
      <Col xs={12} md={2}>
        <p className="unit">GWP</p>
      </Col>
      <Col xs={12} md={3}>
        <p className="unit">Tonnes (CO2e)</p>
      </Col>
      <style jsx global>{`
        .hidden-title label {
          display: none;
        }
        .source-field-heading {
          border-top: 4px solid #0000007a;
          padding: 30px 10px 10px 0px;
          margin-top: 30px !important;
          width: 100%;
        }
      `}</style>
      <style jsx>{`
        .unit {
          text-align: center;
        }
        h5,
        .unit {
          color: #036;
          font-weight: 500;
        }
        h2 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </Row>
  );
};

export default EmissionSourceFields;
