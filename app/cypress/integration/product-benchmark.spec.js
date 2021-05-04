function openProductSettings(row) {
  cy.get(
    `tbody > :nth-child(${row}) .dropdown [aria-label="Product Settings"]`
  ).click();
}

function openBenchmarkModal(row) {
  openProductSettings(row);
  cy.get(`tbody > :nth-child(${row}) .dropdown-menu.show`)
    .contains('Benchmark')
    .click();
}

function openLinkedProducts(row) {
  openProductSettings(row);
  cy.get(`tbody > :nth-child(${row}) .dropdown-menu.show`)
    .contains('Linked products')
    .click();
}

describe('The products and benchmark page', () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.sqlFixture('fixtures/products-benchmarks-setup');
    cy.mockLogin('admin');
  });

  it('displays the list of all products with the correct status', () => {
    cy.visit('/admin/products-benchmarks');
    cy.get('tr').its('length').should('be.gte', 4);
    cy.get('#page-content').contains('Product A');
    cy.get('#page-content').contains('Product B');
    cy.get('#page-content').contains('Product C');

    cy.get('tbody > :nth-child(1) .badge-pill.badge-warning').contains('DRAFT');
    cy.get('tbody > :nth-child(2) .badge-pill.badge-success').contains(
      'PUBLISHED'
    );
    cy.get('tbody > :nth-child(3) .badge-pill.badge-secondary').contains(
      'ARCHIVED'
    );
  });

  it('allows to view and edit benchmark data, when allowed', () => {
    cy.visit('/admin/products-benchmarks');
    cy.get('#page-content');
    openBenchmarkModal(1);
    cy.get('#root_benchmark').should('have.prop', 'disabled', false);
    cy.get('#root_benchmark').should('have.value', '0.12');
    cy.get('#root_startReportingYear').should('have.value', '2018');
    cy.get('#root_endReportingYear').should('have.value', '2022');
    cy.get('#root_eligibilityThreshold').should('have.value', '0.15');
    cy.get('#root_incentiveMultiplier').should('have.value', '1');
    cy.get('#root_minimumIncentiveRatio').should('have.value', '0');
    cy.get('#root_maximumIncentiveRatio').should('have.value', '1');
    cy.get('.rjsf > .btn').contains('Save');
    cy.get('body').happoScreenshot({
      component: 'Benchmark Modal'
    });

    cy.get('#root_benchmark').clear().type('12');
    cy.get('.rjsf > .btn').contains('Save').click();
    cy.get('tbody > :nth-child(1) > :nth-child(4)').contains('12');

    // edit a published product
    openBenchmarkModal(2);
    cy.get('#root_benchmark').should('have.prop', 'disabled', false);
    cy.get('#root_benchmark').clear().type('10');
    cy.get('.rjsf > .btn').contains('Save').click();
    cy.get('tbody > :nth-child(2) > :nth-child(4)').contains('10');

    // edit a published (read-only) product
    openBenchmarkModal(4);
    cy.get('#root_benchmark').should('have.prop', 'disabled', false);
    cy.get('#root_benchmark').clear().type('10');
    cy.get('.rjsf > .btn').contains('Save').click();
    cy.get('tbody > :nth-child(4) > :nth-child(4)').contains('10');

    // Does not allow editing a benchmark for an archived product
    openBenchmarkModal(3);
    cy.get('#root_benchmark').should('have.prop', 'disabled', true);
    cy.get('.rjsf > .btn').should('have.class', 'hidden-button');
    cy.get('.close > [aria-hidden="true"]').click();
  });

  it('allows to add and remove product links', () => {
    cy.visit('/admin/products-benchmarks');
    cy.get('#page-content');
    openLinkedProducts(1);
    cy.get('#search-products').clear().type('Product B');
    cy.get('#search-products-item-0 > .dropdown-item').click();
    cy.get('.col-md-2 > .btn').click();
    cy.get('tbody.jsx-868046180 > tr.jsx-868046180 > :nth-child(1)').contains(
      'Product B'
    );
    cy.get('.col-md-1 > .btn').click();
    openLinkedProducts(1);
    cy.get('[style="text-align: center;"] > .btn').click();
    cy.get('.col-md-1 > .btn').click();
    openLinkedProducts(1);
    cy.get('.modal-body > .container')
      .contains('Product B')
      .should('not.exist');
    cy.get('body').happoScreenshot({
      component: 'Link Product Modal'
    });
  });

  it('allows to create a new product', () => {
    cy.visit('/admin/products-benchmarks');
    cy.get('#page-content');
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
    cy.get('body').happoScreenshot({
      component: 'Create Product Modal'
    });
    cy.contains('Add Product').click();
    cy.get('tr').its('length').should('be.gte', 5);
    cy.get('tbody > :nth-child(1) .badge-pill.badge-warning').contains('DRAFT');
  });
});
