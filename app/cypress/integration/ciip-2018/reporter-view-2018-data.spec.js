describe('When logged in as a reporter', () => {
  beforeEach(() => {
    cy.getCypressPath();
    cy.cleanSchema();
    cy.sqlFixture('fixtures/ciip-2018/add-2018-data');
    cy.mockLogin('reporter');
  });

  it('The reporter does stuff', () => {
    cy.visit('/');
  });
});
