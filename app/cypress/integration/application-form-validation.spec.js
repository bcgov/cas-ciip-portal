describe('When reviewing a submitted application as an analyst', () => {
  before(() => {
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
    cy.visit(
      '/reporter/ciip-application?applicationId=WyJhcHBsaWNhdGlvbnMiLDJd&version=1&formResultId=WyJmb3JtX3Jlc3VsdHMiLDExXQ%3D%3D'
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
    cy.get('.error-detail').contains('should be number');
    // Cy.percySnapshot('emission');
    // Fuel Form
    cy.get(':nth-child(3) > .nav-link').click();
    cy.contains('Add a fuel').click();
    cy.contains('Continue').click();
    cy.get('.error-detail').contains('is a required property');
    // Cy.percySnapshot('fuel');
    // Electricity / Heat Form
    cy.get(':nth-child(4) > .nav-link').click();
    cy.contains('Continue').click();
    cy.get('#root_electricity_purchased +div .error-detail').contains(
      'is a required property'
    );
    // Cy.percySnapshot('electricity-heat');
    // Production Form
    cy.get(':nth-child(5) > .nav-link').click();
    cy.contains('Continue').click();
    cy.get('.error-detail').contains('is a required property');
    // Cy.percySnapshot('production');
  });
});
