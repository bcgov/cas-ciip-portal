//--------------------------------//
//         Applications           //
//--------------------------------//

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
    cy.contains('Apply').click();
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
    cy.contains('Clear').click();
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
    cy.contains('Apply').click();
    cy.url().should(
      'include',
      '/analyst/applications?relayVars=%7B%22operator_name%22%3A%221%22%7D'
    );
    cy.get('table.search-table > tbody').find('tr').should('have.length', 1);
    cy.get('tbody > tr > td:nth-child(2)').should(
      'have.text',
      'test_organisation 1'
    );
    cy.contains('Clear').click();
  });

  it('The application can be filtered by an enum search', () => {
    cy.mockLogin('analyst');
    cy.visit('/analyst/applications');
    cy.get('#page-content');
    cy.get('thead > tr > td:nth-child(6) > select.form-control').select(
      'Submitted'
    );
    cy.contains('Apply').click();
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
    cy.contains('Clear').click();
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
    cy.contains('Apply').click();
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
    cy.contains('Clear').click();
  });
});

//--------------------------------//
//     Organisation Requests      //
//--------------------------------//

describe('When filtering organisation requests', () => {
  before(() => {
    cy.cleanSchema();
    cy.sqlFixture('fixtures/search-setup');
    cy.useMockedTime(new Date('June 10, 2020 09:00:00'));
  });

  it('The application can be filtered by multiple search fields', () => {
    cy.mockLogin('analyst');
    cy.visit('/analyst/organisation-requests');
    cy.get('#page-content');
    cy.get('table.search-table > tbody').find('tr').should('have.length', 5);
    cy.get('thead > tr > td:nth-child(6) > select.form-control').select(
      'Approved'
    );
    cy.get('thead > tr > td:nth-child(3) > input.form-control')
      .clear()
      .type('Filch');
    cy.contains('Apply').click();
    cy.get('#page-content');
    cy.url().should(
      'include',
      'analyst/organisation-requests?relayVars=%7B%22last_name%22%3A%22Filch%22%2C%22status%22%3A%22APPROVED%22%7D'
    );
    cy.get('table.search-table > tbody').find('tr').should('have.length', 1);
    cy.get('tbody > tr:nth-child(1) > td:nth-child(5)').should(
      'have.text',
      'test_organisation 3'
    );
    cy.get('body').happoScreenshot({
      component: 'Organisation Requests List',
      variant: 'Filtered By Multiple'
    });
    cy.contains('Clear').click();
    cy.get('#page-content');
    cy.get('table.search-table > tbody').find('tr').should('have.length', 5);

describe('When filtering products', () => {
  before(() => {
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture('fixtures/search-setup');
  });

  it('The product list can be filtered by multiple search fields', () => {
    cy.mockLogin('admin');
    cy.visit('/admin/products-benchmarks');
    cy.get('#page-content');
    cy.get('thead > tr > td:nth-child(1) > input.form-control')
      .clear()
      .type('electricity');
    cy.get('thead > tr > td:nth-child(7) > select.form-control').select('Yes');
    cy.contains('Apply').click();
    cy.get('table.search-table > tbody').find('tr').should('have.length', 1);
    cy.get('tbody > tr > :nth-child(1)').should(
      'have.text',
      'Sold electricity'
    );
    cy.get('body').happoScreenshot({
      component: 'Product List',
      variant: 'Filtered by productName & isCiipBenchmarked'
    });
    cy.contains('Clear').click();
  });
});
