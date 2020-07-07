describe('The products and benchmark page', () => {
  beforeEach(() => {
    cy.sqlFixture('fixtures/products-benchmarks-setup');
    cy.login(
      Cypress.env('TEST_ADMIN_USERNAME'),
      Cypress.env('TEST_ADMIN_PASSWORD')
    );
    cy.visit('/admin/products-benchmarks');
    cy.get('#page-content');
  });

  afterEach(() => {
    cy.sqlFixture('fixtures/products-benchmarks-teardown');
    cy.logout();
  });

  it('Displays the list of all products', () => {
    cy.get('tr').its('length').should('be.gte', 4);
    cy.get('#page-content').contains('Product A');
    cy.get('#page-content').contains('Product B');
    cy.get('#page-content').contains('Product C');
  });

  it('Displays the proper statuses for each product', () => {
    cy.get('tbody > :nth-child(1) > :nth-child(6)').contains('DRAFT');
    cy.get('tbody > :nth-child(2) > :nth-child(6)').contains('PUBLISHED');
    cy.get('tbody > :nth-child(3) > :nth-child(6)').contains('ARCHIVED');
  });
});

describe('The benchmark modal', () => {
  beforeEach(() => {
    cy.sqlFixture('fixtures/products-benchmarks-setup');
    cy.login(
      Cypress.env('TEST_ADMIN_USERNAME'),
      Cypress.env('TEST_ADMIN_PASSWORD')
    );
    cy.visit('/admin/products-benchmarks');
    cy.get('#page-content');
  });

  afterEach(() => {
    cy.sqlFixture('fixtures/products-benchmarks-teardown');
    cy.logout();
  });

  it('Opens & displays the correct data in the benchmark modal', () => {
    cy.get(':nth-child(1) > :nth-child(9) > .fa-tachometer-alt > path').click();
    cy.get('#root_benchmark').should('have.prop', 'disabled', false);
    cy.get('#root_benchmark').should('have.value', '0.12');
    cy.get('#root_startReportingYear').should('have.value', '2018');
    cy.get('#root_endReportingYear').should('have.value', '2022');
    cy.get('#root_eligibilityThreshold').should('have.value', '0.15');
    cy.get('#root_incentiveMultiplier').should('have.value', '1');
    cy.get('#root_minimumIncentiveRatio').should('have.value', '0');
    cy.get('#root_maximumIncentiveRatio').should('have.value', '1');
    cy.get('.rjsf > .btn').contains('Save');
    cy.get('.modal-body > .container').happoScreenshot({
      component: 'Benchmark Modal'
    });
    cy.get('.close > [aria-hidden="true"]').click();
  });

  it('Allows editing a benchmark for a draft product', () => {
    cy.get(':nth-child(1) > :nth-child(9) > .fa-tachometer-alt > path').click();
    cy.get('#root_benchmark').should('have.prop', 'disabled', false);
    cy.get('#root_benchmark').clear().type('12');
    cy.get('.rjsf > .btn').contains('Save');
    cy.get('.rjsf > .btn').click();
    cy.get('tbody > :nth-child(1) > :nth-child(3)').contains('12');
  });

  it('Allows editing a benchmark for a published product', () => {
    cy.get(':nth-child(2) > :nth-child(9) > .fa-tachometer-alt > path').click();
    cy.get('#root_benchmark').should('have.prop', 'disabled', false);
    cy.get('#root_benchmark').clear().type('10');
    cy.get('.rjsf > .btn').contains('Save');
    cy.get('.rjsf > .btn').click();
    cy.get('tbody > :nth-child(2) > :nth-child(3)').contains('10');
  });

  it('Allows editing a benchmark for a published (read-only) product', () => {
    cy.get(':nth-child(4) > :nth-child(9) > .fa-tachometer-alt > path').click();
    cy.get('#root_benchmark').should('have.prop', 'disabled', false);
    cy.get('#root_benchmark').clear().type('10');
    cy.get('.rjsf > .btn').contains('Save');
    cy.get('.rjsf > .btn').click();
    cy.get('tbody > :nth-child(4) > :nth-child(3)').contains('10');
  });

  it('Does not allow editing a benchmark for an archived product', () => {
    cy.get(':nth-child(3) > :nth-child(9) > .fa-tachometer-alt > path').click();
    cy.get('#root_benchmark').should('have.prop', 'disabled', true);
    cy.get('.rjsf > .btn').should('have.class', 'hidden-button');
    cy.get('.close > [aria-hidden="true"]').click();
  });
});

