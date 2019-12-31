import React from 'react';
import {View} from '@react-pdf/renderer';
import {ObjectFieldTemplateProps} from 'react-jsonschema-form';

const PdfObjectFieldTemplate: React.FunctionComponent<ObjectFieldTemplateProps> = props => {
  return (
    <>
      {props.properties.map(
        prop =>
          prop.content && <View key={prop.content.key}>{prop.content}</View>
      )}
      {!props.properties && '\n'}
    </>
  );
};

export default PdfObjectFieldTemplate;
