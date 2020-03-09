describe('When reviewing a submitted application as an analyst', () => {
  beforeEach(() => {
    cy.sqlFixture('fixtures/form-validation-setup');
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
    const applicationId = window.btoa('["applications", 2]');
    const formResultId = window.btoa('["form_results", 11]');
    cy.visit(
      `/reporter/ciip-application?applicationId=${applicationId}&version=1&formResultId=${formResultId}`
    );
  });

  afterEach(() => {
    cy.sqlFixture('fixtures/form-validation-teardown');
  });

  it('The application forms show validation errors', () => {
    cy.get('#page-content');

    // Operator details
    cy.get('#root_operator_name')
      .clear()
      .type('John Smith');
    cy.get('#root_operator_tradeName')
      .clear()
      .type('Acme Co');
    cy.get('#root_operator_naics')
      .clear()
      .type('112200');
    cy.get('#root_operator_bcCorporateRegistryNumber')
      .clear()
      .type('111112222233333');
    cy.get('#root_operator_duns')
      .clear()
      .type('1112223');

    // Operator mailing address
    cy.get('#root_operator_mailingAddress_streetAddress')
      .clear()
      .type('100 North Pole');
    cy.get('#root_operator_mailingAddress_city')
      .clear()
      .type('Calgary');
    cy.get('#root_operator_mailingAddress_postalCode')
      .clear()
      .type('H2O 0H0');
    cy.get('#root_operator_mailingAddress_province').select('Alberta');

    // Operational rep details
    cy.get('#root_operationalRepresentative_firstName')
      .clear()
      .type('John');
    cy.get('#root_operationalRepresentative_lastName')
      .clear()
      .type('Smith');
    cy.get('#root_operationalRepresentative_position')
      .clear()
      .type('CEO');
    cy.get('#root_operationalRepresentative_email')
      .clear()
      .type('john@acme.com');
    cy.get('#root_operationalRepresentative_phone')
      .clear()
      .type('9009009001');
    cy.get('#root_operationalRepresentative_fax')
      .clear()
      .type('6476478009');

    // Operational rep mailing address
    cy.get('#root_operationalRepresentative_mailingAddress_streetAddress')
      .clear()
      .type('100 North Pole');
    cy.get('#root_operationalRepresentative_mailingAddress_city')
      .clear()
      .type('Calgary');
    cy.get('#root_operationalRepresentative_mailingAddress_postalCode')
      .clear()
      .type('H2O0H0');
    cy.get('#root_operationalRepresentative_mailingAddress_province').select(
      'Alberta'
    );

    // Facility details
    cy.get('#root_facility_facilityName')
      .clear()
      .type('Acme1');
    cy.get('#root_facility_facilityType').select('LFO');
    cy.get('#root_facility_bcghgid')
      .clear()
      .type('11001100223');
    cy.get('#root_facility_naics')
      .clear()
      .type('1100223');

    // Facility mailing address
    cy.get('#root_facility_mailingAddress_streetAddress')
      .clear()
      .type('100 North Pole');
    cy.get('#root_facility_mailingAddress_city')
      .clear()
      .type('Calgary');
    cy.get('#root_facility_mailingAddress_postalCode')
      .clear()
      .type('H2O 0H0');
    cy.get('#root_facility_mailingAddress_province').select('Alberta');

    cy.get(
      '#root_facility_isFacilityLocationDifferent .radio label span input[type=radio]'
    )
      .first()
      .check();

    cy.contains('Continue').click();
    cy.get('#root_operator_duns +div .error-detail').contains(
      'DUNS number should be nine digits'
    );

    cy.get(
      '#root_operationalRepresentative_mailingAddress_postalCode +div .error-detail'
    ).contains('Format should be A1A 1A1');

    cy.get('#root_operator_duns')
      .clear()
      .type('111222333');
    cy.get('#root_operationalRepresentative_mailingAddress_postalCode')
      .clear()
      .type('A1A 1A1');
    cy.contains('Continue').click();

    cy.percySnapshot('admin');

    // Emission Form
    cy.get(':nth-child(2) > .nav-link').click();
    cy.contains('Continue').click();
    cy.get(
      '#root_sourceTypes_0_gases_0_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_0_gases_1_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_0_gases_2_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_0_gases_3_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_0_gases_4_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_1_gases_0_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_1_gases_1_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_1_gases_2_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_1_gases_3_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_1_gases_4_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_2_gases_0_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_2_gases_1_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_2_gases_2_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_2_gases_3_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_2_gases_4_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_3_gases_0_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_3_gases_1_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_3_gases_2_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_3_gases_3_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_3_gases_4_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_3_gases_5_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_3_gases_6_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_3_gases_7_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_4_gases_0_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_4_gases_1_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_4_gases_2_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_4_gases_3_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_4_gases_4_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_5_gases_0_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_5_gases_1_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_5_gases_2_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_5_gases_3_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_5_gases_4_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_6_gases_0_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_6_gases_1_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_6_gases_2_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_6_gases_3_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.get(
      '#root_sourceTypes_6_gases_4_annualEmission +div .error-detail'
    ).contains('should be number');
    cy.percySnapshot('emission');

    // Fuel Form
    cy.get(':nth-child(3) > .nav-link').click();
    cy.contains('Add a fuel').click();
    cy.contains('Continue').click();
    cy.get('.rbt +div .error-detail').contains('is a required property');
    cy.get('#root_0_quantity +div .error-detail').contains(
      'is a required property'
    );
    // TODO: This will need to change once the fuelFields form is refactored.
    cy.get('.invalid-feedback').contains('is a required property');
    cy.percySnapshot('fuel');

    // Electricity / Heat Form
    cy.get(':nth-child(4) > .nav-link').click();
    cy.contains('Continue').click();
    cy.get('#root_electricity_purchased +div .error-detail').contains(
      'is a required property'
    );
    cy.get('#root_electricity_generatedOnSite +div .error-detail').contains(
      'is a required property'
    );
    cy.get('#root_electricity_consumedOnSite +div .error-detail').contains(
      'is a required property'
    );
    cy.get('#root_electricity_sold +div .error-detail').contains(
      'is a required property'
    );
    cy.percySnapshot('electricity-heat');

    // Production Form
    cy.get(':nth-child(5) > .nav-link').click();
    cy.contains('Continue').click();
    cy.get('.rbt +div .error-detail').contains('is a required property');
    cy.get('#root_0_productionAllocationFactor +div .error-detail').contains(
      'is a required property'
    );
    cy.get('#root_0_quantity +div .error-detail').contains(
      'is a required property'
    );
    cy.get('#root_0_productUnits +div .error-detail').contains(
      'is a required property'
    );
    cy.percySnapshot('production');
  });
});
