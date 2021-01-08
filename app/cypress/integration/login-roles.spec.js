describe('When not logged in', () => {
  before(() => {
    cy.cleanSchema();
    cy.sqlFixture('fixtures/create-test-users');
  });

  afterEach(() => {
    cy.logout();
  });

  it('Should be able to login as a certifier', () => {
    cy.login(
      Cypress.env('TEST_CERTIFIER_USERNAME'),
      Cypress.env('TEST_CERTIFIER_PASSWORD')
    );
    cy.visit('/certifier/requests');
    cy.url().should('include', '/certifier/requests');
    cy.get('h1').contains('Certification Requests');
  });

  it('Should be able to login as a reporter', () => {
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
    cy.visit('/reporter');
    cy.url().should('include', '/reporter');
    cy.get('h1').contains('My Operators');
  });

  it('Should be able to login as an analyst', () => {
    cy.login(
      Cypress.env('TEST_ANALYST_USERNAME'),
      Cypress.env('TEST_ANALYST_PASSWORD')
    );
    cy.visit('/analyst');
    cy.url().should('include', '/analyst');
    cy.get('h1').contains('Analyst Dashboard');
  });

  it('Should be able to login as an admin', () => {
    cy.login(
      Cypress.env('TEST_ADMIN_USERNAME'),
      Cypress.env('TEST_ADMIN_PASSWORD')
    );
    cy.visit('/admin');
    cy.url().should('include', '/admin');
    cy.get('h1').contains('Administrator Dashboard');
  });
});
