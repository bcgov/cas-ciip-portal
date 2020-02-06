describe('When logged in as an analyst', () => {
  beforeEach(() => {
    cy.login(
      Cypress.env('TEST_ANALYST_USERNAME'),
      Cypress.env('TEST_ANALYST_PASSWORD')
    );
  });

  afterEach(() => {
    cy.logout();
  });

  it('The analyst should be able to load all pages within their access scope', () => {
    cy.visit('/analyst');
    cy.url().should('include', '/analyst');
    cy.get('.card-body');
    cy.contains('View all applications').click();
    cy.url().should('include', '/analyst/applications');
    cy.get('tr');
    cy.contains('View Application').click();
    cy.url().should('include', '/analyst/application-review');
    cy.visit('/analyst');
    cy.url().should('include', '/analyst');
    cy.get('.card-body');
  });
});
