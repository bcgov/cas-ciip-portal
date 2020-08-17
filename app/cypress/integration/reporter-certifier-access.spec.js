describe('When logged in as a certifier(reporter)', () => {
  beforeEach(() => {
    cy.logout();
    cy.sqlFixture('fixtures/certifier-access-setup');
    cy.login(
      Cypress.env('TEST_CERTIFIER_USERNAME'),
      Cypress.env('TEST_CERTIFIER_PASSWORD')
    );
  });

  afterEach(() => {
    cy.logout();
    cy.sqlFixture('fixtures/certifier-access-teardown');
  });

  it('The certifier should be able to load all pages within their access scope', () => {
    const applicationId = window.btoa('["applications", 1]');
    cy.visit('localhost:3004/certifier/certification-redirect?rowId=testpage');
    cy.get('#page-content');
    cy.get('.page-wrap').happoScreenshot({
      component: 'Certification Redirect'
    });
    cy.contains('Continue').click();
    cy.visit(
      `http://localhost:3004/certifier/certify?applicationId=${applicationId}&version=1`
    );
    cy.url().should('include', '/certifier');
    cy.get('#page-content');
    cy.contains('Certifier Signature');
    cy.get('.btn-success').click();
    cy.visit('/certifier/requests');
    cy.get('#page-content');
    cy.should('not.contain', 'Certifier Signature');
    cy.get('.checkbox-cell input[type="checkbox"]').click();
    cy.contains('Legal Disclaimer');
    cy.contains('View').click();
    cy.url().should('include', '/certifier/certify');
    cy.get('.page-wrap').happoScreenshot({
      component: 'Certification Page'
    });
    cy.visit('/reporter');
    cy.get('.alert-link').contains('View all certification requests.').click();
    cy.url().should('include', '/certifier/requests');
    cy.get('.page-wrap').happoScreenshot({
      component: 'Batch certification page',
      variant: 'Nothing selected'
    });
    cy.get('input[type="checkbox"]').first().click();
    cy.get('.page-wrap').happoScreenshot({
      component: 'Batch certification page',
      variant: 'Multiple certification requests selected'
    });
  });

  it('should redirect the certifier to /certify if they access the edit view by URL', () => {
    const applicationId = window.btoa('["applications", 1]');
    const formResultId = window.btoa('[formResults, 1]');
    cy.visit(
      `http://localhost:3004/reporter/application?formResultId=${formResultId}&applicationId=${applicationId}&version=1`
    );
    cy.wait(500);
    cy.url().should('include', '/certifier/certify');
  });
});
