describe('When reviewing a submitted application as an analyst', () => {
  before(() => {
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

  it('The application forms show validation errors', () => {
    cy.get('#page-content');
    // Admin Form (only validates DUNS currently)
    cy.get('#root_operator_duns')
      .clear()
      .type('asdf');
    cy.contains('Continue').click();
    cy.get('#root_operator_duns +div .error-detail').contains(
      'DUNS number should be nine digits'
    );
    // Cy.percySnapshot('admin');

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
    // Cy.percySnapshot('emission');

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
    // Cy.percySnapshot('fuel');

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
    // Cy.percySnapshot('electricity-heat');

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
    // Cy.percySnapshot('production');
  });
});
