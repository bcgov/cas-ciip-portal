import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  PDFDownloadLink
} from '@react-pdf/renderer';
import JsonSchemaForm from 'react-jsonschema-form';
import {Header, Row, Body, Column} from 'components/Layout/Pdf';
import {createFragmentContainer, graphql} from 'react-relay';
import {ApplicationDetailsPdf_application} from 'ApplicationDetailsPdf_application.graphql';
import PdfEmissionGasFieldTemplate from 'containers/Pdf/PdfEmissionGasFieldTemplate';
import PdfProductionFieldsTemplate from 'containers/Pdf/PdfProductionFieldsTemplate';
import PdfFuelFieldsTemplate from 'containers/Pdf/PdfFuelFieldsTemplate';
import PdfFieldTemplate from 'containers/Pdf/PdfFieldTemplate';
import PdfArrayFieldTemplate from 'containers/Pdf/PdfArrayFieldTemplate';
import PdfObjectFieldTemplate from 'containers/Pdf/PdfObjectFieldTemplate';
import {ApplicationDetailsPdf_query} from 'ApplicationDetailsPdf_query.graphql';

interface Props {
  application: ApplicationDetailsPdf_application;
  query: ApplicationDetailsPdf_query;
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 20,
    paddingBottom: 40
  },
  formFields: {
    fontSize: 12
  },
  appInfo: {
    fontSize: 12,
    margin: '10px 0 20px'
  },
  applicant: {
    fontSize: 12,
    lineHeight: 1.3
  },
  underline: {
    lineHeight: 1.5,
    borderBottom: 1,
    marginBottom: 10
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

const CUSTOM_FIELDS = {
  StringField: (props) => <Text>{props.formData ?? '[Not Entered]'}</Text>,
  emissionSource: (props) => (
    <Text style={{fontSize: 13}}>
      {'\n\n'}
      {props.formData}
    </Text>
  ),
  emissionGas: (props) => <PdfEmissionGasFieldTemplate {...props} />,
  fuel: (props) => {
    console.log(props);
    return <PdfFuelFieldsTemplate query={props.formContext.query} {...props} />;
  },
  product: (props) => {
    return (
      <PdfProductionFieldsTemplate query={props.formContext.query} {...props} />
    );
  }
};

const customWidget = {
  RadioWidget: (props) => <Text>{props.value ? 'Yes' : 'No'}</Text>
};

export const ApplicationDetailsPdf: React.FunctionComponent<Props> = (
  props
) => {
  const {application, query} = props;
  const facility = application.facilityByFacilityId;
  const formResults = application.orderedFormResults.edges;

  const pdfFilename = `CIIP_Application_${application.facilityByFacilityId.facilityName}_${application.reportingYear}.pdf`;

  const pdfDocument = (
    <Document>
      <Page wrap size="LETTER" style={styles.page}>
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
                <Text style={styles.underline}>Operator</Text>
                <Text>{formResults[0].node.formResult.operator?.name}</Text>
                <Text>
                  {' '}
                  {
                    formResults[0].node.formResult.operator?.mailingAddress
                      ?.streetAddress
                  }
                </Text>
                <Text>
                  {' '}
                  {
                    formResults[0].node.formResult.operator?.mailingAddress
                      ?.city
                  }
                  ,{' '}
                  {
                    formResults[0].node.formResult.operator?.mailingAddress
                      ?.province
                  }
                </Text>
                <Text>
                  {' '}
                  {
                    formResults[0].node.formResult.operator?.mailingAddress
                      ?.postalCode
                  }
                </Text>
              </View>
            </Column>
            <Column>
              <View style={styles.applicant}>
                <Text style={styles.underline}>Facility</Text>
                <Text>{facility.facilityName}</Text>
              </View>
            </Column>
          </Row>

          {formResults.map(({node}) => (
            <View key={node.formJsonByFormId.name} style={styles.formFields}>
              <Text style={{borderBottom: 1, paddingBottom: 10, fontSize: 16}}>
                {'\n'}
                {node.formJsonByFormId.name}
              </Text>
              <JsonSchemaForm
                omitExtraData
                ArrayFieldTemplate={PdfArrayFieldTemplate}
                FieldTemplate={PdfFieldTemplate}
                ObjectFieldTemplate={PdfObjectFieldTemplate}
                showErrorList={false}
                fields={CUSTOM_FIELDS}
                schema={node.formJsonByFormId.formJson.schema}
                uiSchema={node.formJsonByFormId.formJson.uiSchema}
                formData={node.formResult}
                tagName={'VIEW' as any}
                widgets={customWidget}
                formContext={{query}}
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

  return (
    <PDFDownloadLink
      document={pdfDocument}
      fileName={pdfFilename}
      className="btn btn-primary"
    >
      {({loading}) => (loading ? 'Generating pdf...' : 'Download Application')}
    </PDFDownloadLink>
  );
};

export default createFragmentContainer(ApplicationDetailsPdf, {
  application: graphql`
    fragment ApplicationDetailsPdf_application on Application
    @argumentDefinitions(version: {type: "String!"}) {
      applicationRevisionStatus(versionNumberInput: $version) {
        applicationRevisionStatus
      }
      reportingYear
      facilityByFacilityId {
        facilityName
      }
      orderedFormResults(versionNumberInput: $version) {
        edges {
          node {
            formResult
            formJsonByFormId {
              name
              formJson
            }
          }
        }
      }
    }
  `,
  query: graphql`
    fragment ApplicationDetailsPdf_query on Query {
      # These fields are used in PdfProductionFieldsTemplate
      allProducts {
        edges {
          node {
            rowId
            productName
          }
        }
      }
      allFuels(condition: {state: "active"}) {
        edges {
          node {
            rowId
            name
          }
        }
      }
      allEmissionCategories {
        edges {
          node {
            rowId
            displayName
          }
        }
      }
    }
  `
});
