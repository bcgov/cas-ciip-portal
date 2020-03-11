describe('When logged in as a reporter', () => {
  beforeEach(() => {
    cy.logout();
    cy.sqlFixture('fixtures/form-errors-prevent-submit-setup');
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
  });

  afterEach(() => {
    cy.sqlFixture('fixtures/form-errors-prevent-submit-teardown');
  });

  it('The reporter should not be able to send an application for certification if there are errors', () => {
    cy.visit('/reporter/user-dashboard');
    cy.url().should('include', '/reporter/user-dashboard');
    cy.get('tr');
    cy.contains('View Facilities').click();
    cy.url().should('include', '/reporter/facilities-list');
    cy.get('tr');
    cy.contains('Resume').click();
    cy.url().should('include', '/reporter/ciip-application-legal-disclaimer');
    cy.get('input').click({multiple: true});
    cy.contains('Continue').click();
    cy.url().should('include', '/reporter/ciip-application');
    const applicationId = window.btoa('["applications", 2]');
    cy.visit(
      `/reporter/ciip-application?applicationId=${applicationId}&confirmationPage=true&version=1`
    );
    cy.url().should('include', '/reporter/ciip-application');
    cy.get('.errors').contains('Your Application contains errors');
    cy.get('Send to Certifier').should('not.exist');
  });
});
