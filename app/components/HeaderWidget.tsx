import React from 'react';
import {WidgetProps} from 'react-jsonschema-form';

const HeaderWidget: React.FunctionComponent<WidgetProps> = ({options}) => {
  return (
    <span className="paragraph-text">
      <h3>{options.text}</h3>
      <hr />
      <style jsx>{`
        h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </span>
  );
};

export default HeaderWidget;
