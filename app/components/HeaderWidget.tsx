import React from 'react';
import {WidgetProps} from 'react-jsonschema-form';

const HeaderWidget: React.FunctionComponent<WidgetProps> = ({options}) => {
  return (
    <span className="paragraph-text">
      <h5>{options.text}</h5>
      <hr />
    </span>
  );
};

export default HeaderWidget;
