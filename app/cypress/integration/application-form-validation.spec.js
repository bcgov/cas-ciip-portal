describe('When reviewing a submitted application as an analyst', () => {
  const applicationUrl = `/reporter/ciip-application?applicationId=${window.btoa(
    '["applications",1]'
  )}&version=1`;

  const adminFormUrl = `${applicationUrl}&formResultId=${window.btoa(
    '["form_results",1]'
  )}`;
  const emissionFormUrl = `${applicationUrl}&formResultId=${window.btoa(
    '["form_results",2]'
  )}`;
  const fuelFormUrl = `${applicationUrl}&formResultId=${window.btoa(
    '["form_results",3]'
  )}`;
  const productionFormUrl = `${applicationUrl}&formResultId=${window.btoa(
    '["form_results",4]'
  )}`;

  beforeEach(() => {
    cy.sqlFixture('fixtures/form-validation-setup');
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
  });

  afterEach(() => {
    cy.sqlFixture('fixtures/form-validation-teardown');
  });

  it('The application admin form shows validation errors', () => {
    cy.visit(adminFormUrl);
    cy.get('#page-content');

    // Operator details
    cy.get('#root_operator_name').clear().type('John Smith');
    cy.get('#root_operator_tradeName').clear().type('Acme Co');
    cy.get('#root_operator_naics').clear().type('112200');
    cy.get('#root_operator_bcCorporateRegistryNumber')
      .clear()
      .type('111112222233333');

    // Operator mailing address
    cy.get('#root_operator_mailingAddress_streetAddress')
      .clear()
      .type('100 North Pole');
    cy.get('#root_operator_mailingAddress_city').clear().type('Calgary');
    cy.get('#root_operator_mailingAddress_postalCode').clear().type('H2O 0H0');
    cy.get('#root_operator_mailingAddress_province').select('Alberta');

    // Operational rep details
    cy.get('#root_operationalRepresentative_firstName').clear().type('John');
    cy.get('#root_operationalRepresentative_lastName').clear().type('Smith');
    cy.get('#root_operationalRepresentative_position').clear().type('CEO');
    cy.get('#root_operationalRepresentative_email')
      .clear()
      .type('john@acme.com');
    cy.get('#root_operationalRepresentative_phone').clear().type('9009009001');

    // Operational rep mailing address
    cy.get('#root_operationalRepresentative_mailingAddress_streetAddress')
      .clear()
      .type('100 North Pole');
    cy.get('#root_operationalRepresentative_mailingAddress_city')
      .clear()
      .type('Calgary');
    cy.get('#root_operationalRepresentative_mailingAddress_postalCode')
      .clear()
      .type('111111');
    cy.get('#root_operationalRepresentative_mailingAddress_province').select(
      'Alberta'
    );

    // Facility details
    cy.get('#root_facility_facilityName').clear().type('Acme1');
    cy.get('#root_facility_facilityType').select('LFO');
    cy.get('#root_facility_bcghgid').clear().type('11001100223');

    cy.contains('Continue').click();
    cy.get(
      '#root_operator_bcCorporateRegistryNumber +div .error-detail'
    ).contains(
      'BC Corporate Registry number should be 1-3 letters followed by 7 digits'
    );

    cy.get(
      '#root_operationalRepresentative_mailingAddress_postalCode +div .error-detail'
    ).contains('Format should be A1A 1A1');

    cy.percySnapshot('admin');

    // Fix invalid data
    cy.get('#root_operationalRepresentative_mailingAddress_postalCode')
      .clear()
      .type('A1A 1A1');
    cy.get('#root_operator_bcCorporateRegistryNumber')
      .clear()
      .type('LLC1234567');
    cy.contains('Continue').click();
    cy.get('#page-content h1').contains('Emission');
  });

  it('The application emissions form shows validation errors', () => {
    // Emission Form
    cy.visit(emissionFormUrl);
    cy.wait(1000);
    cy.get('#root_sourceTypes_0_gases_0_annualEmission').clear();
    cy.contains('Continue').click(); // Try to submit the form
    cy.get(
      '#root_sourceTypes_0_gases_0_annualEmission +div .error-detail'
    ).contains('is a required property');
    cy.percySnapshot('Emissions form');

    // Fix invalid data
    cy.get('#root_sourceTypes_0_gases_0_annualEmission').type('42');
    cy.contains('Continue').click();
    cy.get('#page-content h1').contains('Fuel');
  });

  it('The application fuels form shows validation errors', () => {
    // Fuel Form
    cy.visit(fuelFormUrl);
    cy.contains('Add a fuel').click();
    cy.contains('Continue').click();
    cy.get('#root_0_fuelUnits +div .error-detail').contains(
      'is a required property'
    );
    cy.get('#root_0_quantity +div .error-detail').contains(
      'is a required property'
    );
    cy.get('#root_0_emissionCategoryRowId +div .error-detail').contains(
      'is a required property'
    );
    cy.percySnapshot('fuel');

    // Fix invalid data
    cy.get('#root_0_fuelRowId').type('Diesel');
    cy.get('#root_0_fuelRowId-item-1 > .dropdown-item').click();
    cy.get('#root_0_quantity').type('42');
    cy.get('#root_0_emissionCategoryRowId').select(
      'General Stationary Combustion'
    );
    cy.contains('Continue').click();
    cy.get('#page-content h1').contains('Production');
  });

  it('The application production form shows validation errors', () => {
    // Production Form
    cy.visit(productionFormUrl);
    cy.contains('Continue').click();
    cy.get('.rbt +div .error-detail').contains('is a required property');
    cy.get('#root_0_productRowId').click();
    cy.get('#root_0_productRowId-item-0 > .dropdown-item').click();
    cy.contains('Continue').click();
    cy.get('#root_0_productAmount +div .error-detail').contains(
      'is a required property'
    );
    cy.get('#root_0_productEmissions +div .error-detail').contains(
      'is a required property'
    );
    cy.percySnapshot('production');

    // Fix invalid data
    cy.get('#root_0_productRowId').clear().type('Aluminum');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productAmount').type('123');
    cy.get('#root_0_productEmissions').type('456');

    cy.contains('Continue').click();
    cy.get('#page-content h1').contains('Summary');
  });
});
