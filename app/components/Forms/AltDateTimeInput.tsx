// https://github.com/rjsf-team/react-jsonschema-form/blob/v1.8.1/src/components/widgets/AltDateTimeWidget.js

import React from "react";
import PropTypes from "prop-types";
import AltDateInput from "./AltDateInput";
import { WidgetProps } from "react-jsonschema-form";

function AltDateTimeInput(props: WidgetProps) {
  const { AltDateInput } = props.registry.widgets;
  return <AltDateInput time {...props} />;
}

if (process.env.NODE_ENV !== "production") {
  AltDateTimeInput.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    options: PropTypes.object,
  };
}

AltDateTimeInput.defaultProps = {
  ...AltDateInput.defaultProps,
  time: true,
};

export default AltDateTimeInput;