describe('The linking modal', () => {
  beforeEach(() => {
    cy.sqlFixture('fixtures/products-benchmarks-setup');
    cy.login(
      Cypress.env('TEST_ADMIN_USERNAME'),
      Cypress.env('TEST_ADMIN_PASSWORD')
    );
    cy.visit('/admin/products-benchmarks');
    cy.get('#page-content');
  });

  afterEach(() => {
    cy.sqlFixture('fixtures/products-benchmarks-teardown');
    cy.logout();
  });

  it('Can add and remove product links', () => {
    cy.get('#page-content');
    cy.get(
      'tbody > :nth-child(1) > :nth-child(8) > .svg-inline--fa > path'
    ).click({force: true});
    cy.get('#root-add').click();
    cy.get('#root_0_productRowId').clear().type('Product B');
    cy.get('.dropdown-item').click();
    cy.get('.save-button').click();
    cy.get(
      'tbody > :nth-child(1) > :nth-child(8) > .svg-inline--fa > path'
    ).click({force: true});
    cy.get('.remove-button-container > .btn').click();
    cy.get('.save-button').click();
    cy.get(
      'tbody > :nth-child(1) > :nth-child(8) > .svg-inline--fa > path'
    ).click({force: true});
    cy.get('.modal-body > .container')
      .contains('Product B')
      .should('not.exist');
    cy.get('.modal-body > .container').happoScreenshot({
      component: 'Link Product Modal'
    });
  });
});

describe('The Create Product modal', () => {
  beforeEach(() => {
    cy.sqlFixture('fixtures/products-benchmarks-setup');
    cy.login(
      Cypress.env('TEST_ADMIN_USERNAME'),
      Cypress.env('TEST_ADMIN_PASSWORD')
    );
    cy.visit('/admin/products-benchmarks');
    cy.get('#page-content');
  });

  afterEach(() => {
    cy.sqlFixture('fixtures/products-benchmarks-teardown');
    cy.logout();
  });

  it('Creates & displays a new product', () => {
    cy.contains('New Product').click();
    cy.get('#root_productName').clear().type('newProduct');
    cy.get('#root_units').clear().type('units');
    cy.get(
      '#root_requiresEmissionAllocation > :nth-child(1) > label > :nth-child(1) > input'
    ).click();
    cy.get(
      '#root_isCiipProduct > :nth-child(1) > label > :nth-child(1) > input'
    ).click();
    cy.get(
      '#root_requiresProductAmount > :nth-child(1) > label > :nth-child(1) > input'
    ).click();
    cy.get(
      '#root_addPurchasedElectricityEmissions > :nth-child(1) > label > :nth-child(1) > input'
    ).click();
    cy.get(
      '#root_addPurchasedHeatEmissions > :nth-child(1) > label > :nth-child(1) > input'
    ).click();
    cy.get(
      '#root_addEmissionsFromEios > :nth-child(1) > label > :nth-child(1) > input'
    ).click();
    cy.get(
      '#root_subtractExportedElectricityEmissions > :nth-child(1) > label > :nth-child(1) > input'
    ).click();
    cy.get(
      '#root_subtractExportedHeatEmissions > :nth-child(1) > label > :nth-child(1) > input'
    ).click();
    cy.get(
      '#root_subtractGeneratedElectricityEmissions > :nth-child(1) > label > :nth-child(1) > input'
    ).click();
    cy.get(
      '#root_subtractGeneratedHeatEmissions > :nth-child(1) > label > :nth-child(1) > input'
    ).click();
    cy.get('.card-body').happoScreenshot({
      component: 'Create Product Modal'
    });
    cy.contains('Add Product').click();
    cy.get('tr').its('length').should('be.gte', 5);
    cy.get('tbody > :nth-child(1) > :nth-child(6)').contains('DRAFT');
  });
});
