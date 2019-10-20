import React, {useState, useEffect} from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import Form from '../Forms/Form';

const getInitialAdminData = application => {
  const {
    operatorName,
    operatorTradeName,
    duns,
    operatorMailingAddress,
    operatorCity,
    operatorProvince,
    operatorPostalCode,
    operatorCountry
  } = application.swrsOrganisationData;
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
  } = application.swrsFacilityData;

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
  } = application.swrsOperatorContactData;

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

const getInitialFuelData = application => {
  return {
    fuels: application.swrsFuelData.edges.map(edge => {
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
        setInitialData(getInitialAdminData(application));
        break;
      }

      case 'Emission': {
        setInitialData(getInitialEmissionData(application));
        break;
      }

      case 'Fuel': {
        setInitialData(getInitialFuelData(application));
        break;
      }

      default:
        setInitialData({});
    }
  }, [formName, query, prepopulateFromSwrs, application]);

  let initialDataSource;
  if (prepopulateFromSwrs) {
    initialDataSource = 'your last SWRS report';
  }

  if (!application) return null;

  if (prepopulateFromSwrs && !initialData) {
    return <>Loading data from SWRS</>;
  }

  return (
    <Form
      query={query}
      applicationId={application.rowId}
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
        formId: {type: "ID!"}
        applicationId: {type: "ID!"}
      ) {
      application(id: $applicationId) {
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

      ...Form_query @arguments(formId: $formId)
    }
  `
});
