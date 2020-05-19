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
    cy.sqlFixture('fixtures/certifier-access-teardown');
  });

  it('The certifier should be able to load all pages within their access scope', () => {
    const applicationId = window.btoa('["applications", 1]');
    cy.visit('localhost:3004/certifier/certification-redirect?rowId=testpage');
    cy.get('#page-content');
    cy.contains('Continue').click();
    cy.visit(
      `http://localhost:3004/certifier/certify?applicationId=${applicationId}&version=1`
    );
    cy.url().should('include', '/certifier');
    cy.get('#page-content');
    cy.get(
      ':nth-child(5) > .legal-checklist > div.jsx-3053415049 > input.jsx-3053415049'
    ).click();
    cy.get(
      ':nth-child(6) > .legal-checklist > div.jsx-3053415049 > input.jsx-3053415049'
    ).click();
    cy.get(
      ':nth-child(7) > .legal-checklist > div.jsx-3053415049 > input.jsx-3053415049'
    ).click();
    cy.contains('Certifier Signature');
    cy.get('.btn-success').click();
    cy.visit('/certifier/requests');
    cy.get('#page-content');
    cy.contains('View').click();
    cy.url().should('include', '/certifier/certify');
  });
});
