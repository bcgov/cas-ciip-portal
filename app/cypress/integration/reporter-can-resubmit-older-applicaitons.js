describe('When an reporter wants to resubmit an older application', () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture('fixtures/user-can-resubmit-older-applications-setup');
    cy.mockLogin('reporter');
  });

  it('The override justification box should not appear', () => {
    cy.visit(`/reporter/facilities`);
    cy.get('#page-content');
    cy.get('#reportingYear').select('2019');
    cy.get(':nth-child(8) > .btn').click();
    cy.get('.fade > .btn').click();
    cy.wait(500);
    cy.contains('continue').click();
    cy.get('#page-content');
    cy.get('.nav-guide > :nth-child(5)')
      .click()
      .then(() => {
        cy.get('#page-content');
        cy.get('.nav-guide > :nth-child(5)').click();
        cy.get('.override-accordion > .btn').click();
        cy.get('.btn').contains('Submit').click();
        cy.url().should('include', '/reporter/complete-submit');
      });
  });
});
