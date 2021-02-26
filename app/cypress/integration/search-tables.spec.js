describe('When filtering applications', () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.sqlFixture('fixtures/search-setup');
    cy.mockLogin('analyst');
  });

  it('The application can be filtered by a numeric search', () => {
    cy.visit('/analyst');
    cy.get('#page-content');
    cy.visit('/analyst/applications');
    cy.get('#page-content');
    cy.get(':nth-child(1) > .form-control').clear().type('1');
    cy.contains('Search').click();
    cy.get('#page-content');
    cy.get('tbody > tr > :nth-child(1)').contains('1');
  });

  it('The application can be filtered by a text search', () => {
    cy.visit('/analyst');
    cy.get('#page-content');
    cy.visit('/analyst/applications');
    cy.get('#page-content');
    cy.get(':nth-child(2) > .form-control').clear().type('1');
    cy.contains('Search').click();
    cy.get('tbody > tr > :nth-child(2)').contains('test_organisation 1');
    cy.contains('Reset').click();
  });

  it('The application can be filtered by an enum search', () => {
    cy.visit('/analyst');
    cy.get('#page-content');
    cy.visit('/analyst/applications');
    cy.get('#page-content');
    cy.get(':nth-child(6) > .form-control').select('Submitted');
    cy.contains('Search').click();
    cy.get('tbody > :nth-child(1) > :nth-child(6)').contains('Submitted');
    cy.get('tbody > :nth-child(2) > :nth-child(6)').contains('Submitted');
    cy.contains('Reset').click();
  });

  it('The application can be filtered by multiple search fields', () => {
    cy.visit('/analyst');
    cy.get('#page-content');
    cy.visit('/analyst/applications');
    cy.get('#page-content');
    cy.get(':nth-child(2) > .form-control').clear().type('1');
    cy.get(':nth-child(6) > .form-control').select('Submitted');
    cy.contains('Search').click();
    cy.get('tbody > tr > :nth-child(2)').contains('test_organisation 1');
    cy.get('tbody > tr > :nth-child(6)').contains('Submitted');
    cy.get('tbody > :nth-child(2)').should('not.exist');
    cy.contains('Reset').click();
  });
});
