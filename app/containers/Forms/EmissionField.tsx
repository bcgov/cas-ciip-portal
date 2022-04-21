import React, { useState } from "react";
import { FieldProps } from "@rjsf/core";
import ObjectField from "@rjsf/core/dist/cjs/components/fields/ObjectField";
import { Button, Col, Row } from "react-bootstrap";
import NumberFormat from "react-number-format";
interface Props extends FieldProps {
  totalOnsiteEmissions: number;
}

/**
 * This custom ObjectField component injects the read-only data for a product when the
 * product id changes
 */
export const EmissionFieldComponent: React.FunctionComponent<Props> = (
  props
) => {
  const [hideZeroEmissions, setHideZeroEmissions] = useState(
    "show-zero-emissions"
  );
  const toggleZeroEmissions = () => {
    setHideZeroEmissions(hideZeroEmissions === "" ? "show-zero-emissions" : "");
  };

  return (
    <Col md={12} className={hideZeroEmissions}>
      <Row className="emission-header">
        <Col md={8}>
          Total On-site Emissions (excl. CO2BioC):{" "}
          <NumberFormat
            thousandSeparator
            decimalScale={4}
            value={props.totalOnsiteEmissions}
            displayType="text"
          />{" "}
          tCO2e
        </Col>
        <Col className="emission-toggle">
          <Button
            variant="outline-dark"
            size="sm"
            onClick={toggleZeroEmissions}
          >
            {hideZeroEmissions === ""
              ? "Show gases with no reported emissions"
              : "Hide gases with no reported emissions"}
          </Button>
        </Col>
      </Row>

      <ObjectField {...props} />
      <style jsx global>
        {`
          .emission-header {
            margin: 1.5em 0 0.5em 0;
          }
          .emission-toggle {
            text-align: right;
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
    </Col>
  );
};

export default EmissionFieldComponent;
