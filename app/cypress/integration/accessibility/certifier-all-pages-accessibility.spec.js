describe('When logged in as a certifier(reporter)', () => {
  beforeEach(() => {
    cy.logout();
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture('fixtures/certifier-access-setup');
    cy.login(
      Cypress.env('TEST_CERTIFIER_USERNAME'),
      Cypress.env('TEST_CERTIFIER_PASSWORD')
    );
    cy.useMockedTime(new Date(2020, 5, 10, 9, 0, 0, 0)); //May 10th at 9am
  });

  afterEach(() => {
    cy.logout();
  });

  it('The certifier redirect page has no detectable ally violations on load', () => {
    cy.visit('localhost:3004/certifier/certification-redirect?rowId=testpage');
    cy.contains('Continue');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The single certification request page has no detectable ally violations on load', () => {
    const applicationId = window.btoa('["applications", 1]');
    cy.visit(
      `http://localhost:3004/certifier/certify?applicationId=${applicationId}&version=1`
    );
    cy.url().should('include', '/certifier');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The certifier requests list page has no detectable ally violations on load', () => {
    cy.visit('/certifier/requests');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });
});
