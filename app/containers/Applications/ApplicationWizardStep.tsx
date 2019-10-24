import React, {useState, useEffect} from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import Form from '../Forms/Form';
import {ApplicationWizardStep_query} from './__generated__/ApplicationWizardStep_query.graphql';

type Application = ApplicationWizardStep_query['application'];

const getInitialAdminData = (application: Application): any => {
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

const getInitialEmissionData = (application: Application): any => {
  const initialData = {};
  for (const {
    node: {quantity, emissionCategory, gasType}
  } of application.swrsEmissionData.edges) {
    const emissionCategoryData =
      initialData[emissionCategory] === undefined
        ? {}
        : initialData[emissionCategory][0];
    initialData[emissionCategory] = [
      {
        ...emissionCategoryData,
        [gasType]: [
          {
            annualEmission: quantity
          }
        ]
      }
    ];
  }

  return initialData;
};

const getInitialFuelData = (
  application: Application,
  allFuels: ApplicationWizardStep_query['allFuels']
): any => {
  return {
    fuels: application.swrsFuelData.edges.map(edge => {
      const {
        fuelType,
        fuelDescription,
        annualFuelAmount,
        alternativeMethodolodyDescription
      } = edge.node;
      const fuelUnits = allFuels.edges.find(
        ({node: {name}}) => name === fuelType
      ).node.units;
      return {
        fuelType,
        fuelUnits,
        description: fuelDescription,
        quantity: annualFuelAmount,
        methodology: alternativeMethodolodyDescription
      };
    })
  };
};

interface Props {
  query: ApplicationWizardStep_query;
  formName: string;
  onStepComplete: (data: any) => void;
  prepopulateFromSwrs: boolean;
}

/*
 * The ApplicationWizardStep renders a form and, where applicable,
 * (TODO) starts by presenting a summary of existing data to the user
 */
const ApplicationWizardStep: React.SFC<Props> = ({
  query,
  formName,
  onStepComplete,
  prepopulateFromSwrs
}) => {
  const {application, allFuels} = query;
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
        setInitialData(getInitialFuelData(application, allFuels));
        break;
      }

      default:
        setInitialData({});
    }
  }, [formName, query, prepopulateFromSwrs, application, allFuels]);

  let initialDataSource;
  if (prepopulateFromSwrs) {
    initialDataSource = 'your last SWRS report';
  }

  if (application === undefined) return null;

  if (prepopulateFromSwrs && initialData === undefined) {
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
      allFuels {
        edges {
          node {
            name
            units
          }
        }
      }
      application(id: $applicationId) {
        rowId
        swrsEmissionData(reportingYear: "2018") {
          edges {
            node {
              quantity
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
