describe('The production tab', () => {
  before(() => {
    cy.sqlFixture('fixtures/application-production-setup');
    cy.sqlFixture('test/product');
  });
  beforeEach(() => {
    cy.sqlFixture('fixtures/production-draft-form-result-setup');
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
    const applicationId = window.btoa('["applications", 2]');
    const formResultId = window.btoa('["form_results", 12]');
    cy.visit(
      `/reporter/application?formResultId=${formResultId}&applicationId=${applicationId}&version=1`
    );
  });

  afterEach(() => {
    cy.sqlFixture('fixtures/production-draft-form-result-teardown');
    cy.logout();
  });

  after(() => {
    cy.sqlFixture('fixtures/application-production-teardown');
  });

  it('Should render the aluminum product', () => {
    cy.get('#root_0_productRowId').clear().type('Aluminum');
    cy.get('.dropdown-item').click();
    cy.get('input:visible[type=text]').should('have.length', 4);
    cy.get('#root_0_productUnits').invoke('val').should('contain', 'tonnes');
    cy.get('#root_0_productAmount');
    cy.get('#root_0_productEmissions');
    // Cy.percySnapshot();
  });

  it('Should not show amount, units or emissions when requiresProductAmount and requiresEmissionAllocation are false', () => {
    cy.get('#root_0_productRowId').clear().type('non ciip');
    cy.get('.dropdown-item').click();
    cy.get('input:visible[type=text]').should('have.length', 1);
    cy.get('#root_0_productUnits').should('not.exist');
    cy.get('#root_0_productAmount').should('not.exist');
    cy.get('#root_0_productEmissions').should('not.exist');
    // Cy.percySnapshot();
  });
});
