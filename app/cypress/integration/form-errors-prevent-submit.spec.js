describe('When logged in as a reporter', () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.deployProdData();
    cy.logout();
    cy.mockLogin('reporter');
    cy.sqlFixture('fixtures/form-errors-prevent-submit-setup');
  });

  it('The reporter should not be able to send an application for certification if there are errors', () => {
    const applicationId = window.btoa('["applications", 1]');
    cy.visit(
      `/reporter/application?applicationId=${applicationId}&confirmationPage=true&version=1`
    );
    cy.url().should('include', '/reporter/application');
    cy.get('.errors').contains('Your Application contains errors');
    cy.get('Submit for Certification').should('not.exist');
  });
});
