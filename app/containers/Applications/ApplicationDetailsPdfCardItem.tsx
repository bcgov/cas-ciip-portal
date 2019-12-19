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
import {Header, Row, Body, FormFields, Column} from 'components/Layout/Pdf';

const styles = StyleSheet.create({
  page: {
    paddingTop: 20,
    paddingBottom: 40
  },
  label: {fontSize: 12},
  appInfo: {
    fontSize: 12,
    margin: '10px 0 20px'
  },
  applicant: {
    fontSize: 12,
    lineHeight: 1.3
  },
  fields: {
    lineHeight: 1.5
  },
  pageNumbers: {
    fontSize: 12,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center'
  }
});

const arrayFieldTemplate = props => {
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

const objectFieldTemplate = props => {
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

const fieldTemplate = props => {
  return (
    <>
      {props.label && (
        <View style={styles.label}>
          {props.label === 'gases' ||
          props.label === 'sourceTypeName' ? null : props.classNames.includes(
              'field-object'
            ) ? (
            <Text style={{fontSize: 15, letterSpacing: 2}}>
              {`\n\n${props.label}: `}
            </Text>
          ) : (
            <Text>{`\n${props.label}: `}</Text>
          )}
        </View>
      )}
      {props.children && <Text style={styles.fields}>{props.children}</Text>}
    </>
  );
};

const emissionGasFieldTemplate = props => {
  return (
    <Text>
      {'\n'}
      {props.gasType} - Tonnes: {props.annualEmission} - Tonnes (CO2e):{' '}
      {props.annualCO2e}
    </Text>
  );
};

const productionFieldTemplate = props => {
  return (
    <>
      <Text style={{fontSize: 15, letterSpacing: 2}}>
        {'\n'}Production:{'\n'}
      </Text>
      <Text>
        Product allocation factor (%): {props.productionAllocationFactor}
        {'\n'}
      </Text>
      <Text>
        Annual Production Amount: {props.productUnits}
        {'\n'}
      </Text>
      <Text>
        Units: {props.quantity}
        {'\n'}
      </Text>
    </>
  );
};

const CUSTOM_FIELDS = {
  // TitleField: props => (
  //   <Text>{props.title ? props.title : '[Not Entered]'}</Text>
  // ),
  StringField: props => (
    <Text>{props.formData ? props.formData : '[Not Entered]'}</Text>
  ),
  emissionSource: props => (
    <Text style={{fontSize: 13}}>
      {'\n\n'}
      {props.formData}
    </Text>
  ),
  emissionGas: props => emissionGasFieldTemplate(props.formData),
  production: props => productionFieldTemplate(props.formData)
};

const customWidget = {
  RadioWidget: props =>
    props.value === true ? <Text>Yes</Text> : <Text>No</Text>
};

const ApplicationDetailsPdfCardItem = props => {
  const {application, user} = props;
  const facility = application.facilityByFacilityId;
  const formResults = application.formResultsByApplicationId.edges;

  return (
    <Document>
      <Page wrap size="A4" style={styles.page}>
        <Header>
          <Image src="/static/bcid.png" style={{width: 150, margin: 'auto'}} />
          <Text>Application for CleanBC Industrial Incentive Program</Text>
        </Header>
        <Body>
          <Row>
            <Column>
              <Text style={styles.appInfo}>
                Reporting Year: {application.reportingYear}
              </Text>
            </Column>
            <Column>
              <Text style={styles.appInfo}>
                Status:{' '}
                {
                  application.applicationRevisionStatus
                    .applicationRevisionStatus
                }
              </Text>
            </Column>
          </Row>
          <Row>
            <Column>
              <View style={styles.applicant}>
                <Text
                  style={{
                    lineHeight: 1.5,
                    borderBottom: 1,
                    marginBottom: 10
                  }}
                >
                  Applicant
                </Text>
                <Text>
                  {user.firstName} {user.lastName}
                </Text>
                <Text>{user.occupation}</Text>
                <Text>{user.emailAddress}</Text>
                <Text>{user.phoneNumber}</Text>
              </View>
            </Column>
            <Column>
              <View style={styles.applicant}>
                <Text
                  style={{
                    lineHeight: 1.5,
                    borderBottom: 1,
                    marginBottom: 10
                  }}
                >
                  Facility
                </Text>
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

          {formResults.map(({node}) => (
            <View key={node.formJsonByFormId.id}>
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
        <Text
          fixed
          render={({pageNumber, totalPages}) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          style={styles.pageNumbers}
        />
      </Page>
    </Document>
  );
};

export default ApplicationDetailsPdfCardItem;
