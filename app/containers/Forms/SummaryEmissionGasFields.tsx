import React from 'react';
import {FieldProps} from 'react-jsonschema-form';
import {Form, Col} from 'react-bootstrap';

const EmissionGasFields: React.FunctionComponent<FieldProps> = props => {
  const {formContext} = props;

  const idString: any = props.idSchema.$id.replace(/^root_/g, '');
  const emissionIdString = idString.concat('_annualEmission');
  const annualIdString = idString.concat('_annualCO2e');
  let previousEmission;
  let previousAnnualCO2e;

  if (formContext.diffPathArray.includes(emissionIdString))
    previousEmission =
      formContext.diffArray[
        formContext.diffPathArray.indexOf(emissionIdString)
      ];
  if (
    previousEmission === undefined ||
    previousEmission === '' ||
    previousEmission === null
  )
    previousEmission = null;

  if (formContext.diffPathArray.includes(annualIdString))
    previousAnnualCO2e =
      formContext.diffArray[formContext.diffPathArray.indexOf(annualIdString)];
  if (
    previousAnnualCO2e === undefined ||
    previousAnnualCO2e === '' ||
    previousAnnualCO2e === null
  )
    previousAnnualCO2e = null;
  return (
    <Col xs={12} md={12}>
      <Form.Row>
        <Col md={4}>
          {props.formData.gasType} <br />
          <Col
            md={10}
            style={{margin: 0, padding: 0, color: '#888', lineHeight: '17px'}}
          >
            <small>{props.formData.gasDescription}</small>
          </Col>
        </Col>
        <Col md={3}>
          <strong>Tonnes:</strong>{' '}
          {formContext.showDiff &&
          (props.formData.annualEmission || previousEmission) ? (
            <>
              <span style={{backgroundColor: 'rgba(243,76,96, 0.3)'}}>
                {previousEmission ? previousEmission : <i>[No Data Entered]</i>}
              </span>
              &nbsp;---&gt;&nbsp;
              <span style={{backgroundColor: 'rgba(70,241,118, 0.3)'}}>
                {props.formData.annualEmission ? (
                  props.formData.annualEmission
                ) : (
                  <i>[No Data Entered]</i>
                )}
              </span>
            </>
          ) : (
            props.formData.annualEmission
          )}
        </Col>
        <Col md={3}>
          <strong>Tonnes(CO2e): </strong>
          {formContext.showDiff &&
          (props.formData.annualCO2e || previousAnnualCO2e) ? (
            <>
              <span style={{backgroundColor: 'rgba(243,76,96, 0.3)'}}>
                {previousAnnualCO2e ? (
                  previousAnnualCO2e
                ) : (
                  <i>[No Data Entered]</i>
                )}
              </span>
              &nbsp;---&gt;&nbsp;
              <span style={{backgroundColor: 'rgba(70,241,118, 0.3)'}}>
                {props.formData.annualCO2e ? (
                  props.formData.annualCO2e
                ) : (
                  <i>[No Data Entered]</i>
                )}
              </span>
            </>
          ) : (
            props.formData.annualCO2e
          )}
        </Col>
      </Form.Row>
      <style jsx>{`
        .gwp {
          list-style: none;
          display: inline-flex;
          padding: 0;
        }
        .gwp li {
          margin: 0 10px;
        }
      `}</style>
    </Col>
  );
};

export default EmissionGasFields;
