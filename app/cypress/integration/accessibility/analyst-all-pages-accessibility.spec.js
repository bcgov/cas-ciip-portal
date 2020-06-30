describe('When logged in as an analyst', () => {
  beforeEach(() => {
    cy.sqlFixture('fixtures/analyst-all-access-setup');
    cy.login(
      Cypress.env('TEST_ANALYST_USERNAME'),
      Cypress.env('TEST_ANALYST_PASSWORD')
    );
  });

  afterEach(() => {
    cy.logout();
    cy.sqlFixture('fixtures/analyst-all-access-teardown');
  });

  it('The analyst dashboard has no detectable ally violations on load', () => {
    cy.visit('/analyst');
    cy.url().should('include', '/analyst');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The organisation requests page has no detectable ally violations on load', () => {
    cy.visit('/analyst/organisation-requests');
    cy.url().should('include', '/analyst/organisation-requests');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The application list page has no detectable ally violations on load', () => {
    cy.visit('/analyst/applications');
    cy.url().should('include', '/analyst/applications');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The application review page has no detectable ally violations on load', () => {
    cy.visit('/analyst/applications');
    cy.contains('View Application').click();
    cy.url().should('include', '/analyst/application-review');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The add organisation page has no detectable ally violations on load', () => {
    cy.visit('/analyst/add-organisation');
    cy.url().should('include', '/analyst/add-organisation');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The add organisation modal has no detectable ally violations on open', () => {
    cy.visit('/analyst/add-organisation');
    cy.url().should('include', '/analyst/add-organisation');
    cy.get('.btn-outline-primary').click();
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The add facility page has no detectable ally violations on load', () => {
    cy.visit('/analyst/add-facility');
    cy.url().should('include', '/analyst/add-facility');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The add facility modal has no detectable ally violations on open', () => {
    cy.visit('/analyst/add-facility');
    cy.url().should('include', '/analyst/add-facility');
    cy.get('.card-body > .btn').click();
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });
});
