describe('When filtering applications', () => {
  before(() => {
    cy.cleanSchema();
    cy.sqlFixture('fixtures/search-setup');
  });

  it('The application can be filtered by a numeric search', () => {
    cy.mockLogin('analyst');
    cy.visit('/analyst/applications');
    cy.get('#page-content');
    cy.get('table.search-table > tbody').find('tr').should('have.length', 3);
    cy.get('thead > tr > td:nth-child(1) > input.form-control')
      .clear()
      .type('1');
    cy.contains('Search').click();
    cy.get('#page-content');
    cy.url().should(
      'include',
      '/analyst/applications?relayVars=%7B%22id%22%3A1%7D'
    );
    cy.get('table.search-table > tbody').find('tr').should('have.length', 1);
    cy.get('tbody > tr > td:nth-child(1)').should('have.text', '1');
    cy.get('body').happoScreenshot({
      component: 'Application List',
      variant: 'Filtered By ID'
    });
    cy.contains('Reset').click();
    cy.get('#page-content');
    cy.get('table.search-table > tbody').find('tr').should('have.length', 3);
  });

  it('The application can be filtered by a text search', () => {
    cy.mockLogin('analyst');
    cy.visit('/analyst/applications');
    cy.get('#page-content');
    cy.get('thead > tr > td:nth-child(2) > input.form-control')
      .clear()
      .type('1');
    cy.contains('Search').click();
    cy.url().should(
      'include',
      '/analyst/applications?relayVars=%7B%22operator_name%22%3A%221%22%7D'
    );
    cy.get('table.search-table > tbody').find('tr').should('have.length', 1);
    cy.get('tbody > tr > td:nth-child(2)').should(
      'have.text',
      'test_organisation 1'
    );
    cy.contains('Reset').click();
  });

  it('The application can be filtered by an enum search', () => {
    cy.mockLogin('analyst');
    cy.visit('/analyst/applications');
    cy.get('#page-content');
    cy.get('thead > tr > td:nth-child(6) > select.form-control').select(
      'Submitted'
    );
    cy.contains('Search').click();
    cy.url().should(
      'include',
      '/analyst/applications?relayVars=%7B%22status%22%3A%22SUBMITTED%22%7D'
    );
    cy.get('table.search-table > tbody').find('tr').should('have.length', 2);
    cy.get('tbody > tr:nth-child(1) > td:nth-child(6)').should(
      'have.text',
      'Submitted'
    );
    cy.get('tbody > tr:nth-child(2) > td:nth-child(6)').should(
      'have.text',
      'Submitted'
    );
    cy.contains('Reset').click();
  });

  it('The application can be filtered by multiple search fields', () => {
    cy.mockLogin('analyst');
    cy.visit('/analyst/applications');
    cy.get('#page-content');
    cy.get('thead > tr > td:nth-child(2) > input.form-control')
      .clear()
      .type('1');
    cy.get('thead > tr > td:nth-child(6) > select.form-control').select(
      'Submitted'
    );
    cy.contains('Search').click();
    cy.url().should(
      'include',
      '/analyst/applications?relayVars=%7B%22operator_name%22%3A%221%22%2C%22status%22%3A%22SUBMITTED%22%7D'
    );
    cy.get('table.search-table > tbody').find('tr').should('have.length', 1);
    cy.get('tbody > tr > :nth-child(2)').should(
      'have.text',
      'test_organisation 1'
    );
    cy.get('tbody > tr > :nth-child(6)').should('have.text', 'Submitted');
    cy.contains('Reset').click();
  });
});
