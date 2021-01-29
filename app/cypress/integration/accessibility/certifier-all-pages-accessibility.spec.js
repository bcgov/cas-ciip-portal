describe('When logged in as a certifier(reporter)', () => {
  before(() => {
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture('fixtures/certifier-access-setup');
  });

  beforeEach(() => {
    cy.mockLogin('certifier');
    cy.useMockedTime(new Date('June 10, 2020 09:00:00'));
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
