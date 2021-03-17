describe('When the reporter is viewing a list of facilities & applications', () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture('fixtures/reporter-all-access-setup');
    cy.mockLogin('reporter');
  });

  it('The reporter should be able to filter results by reporting period', () => {
    cy.visit('/reporter/facilities');
    cy.url().should('include', '/reporter/facilities');

    // Check the default reporting period
    cy.get('select[aria-label="Select reporting period"]').should(
      'have.value',
      2019
    );
    cy.get('tbody > tr:nth-child(1) a.btn').should('have.attr', 'href');
    cy.get('tbody > tr:nth-child(1) .btn').should('contain', 'Resume');
    cy.get('tbody > tr').should('have.length', 2);

    // Filter by application Id
    cy.get('input[aria-label="filter-by-applicationId"]').type(1);
    cy.get('thead button').contains('Apply').click();
    cy.get('tbody > tr').should('have.length', 1);

    // Change the reporting period (application Id filter should remain the same)
    cy.get('select[aria-label="Select reporting period"]').select('2018');
    cy.get('#no-search-results').should('have.length', 1);

    // Clear the application Id filter
    cy.get('thead button').contains('Clear').click();
    cy.get('tbody > tr:nth-child(1)').should('contain', 'not started');
    cy.get('tbody > tr').should('have.length', 2);
  });
});
