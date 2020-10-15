describe('When the reporter is viewing a list of facilities & applications', () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture('fixtures/reporter-all-access-setup');
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
  });

  afterEach(() => {
    cy.logout();
    cy.sqlFixture('fixtures/reporter-all-access-teardown');
  });

  it('The reporter should be able to filter results by reporting period', () => {
    cy.visit('/reporter/facilities');
    cy.url().should('include', '/reporter/facilities');
    cy.get('#root_reportingYear').should('have.value', 2019);
    cy.get(':nth-child(1) > :nth-child(7) > .btn').should(
      'have.prop',
      'disabled',
      false
    );
    cy.get(':nth-child(1) > :nth-child(7) > .btn').should('contain', 'Resume');
    cy.get('#root_reportingYear').select('2018');
    cy.get('tbody > :nth-child(1) > :nth-child(6)').should(
      'contain',
      'not started'
    );
  });
});
