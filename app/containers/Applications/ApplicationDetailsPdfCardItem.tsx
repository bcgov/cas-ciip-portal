import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet
} from '@react-pdf/renderer';
import JsonSchemaForm from 'react-jsonschema-form';
import {
  Header,
  Row,
  Title,
  Body,
  FormFields,
  Column,
  Hr
} from 'components/Layout/Pdf';

const styles = StyleSheet.create({
  label: {fontWeight: 700, fontSize: 12, border: 1},
  appInfo: {
    fontSize: 12,
    margin: '10px 0'
  },
  applicant: {
    fontSize: 13,
    lineHeight: 1.3
  },
  fields: {
    lineHeight: 1.5
  }
});

const arrayFieldTemplate = props => {
  return (
    <>
      <Text>{props.title}</Text>
      {/* {props.items.map(item => {
        debugger;
        return <View key={item.index}>{item.children}</View>;
      })} */}
    </>
  );
};

const objectFieldTemplate = props => {
  return (
    <>
      {props.properties.map(
        prop => prop.content && <View key={prop.index}>{prop.content}</View>
      )}
    </>
  );
};

const fieldTemplate = props => {
  return (
    <>
      {props.label && (
        <>
          <Text style={styles.label}>
            {'\n'}
            {props.label}:
          </Text>
          {/* <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} /> */}
        </>
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

  const facility = application.facilityByFacilityId;

  const formResults = application.formResultsByApplicationId.edges;

  // Const {node} = application.formResultsByApplicationId.edges[0];
  // const {schema, uiSchema} = node.formJsonByFormId.formJson as FormJson;
  // const {formResult, submissionDate} = node;

  return (
    <Document>
      <Page size="A4">
        <Header>
          <Row>
            <Column>
              <Image src="/static/logo-banner.png" style={{width: 200}} />
            </Column>
            <Column>
              <Text style={{textAlign: 'right'}}>
                CleanBC Industrial Incentive Program
              </Text>
            </Column>
          </Row>
        </Header>
        <Body>
          <Title>Incentive Program Application</Title>
          <Text style={styles.appInfo}>
            {/* Submitted: {submissionDate.slice(0, 10)} Status:{' '} */}
            {application.applicationStatus.applicationStatus}
          </Text>
          <Row>
            <Column>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 1.5,
                  borderBottom: 1,
                  marginBottom: 10
                }}
              >
                Applicant
              </Text>
              <View style={styles.applicant}>
                <Text>
                  {user.firstName} {user.lastName}
                </Text>
                <Text>{user.occupation}</Text>
                <Text>{user.emailAddress}</Text>
                <Text>{user.phoneNumber}</Text>
              </View>
            </Column>
            <Column>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 1.5,
                  borderBottom: 1,
                  marginBottom: 10
                }}
              >
                Facility
              </Text>
              <View style={styles.applicant}>
                <Text>{facility.facilityName}</Text>
                <Text>
                  {facility.facilityMailingAddress}
                  {'\n'}
                  {facility.facilityCity}, {facility.facilityProvince},{' '}
                  {facility.facilityCountry}
                  {'\n'}
                  {facility.facilityPostalCode}
                </Text>
              </View>
            </Column>
          </Row>

          <Hr />

          {formResults.map(({node}) => (
            <View key={node.formJsonByFormId.id}>
              <Text>{node.formJsonByFormId.id}</Text>
              <JsonSchemaForm
                omitExtraData
                ArrayFieldTemplate={arrayFieldTemplate}
                FieldTemplate={fieldTemplate}
                ObjectFieldTemplate={objectFieldTemplate}
                showErrorList={false}
                fields={CUSTOM_FIELDS}
                schema={node.formJsonByFormId.formJson.schema}
                uiSchema={node.formJsonByFormId.formJson.uiSchema}
                formData={node.formResult}
                tagName={FormFields}
                widgets={customWidget}
              >
                <View />
              </JsonSchemaForm>
            </View>
          ))}
        </Body>
      </Page>
    </Document>
  );
};

export default ApplicationDetailsPdfCardItem;
