/**
 * AltDateTimeWidget modified from rjsf-team/react-jsonschema-form licensed under Apache 2.0:
 *
 * https://github.com/rjsf-team/react-jsonschema-form/blob/v1.8.1/src/components/widgets/AltDateTimeWidget.js
 * https://github.com/rjsf-team/react-jsonschema-form/blob/v1.8.1/LICENSE.md
 *
 * Changelog:
 * - Name changed to AltDateTimeInput
 * - propTypes removed
 * - linter formatting
 */

import React from 'react';
import AltDateInput from './AltDateInput';

const AltDateTimeInput = (props) => {
  const {AltDateInput} = props.registry.widgets;
  return <AltDateInput time {...props} />;
};

AltDateTimeInput.defaultProps = {
  ...AltDateInput.defaultProps,
  time: true
};

export default AltDateTimeInput;
