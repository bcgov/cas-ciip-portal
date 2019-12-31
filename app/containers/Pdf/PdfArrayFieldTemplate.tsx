import React from 'react';
import {Text} from '@react-pdf/renderer';
import {ArrayFieldTemplateProps} from 'react-jsonschema-form';

const PdfArrayFieldTemplate: React.FunctionComponent<ArrayFieldTemplateProps> = props => {
  return (
    <>
      <Text>
        {props.title === 'gases' || props.title === 'Source Types'
          ? null
          : props.title}
      </Text>
      {props.items.map(item => {
        return <Text key={item.index}>{item.children}</Text>;
      })}
    </>
  );
};

export default PdfArrayFieldTemplate;
