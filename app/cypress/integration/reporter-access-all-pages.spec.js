describe('When logged in as a reporter', () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture('fixtures/reporter-all-access-setup');
    cy.mockLogin('reporter');
  });

  it('The reporter should be able to load all pages within their access scope', () => {
    cy.visit('/reporter');
    cy.url().should('include', '/reporter');
    cy.get('tr');
    cy.contains('View Facilities').click();
    cy.url().should('include', '/reporter/facilities');
    cy.get('tbody > tr:nth-child(2) .btn')
      .contains('Resume CIIP application')
      .click();
    cy.url().should('include', '/reporter/new-application-disclaimer');
    cy.contains('Consent and continue').click();
    cy.url().should('include', '/reporter/application');
    const applicationId = window.btoa('["applications",2]');
    cy.visit(
      `/reporter/application?applicationId=${applicationId}&confirmationPage=true&version=1`
    );
    cy.url().should('include', '/reporter/application');

    cy.get('.btn').contains('Submit Application').click();
    cy.url().should('include', '/reporter/complete-submit');
    cy.contains('Dashboard').click();
    cy.url().should('include', '/reporter');
    cy.get('tr');
    cy.contains('View Facilities').click();
    cy.url().should('include', '/reporter/facilities');
    cy.get('tr');
    cy.contains('View Submitted').click();
    cy.url().should(
      'include',
      `/reporter/application/${applicationId}/version/1/view`
    );
    cy.get('.admin');

    // test permanent redirection from the v1 view-application page
    cy.visit(
      `/reporter/view-application?applicationId=${applicationId}&version=1`
    );
    cy.url().should(
      'include',
      `/reporter/application/${applicationId}/version/1/view`
    );
  });
});
