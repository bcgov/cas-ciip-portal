describe('the product naics code association page', () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.sqlFixture('fixtures/product-naics-setup');
    cy.mockLogin('admin');
  });

  it('allows a user to add and delete a product for a naics code', () => {
    cy.visit('/admin/naics-products');
    cy.get('.page-title').contains('Allowable Products by Industry (NAICS)');

    // Testing initial state
    cy.get('.list-group').find('.list-group-item').should('have.length', 5);
    cy.get('#page-content').contains('Please select a NAICS code');

    // Testing adding an allowable product
    cy.get('.list-group').find('.list-group-item:nth-child(3)').click();
    cy.get('h3').contains('Bituminous Coal Mining');
    cy.url().should(
      'include',
      'admin/naics-products?naicsCodeId=WyJuYWljc19jb2RlcyIsM10%3D'
    );
    cy.get('#no-search-results');

    cy.get('#product-naics-search-typeahead').click();
    cy.get('.dropdown-menu').find('li').should('have.length', 4);
    cy.get('.dropdown-menu').should('contain', 'Product B');
    cy.get('.dropdown-menu > li:nth-child(2)').click();
    cy.get('button').contains('Add as Mandatory').click();

    cy.get('table tbody').find('tr').should('have.length', 1);
    cy.get('table tbody').find('tr').contains('Product B');
    cy.get('table tbody').find('tr').contains('Yes');
    cy.get('#no-search-results').should('not.exist');

    // Make sure it's gone from the available products in the dropdown
    cy.get('#product-naics-search-typeahead').click();
    cy.get('.dropdown-menu').find('li').should('have.length', 3);
    cy.get('.dropdown-menu').should('not.contain', 'Product B');

    // Testing removing an allowable product
    cy.get('table tbody').find('Button').contains('Delete').click();
    cy.get('.modal').find('Button').contains('Confirm Delete').click();
    cy.get('#no-search-results');

    // Make sure it's back in the available products in the dropdown
    cy.get('#product-naics-search-typeahead').click();
    cy.get('.dropdown-menu').find('li').should('have.length', 4);
    cy.get('.dropdown-menu').should('contain', 'Product B');
  });
});
