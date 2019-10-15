import React, {useState, useEffect} from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import Form from '../Forms/Form';

/*
 * The ApplicationWizardStep renders a form and, where applicable,
 * (TODO) starts by presenting a summary of existing data to the user
 */
const ApplicationWizardStep = ({
  query,
  formId,
  formName,
  onStepComplete,
  prepopulateFromCiip,
  prepopulateFromSwrs
}) => {
  const [initialData, setInitialData] = useState(null);
  useEffect(() => {
    if (!prepopulateFromSwrs) return setInitialData(null);
    const swrsData = {};
    switch (formName) {
      case 'Admin': {
        const {application} = query;
        const {edges} = application;
        const {node} = edges[0];
        const {
          operatorName,
          operatorTradeName,
          duns,
          craBusinessNumber,
          operatorMailingAddress,
          operatorCity,
          operatorProvince,
          operatorPostalCode,
          operatorCountry
        } = node.swrsOrganisationData.edges[0].node;
        const reportingOperationInfo = {
          operator_name: operatorName,
          operator_trade_name: operatorTradeName,
          duns_number: duns
        };
        swrsData.reporting_operation_information = [reportingOperationInfo];
        break;
      }

      default:
        setInitialData(null);
    }

    setInitialData(swrsData);
  }, [formName, query, prepopulateFromSwrs]);

  let initialDataSource;
  if (prepopulateFromSwrs) {
    initialDataSource = 'your last SWRS report';
  }

  if (prepopulateFromSwrs && !initialData) {
    return <>Loading data from SWRS</>;
  }

  return (
    <Form
      query={query}
      formId={formId}
      startsEditable={!prepopulateFromSwrs && !prepopulateFromCiip}
      initialData={initialData}
      initialDataSource={initialDataSource}
      onFormComplete={onStepComplete}
    />
  );
};

export default createFragmentContainer(ApplicationWizardStep, {
  query: graphql`
    fragment ApplicationWizardStep_query on Query
      @argumentDefinitions(
        formCondition: {type: "FormJsonCondition"}
        applicationCondition: {type: "ApplicationCondition"}
      ) {
      application: allApplications(condition: $applicationCondition) {
        edges {
          node {
            swrsEmissionData(reportingYear: "2018") {
              edges {
                node {
                  quantity
                  calculatedQuantity
                  emissionCategory
                  gasType
                }
              }
            }
            swrsFacilityData(reportingYear: "2018") {
              edges {
                node {
                  facilityName
                  facilityType
                  bcghgid
                  naicsCode
                  latitude
                  longitude
                  facilityMailingAddress
                  facilityCity
                  facilityProvince
                  facilityPostalCode
                  facilityCountry
                }
              }
            }
            swrsFuelData(reportingYear: "2018") {
              edges {
                node {
                  fuelType
                  fuelDescription
                  fuelUnits
                  annualFuelAmount
                  annualWeightedAvgHhv
                  annualWeightedAvgCarbonContent
                  alternativeMethodolodyDescription
                }
              }
            }
            swrsOperatorContactData(reportingYear: "2018") {
              edges {
                node {
                  firstName
                  lastName
                  positionTitle
                  contactType
                  email
                  telephone
                  fax
                  contactMailingAddress
                  contactCity
                  contactProvince
                  contactPostalCode
                  contactCountry
                }
              }
            }
            swrsOrganisationData(reportingYear: "2018") {
              edges {
                node {
                  operatorName
                  operatorTradeName
                  duns
                  craBusinessNumber
                  operatorMailingAddress
                  operatorCity
                  operatorProvince
                  operatorPostalCode
                  operatorCountry
                }
              }
            }
          }
        }
      }
      ...Form_query @arguments(condition: $formCondition)
    }
  `
});
