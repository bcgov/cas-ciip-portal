describe('The production tab', () => {
  before(() => {
    cy.sqlFixture('fixtures/application-production-setup');
    cy.sqlFixture('prod/product');
  });
  beforeEach(() => {
    cy.sqlFixture('fixtures/production-draft-form-result-setup');
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
    const applicationId = window.btoa('["applications", 2]');
    const formResultId = window.btoa('["form_results", 15]');
    cy.visit(
      `/reporter/ciip-application?formResultId=${formResultId}&applicationId=${applicationId}&version=1`
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
    cy.get('#root_0_productRowId')
      .clear()
      .type('Aluminum');
    cy.get('.dropdown-item').click();
    cy.get('input:visible[type=text]').should('have.length', 4);
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'tonnes');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productEmissions');
    cy.percySnapshot();
  });
});
