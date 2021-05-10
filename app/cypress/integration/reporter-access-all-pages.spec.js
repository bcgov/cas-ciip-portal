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
    cy.get('body').happoScreenshot({
      component: 'Reporter organisation access list'
    });
    cy.contains('View Facilities').click();
    cy.url().should('include', '/reporter/facilities');
    cy.get('tr');
    cy.get('body').happoScreenshot({
      component: 'Reporter facility list'
    });

    // Make sure it's the application we expect.
    cy.get('tbody > tr td:nth-child(7)')
      .contains('2')
      .next()
      .contains('Resume CIIP application')
      .click();

    const applicationId = window.btoa('["applications",2]');
    cy.url().should(
      'include',
      `/reporter/application/${applicationId}/version/1/disclaimer`
    );

    // test permanent redirection from the v1 application disclaimer page
    cy.visit(
      `/reporter/new-application-disclaimer?applicationId=${applicationId}&version=1`
    );
    cy.url().should(
      'include',
      `/reporter/application/${applicationId}/version/1/disclaimer`
    );

    cy.contains('Consent and continue').click();
    cy.url().should('include', '/reporter/application');
    // test permanent redirection from the v1 application page
    cy.visit(`/reporter/application?applicationId=${applicationId}&version=1`);
    cy.url().should('include', `/reporter/application/${applicationId}`);

    cy.visit(`/reporter/application/${applicationId}?confirmationPage=true`);
    cy.url().should('include', '/reporter/application');

    cy.get('.btn').contains('Submit Application').click();
    cy.url().should('include', '/reporter/complete-submit');
    cy.contains('Dashboard').click();
    cy.url().should('include', '/reporter');
    cy.get('tr');
    cy.contains('View Facilities').click();
    cy.url().should('include', '/reporter/facilities');
    cy.get('tbody > tr td:nth-child(7)')
      .contains('2')
      .next()
      .contains('View Submitted')
      .click();
    cy.url().should(
      'include',
      `/reporter/application/${applicationId}/version/1/view`
    );
    cy.get('.admin-2020');

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
