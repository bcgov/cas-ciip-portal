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
  });

  it('can be filtered by a numeric search', () => {
    cy.mockLogin('analyst');
    cy.visit('/analyst/organisation-requests');
    cy.get('#page-content');
    cy.get('table.search-table > tbody').find('tr').should('have.length', 5);
    cy.get('thead > tr > td:nth-child(1) > input.form-control')
      .clear()
      .type('2');
    cy.contains('Apply').click();
    cy.get('#page-content');
    cy.url().should(
      'include',
      '/analyst/organisation-requests?relayVars=%7B%22user_id%22%3A2%7D'
    );
    cy.get('table.search-table > tbody').find('tr').should('have.length', 2);
    cy.get('tbody > tr:nth-child(1) > td:nth-child(1)').should(
      'have.text',
      '2'
    );
    cy.get('body').happoScreenshot({
      component: 'Organisation Requests List',
      variant: 'Filtered By ID'
    });
    cy.contains('Clear').click();
    cy.get('#page-content');
    cy.get('table.search-table > tbody').find('tr').should('have.length', 5);
  });

  it('can be filtered by a text search', () => {
    cy.mockLogin('analyst');
    cy.visit('/analyst/organisation-requests');
    cy.get('#page-content');
    cy.get('table.search-table > tbody').find('tr').should('have.length', 5);
    cy.get('thead > tr > td:nth-child(4) > input.form-control')
      .clear()
      .type('Doug');
    cy.contains('Apply').click();
    cy.get('#page-content');
    cy.url().should(
      'include',
      '/analyst/organisation-requests?relayVars=%7B%22email_address%22%3A%22Doug%22%7D'
    );
    cy.get('table.search-table > tbody').find('tr').should('have.length', 1);
    cy.get('tbody > tr:nth-child(1) > td:nth-child(4)').should(
      'have.text',
      'Douglas.Fir@hhry.xxx'
    );
    cy.get('body').happoScreenshot({
      component: 'Organisation Requests List',
      variant: 'Filtered By Email'
    });
    cy.contains('Clear').click();
    cy.get('#page-content');
  });

  it('can be filtered by an enum search', () => {
    cy.mockLogin('analyst');
    cy.visit('/analyst/organisation-requests');
    cy.get('#page-content');
    cy.get('table.search-table > tbody').find('tr').should('have.length', 5);
    cy.get('thead > tr > td:nth-child(6) > select.form-control').select(
      'Pending'
    );
    cy.contains('Apply').click();
    cy.get('#page-content');
    cy.url().should(
      'include',
      '/analyst/organisation-requests?relayVars=%7B%22status%22%3A%22PENDING%22%7D'
    );
    cy.get('table.search-table > tbody').find('tr').should('have.length', 1);
    cy.get('tbody > tr:nth-child(1) > td:nth-child(5)').should(
      'have.text',
      'test_organisation 3'
    );
    cy.get('body').happoScreenshot({
      component: 'Organisation Requests List',
      variant: 'Filtered By Status'
    });
    cy.contains('Clear').click();
    cy.get('#page-content');
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
      variant: 'Filtered By Status'
    });
    cy.contains('Clear').click();
    cy.get('#page-content');
  });
});
