import React, {useState, useEffect} from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import Form from '../Forms/Form';

const getInitialAdminData = query => {
  const {application} = query;
  const {edges} = application;
  const {node} = edges[0];
  const {
    operatorName,
    operatorTradeName,
    duns,
    operatorMailingAddress,
    operatorCity,
    operatorProvince,
    operatorPostalCode,
    operatorCountry
  } = node.swrsOrganisationData;
  const {
    facilityName,
    facilityType,
    bcghgid,
    naicsCode,
    latitude,
    longitude,
    facilityMailingAddress,
    facilityCity,
    facilityProvince,
    facilityPostalCode
  } = node.swrsFacilityData;

  const {
    firstName,
    lastName,
    positionTitle,
    email,
    telephone,
    fax,
    contactMailingAddress,
    contactCity,
    contactProvince,
    contactPostalCode
  } = node.swrsOperatorContactData;

  return {
    reportingOperationInformation: [
      {
        operatorName,
        operatorTradeName,
        duns,
        naicsCode,
        mailingAddress: operatorMailingAddress,
        mailingAddressCity: operatorCity,
        mailingAddressProvince: operatorProvince,
        // TODO: the postal code field in the survey should remove spaces when validating/submitting
        mailingAddressPostalCode: operatorPostalCode.replace(' ', ''),
        mailingAddressCountry: operatorCountry
      }
    ],
    facilityInformation: [
      {
        facilityName,
        facilityType,
        bcghgid,
        naicsCode,
        latitude,
        longitude,
        mailingAddress: facilityMailingAddress,
        mailingAddressCity: facilityCity,
        mailingAddressProvince: facilityProvince,
        mailingAddressPostalCode: facilityPostalCode.replace(' ', '')
      }
    ],
    operationalRepresentativeInformation: [
      {
        firstName,
        lastName,
        position: positionTitle,
        emailAddress: email,
        phone: telephone,
        fax,
        mailingAddress: contactMailingAddress,
        mailingAddressCity: contactCity,
        mailingAddressProvince: contactProvince,
        mailingAddressPostalCode: contactPostalCode.replace(' ', '')
      }
    ]
  };
};

const getInitialEmissionData = _ => {
  return {};
};

const getInitialFuelData = query => {
  const {application} = query;
  const {edges} = application;
  const {node} = edges[0];
  return {
    fuels: node.swrsFuelData.edges.map(edge => {
      const {
        fuelType,
        fuelDescription,
        annualFuelAmount,
        alternativeMethodolodyDescription
      } = edge.node;
      return {
        fuelType,
        description: fuelDescription,
        quantity: annualFuelAmount,
        methodology: alternativeMethodolodyDescription
      };
    })
  };
};

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
  const {application} = query;
  const [initialData, setInitialData] = useState({});
  useEffect(() => {
    if (!prepopulateFromSwrs) return setInitialData(null);
    switch (formName) {
      case 'Admin': {
        setInitialData(getInitialAdminData(query));
        break;
      }

      case 'Emission': {
        setInitialData(getInitialEmissionData(query));
        break;
      }

      case 'Fuel': {
        setInitialData(getInitialFuelData(query));
        break;
      }

      default:
        setInitialData({});
    }
  }, [formName, query, prepopulateFromSwrs]);

  let initialDataSource;
  if (prepopulateFromSwrs) {
    initialDataSource = 'your last SWRS report';
  }

  if (!application || !application.edges[0]) return null;

  if (prepopulateFromSwrs && !initialData) {
    return <>Loading data from SWRS</>;
  }

  return (
    <Form
      query={query}
      formId={formId}
      applicationId={application.edges[0].node.rowId}
      startsEditable={!prepopulateFromSwrs}
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
            rowId
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
            }
            swrsFuelData(reportingYear: "2018") {
              edges {
                node {
                  fuelType
                  fuelDescription
                  annualFuelAmount
                  alternativeMethodolodyDescription
                }
              }
            }
            swrsOperatorContactData(reportingYear: "2018") {
              firstName
              lastName
              positionTitle
              email
              telephone
              fax
              contactMailingAddress
              contactCity
              contactProvince
              contactPostalCode
            }
            swrsOrganisationData(reportingYear: "2018") {
              operatorName
              operatorTradeName
              duns
              operatorMailingAddress
              operatorCity
              operatorProvince
              operatorPostalCode
              operatorCountry
            }
          }
        }
      }
      ...Form_query @arguments(condition: $formCondition)
    }
  `
});
