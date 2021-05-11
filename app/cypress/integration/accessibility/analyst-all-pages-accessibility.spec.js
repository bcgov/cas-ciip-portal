/*
  Skipped for now as it is not industry facing
*/

describe('When logged in as an analyst', () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture('fixtures/analyst-all-access-setup');
    cy.mockLogin('analyst');
  });

  it('The analyst dashboard has no detectable ally violations on load', () => {
    cy.visit('/analyst');
    cy.url().should('include', '/analyst');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it.skip('The organisation requests page has no detectable ally violations on load', () => {
    cy.visit('/analyst/organisation-requests');
    cy.url().should('include', '/analyst/organisation-requests');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it.skip('The application list page has no detectable ally violations on load', () => {
    cy.visit('/analyst/applications');
    cy.url().should('include', '/analyst/applications');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The application review page has no detectable ally violations on load', () => {
    cy.visit('/analyst/applications');
    cy.contains('View Application').click();
    cy.url().should('include', '/analyst/application/');
    cy.injectAxe();
    cy.get('#page-content');
    cy.get('body').happoScreenshot({
      component: 'Application Review',
      variant: 'no review selected'
    });
    cy.get('.review-step-option:first-of-type').click();
    cy.get('body').happoScreenshot({
      component: 'Application Review',
      variant: 'showing review in sidebar'
    });
    cy.checkA11y();
  });

  it.skip('The add organisation page has no detectable ally violations on load', () => {
    cy.visit('/analyst/add-organisation');
    cy.url().should('include', '/analyst/add-organisation');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it.skip('The add organisation modal has no detectable ally violations on open', () => {
    cy.visit('/analyst/add-organisation');
    cy.url().should('include', '/analyst/add-organisation');
    cy.get('.btn-outline-primary').click();
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it.skip('The add facility page has no detectable ally violations on load', () => {
    cy.visit('/analyst/add-facility');
    cy.url().should('include', '/analyst/add-facility');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it.skip('The add facility modal has no detectable ally violations on open', () => {
    cy.visit('/analyst/add-facility');
    cy.url().should('include', '/analyst/add-facility');
    cy.get('.card-body > .btn').click();
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });
});
