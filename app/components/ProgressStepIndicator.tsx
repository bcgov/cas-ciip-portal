import React from 'react';
import {ProgressBar} from 'react-bootstrap';

interface Props {}

export const ProgressStepIndicator: React.FunctionComponent<Props> = () => {
  return <ProgressBar now={0} />;
};

export default ProgressStepIndicator;
