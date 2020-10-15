describe('When logged in as an admin', () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.deployProdData();
    // The admin spec uses the same setup as the analyst
    cy.sqlFixture('fixtures/analyst-all-access-setup');
    cy.login(
      Cypress.env('TEST_ADMIN_USERNAME'),
      Cypress.env('TEST_ADMIN_PASSWORD')
    );
  });

  afterEach(() => {
    cy.logout();
  });

  it('The admin dashboard has no detectable ally violations on load', () => {
    cy.visit('/admin');
    cy.url().should('include', '/admin');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The user list page has no detectable ally violations on load', () => {
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

  it('The products & benchmarks new product modal has no detectable ally violations on open', () => {
    cy.visit('/admin/products-benchmarks');
    cy.url().should('include', '/admin/products-benchmarks');
    cy.get('[style="text-align: right;"] > .btn').click();
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The products & benchmarks linking modal has no detectable ally violations on open', () => {
    cy.visit('/admin/products-benchmarks');
    cy.url().should('include', '/admin/products-benchmarks');
    cy.get('tbody > :nth-child(1) > :nth-child(8) > .svg-inline--fa').click();
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The products & benchmarks product modal has no detectable ally violations on open', () => {
    cy.visit('/admin/products-benchmarks');
    cy.url().should('include', '/admin/products-benchmarks');
    cy.get(':nth-child(1) > :nth-child(9) > .fa-tachometer-alt > path').click();
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The products & benchmarks benchmark modal has no detectable ally violations on open', () => {
    cy.visit('/admin/products-benchmarks');
    cy.url().should('include', '/admin/products-benchmarks');
    cy.get(':nth-child(1) > :nth-child(9) > .fa-cube > path').click();
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The reporting-years page has no detectable ally violations on load', () => {
    cy.visit('/admin/reporting-years');
    cy.url().should('include', '/admin/reporting-years');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The reporting-years new reporting year modal has no detectable ally violations on open', () => {
    cy.visit('/admin/reporting-years');
    cy.url().should('include', '/admin/reporting-years');
    cy.get('#page-content > div > .btn').click();
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The reporting-years edit reporting year modal has no detectable ally violations on open', () => {
    cy.visit('/admin/reporting-years');
    cy.url().should('include', '/admin/reporting-years');
    cy.get(':nth-child(1) > :nth-child(7) > .btn').click();
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });
});
