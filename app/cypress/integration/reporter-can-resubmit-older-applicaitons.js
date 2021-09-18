describe('When an reporter wants to resubmit an older application', () => {
  const applicationSummaryURL = `/reporter/application/${window.btoa(
    '["applications",1]'
  )}?formId=&confirmationPage=true`;
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
    cy.get('.fade > .btn')
      .click()
      .then(() => {
        cy.contains('continue')
          .click()
          .then(() => {
            cy.visit(applicationSummaryURL).then(() => {
              cy.get('.override-accordion > .btn').click();
              cy.get('#overrideJustification')
                .clear()
                .type('delete me when fixed');
              cy.get('.btn-success').click();
              cy.contains('Submit').click();
              cy.url().should('include', '/reporter/complete-submit');
            });
          });
      });
  });
});
