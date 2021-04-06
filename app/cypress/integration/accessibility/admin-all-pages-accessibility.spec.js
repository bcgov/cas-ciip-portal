describe('When logged in as an admin', () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.deployProdData();
    // The admin spec uses the same setup as the analyst
    cy.sqlFixture('fixtures/analyst-all-access-setup');
    cy.mockLogin('admin');
  });

  it('The admin dashboard has no detectable ally violations on load', () => {
    cy.visit('/admin');
    cy.url().should('include', '/admin');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it.skip('The user list page has no detectable ally violations on load', () => {
    cy.visit('/admin/users');
    cy.url().should('include', '/admin/users');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The products & benchmarks page has no detectable ally violations on load', () => {
    cy.visit('/admin/products-benchmarks');
    cy.url().should('include', '/admin/products-benchmarks');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The naics codes page has no detectable ally violations on load', () => {
    cy.visit('/admin/naics-codes');
    cy.url().should('include', '/admin/naics-codes');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The allowable products page has no detectable ally violations on load', () => {
    cy.visit('/admin/naics-products');
    cy.url().should('include', '/admin/naics-products');
    cy.get('.list-group-item:nth-child(1)').click();
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The products & benchmarks new product modal has no detectable ally violations on open', () => {
    cy.visit('/admin/products-benchmarks');
    cy.url().should('include', '/admin/products-benchmarks');
    cy.contains('New Product').click();
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it.skip('The products & benchmarks linking modal has no detectable ally violations on open', () => {
    cy.visit('/admin/products-benchmarks');
    cy.url().should('include', '/admin/products-benchmarks');
    cy.get(
      'tbody > :nth-child(1) .dropdown [aria-label="Product Settings"]'
    ).click();
    cy.get('tbody > :nth-child(1) .dropdown-menu.show')
      .contains('Linked products')
      .click();
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it.skip('The products & benchmarks product modal has no detectable ally violations on open', () => {
    cy.visit('/admin/products-benchmarks');
    cy.url().should('include', '/admin/products-benchmarks');
    cy.get(
      'tbody > :nth-child(1) .dropdown [aria-label="Product Settings"]'
    ).click();
    cy.get('tbody > :nth-child(1) .dropdown-menu.show')
      .contains('Product details')
      .click();
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it.skip('The products & benchmarks benchmark modal has no detectable ally violations on open', () => {
    cy.visit('/admin/products-benchmarks');
    cy.url().should('include', '/admin/products-benchmarks');
    cy.get(
      'tbody > :nth-child(1) .dropdown [aria-label="Product Settings"]'
    ).click();
    cy.get('tbody > :nth-child(1) .dropdown-menu.show')
      .contains('Benchmark')
      .click();
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it.skip('The reporting-years page has no detectable ally violations on load', () => {
    cy.visit('/admin/reporting-years');
    cy.url().should('include', '/admin/reporting-years');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it.skip('The reporting-years new reporting year modal has no detectable ally violations on open', () => {
    cy.visit('/admin/reporting-years');
    cy.url().should('include', '/admin/reporting-years');
    cy.get('#page-content > div > .btn').click();
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it.skip('The reporting-years edit reporting year modal has no detectable ally violations on open', () => {
    cy.visit('/admin/reporting-years');
    cy.url().should('include', '/admin/reporting-years');
    cy.get(':nth-child(1) > :nth-child(7) > .btn').click();
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });
});
