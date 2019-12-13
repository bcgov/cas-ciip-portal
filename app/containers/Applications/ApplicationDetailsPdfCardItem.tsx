import React from 'react';
import {Document, Page, Text, View, StyleSheet} from '@react-pdf/renderer';
import JsonSchemaForm from 'react-jsonschema-form';
import {Header, Body, Form} from 'components/Layout/Pdf';

const styles = StyleSheet.create({
  label: {fontWeight: 700, fontSize: 15},
  applicant: {
    fontWeight: 900,
    fontSize: 13,
    lineHeight: 1.3
  },
  fields: {
    lineHeight: 1.5
  }
});

const objectFieldTemplate = props => {
  return (
    <>
      {props.properties.map(
        prop => prop.content && <View>{prop.content}</View>
      )}
    </>
  );
};

const fieldTemplate = props => {
  return (
    <>
      {props.label && (
        <Text style={styles.label}>
          {'\n'}
          {props.label}:
        </Text>
      )}
      <Text style={styles.fields}>{props.children}</Text>
    </>
  );
};

const CUSTOM_FIELDS = {
  TitleField: props => (
    <Text>{props.title ? props.title : '[Not Entered]'}</Text>
  ),
  StringField: props => (
    <Text> {props.formData ? props.formData : '[Not Entered]'}</Text>
  )
};

const customWidget = {
  RadioWidget: props => props.value
};

const ApplicationDetailsPdfCardItem = props => {
  const {application} = props;
  const {user} = props;

  const {node} = application.formResultsByApplicationId.edges[0];
  const {schema, uiSchema} = node.formJsonByFormId.formJson;
  const {formResult, submissionDate} = node;

  return (
    <Document>
      <Page size="A4">
        <Header>
          <Text>CleanBC Industrial Incentive Program</Text>
        </Header>
        <Body>
          <View style={styles.applicant}>
            <Text>
              {user.firstName} {user.lastName}
            </Text>
            <Text>{user.emailAddress}</Text>
            <Text>{user.phoneNumber}</Text>
            <Text>{submissionDate}</Text>
          </View>
          <JsonSchemaForm
            FieldTemplate={fieldTemplate}
            ObjectFieldTemplate={objectFieldTemplate}
            showErrorList={false}
            fields={CUSTOM_FIELDS}
            schema={schema}
            uiSchema={uiSchema}
            formData={formResult}
            tagName={Form}
            widgets={customWidget}
          >
            <View />
          </JsonSchemaForm>
        </Body>
      </Page>
    </Document>
  );
};

export default ApplicationDetailsPdfCardItem;
