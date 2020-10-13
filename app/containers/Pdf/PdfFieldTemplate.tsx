import React from 'react';
import {View, Text, StyleSheet} from '@react-pdf/renderer';
import {FieldTemplateProps} from 'react-jsonschema-form';

const styles = StyleSheet.create({
  label: {fontSize: 12},
  fields: {lineHeight: 1.5}
});

const PdfFieldTemplate: React.FunctionComponent<FieldTemplateProps> = (
  props
) => {
  const getLocalLabel = (props: FieldTemplateProps) => {
    if (props.label === 'comments') {
      return null;
    } // taken care of by the custom field.
    if (props.label === 'gases' || props.label === 'sourceTypeName')
      return null;

    if (props.classNames.includes('field-object'))
      return (
        <Text
          style={{fontSize: 15, letterSpacing: 2}}
        >{`\n\n${props.label}: `}</Text>
      );

    return <Text>{`\n${props.label}: `}</Text>;
  };

  const localChildren = props.children ? (
    <Text style={styles.fields}>{props.children}</Text>
  ) : null;

  return (
    <>
      {props.label && <View style={styles.label}>{getLocalLabel(props)}</View>}
      {localChildren}
    </>
  );
};

export default PdfFieldTemplate;
