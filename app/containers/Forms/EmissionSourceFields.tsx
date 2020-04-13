import React from 'react';
import {FieldProps} from 'react-jsonschema-form';
import {Col, Row} from 'react-bootstrap';

const EmissionSourceFields: React.FunctionComponent<FieldProps> = ({
  formData
}) => {
  return (
    <Row style={{margin: '20px 0 20px 0'}} className="SourceFieldHeading">
      <Col xs={12} md={4}>
        <h5 style={{textAlign: 'left'}}>{formData}</h5>
      </Col>
      <Col xs={12} md={3}>
        <h6>Tonnes</h6>
      </Col>
      <Col xs={12} md={2}>
        <h6>GWP</h6>
      </Col>
      <Col xs={12} md={3}>
        <h6>Tonnes (CO2e)</h6>
      </Col>
      <style jsx global>{`
        .hidden-title label {
          display: none;
        }
        .SourceFieldHeading {
          border-top: 4px solid #0000007a;
          padding: 30px 10px 10px 0px;
          margin-top: 30px !Important;
        }
      `}</style>
      <style jsx>{`
        h6 {
          text-align: center;
        }
        h5,
        h6 {
          color: #036;
        }
      `}</style>
    </Row>
  );
};

export default EmissionSourceFields;
