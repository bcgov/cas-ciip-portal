// describe('When an application has errors', () => {
//   before(() => {
//     cy.cleanSchema();
//     cy.deployProdData();
//     cy.sqlFixture('fixtures/override-justification-setup');
//   });

//   it('The reporter should be able to create, edit and delete an override justification for the errors in the application', () => {
//     cy.mockLogin('reporter');
//     const applicationId = window.btoa('["applications",1]');
//     cy.visit(
//       `/reporter/application/${applicationId}?confirmationPage=true&version=1`
//     );
//     cy.url().should('include', '/reporter/application');
//     // Application has errors
//     cy.get('.errors').should('contain', 'contains errors');
//     cy.get('.override-accordion > .btn').click();
//     cy.get('.btn-success').click();
//     // Justification cannot be empty
//     cy.get('.justification-text').should('contain', 'cannot be empty');
//     cy.get('#overrideJustification').clear().type('justified');
//     cy.get('.btn-success').click();
//     // Justification can be created
//     cy.get('.alert-secondary').should('contain', 'justified');
//     cy.get('.btn-secondary').click();
//     cy.get('#overrideJustification').clear().type('justified changed');
//     cy.get('.btn-success').click();
//     // Justification can be edited
//     cy.get('.alert-secondary').should('contain', 'justified changed');
//     cy.get('.btn-danger').click();
//     // Justification can be deleted
//     cy.get('.override-accordion > .btn').click();
//     cy.get('#overrideJustification').clear().type('justified');
//     cy.get('.btn-success').click();
//     cy.get('.alert-secondary').should('contain', 'justified');
//   });

//   it('The reporter should see their override justification and be able to submit', () => {
//     cy.mockLogin('reporter');
//     const applicationId = window.btoa('["applications",1]');
//     cy.visit(
//       `/reporter/application/${applicationId}?confirmationPage=true`
//     );
//     cy.url().should('include', '/reporter/application');
//     cy.get('.alert-secondary').should('contain', 'justified');
//     cy.get('.btn').contains('Submit').click();
//     cy.url().should('include', '/reporter/complete-submit');
//   });

//   it('The analyst should see the override notification', () => {
//     cy.mockLogin('analyst');
//     const applicationRevisionId = window.btoa(
//       '["application_revisions", 1, 1]'
//     );
//     const applicationId = window.btoa('["applications",1]');
//     cy.visit(
//       `/analyst/application/${applicationId}`
//     );
//     cy.url().should('include', '/analyst');
//     cy.get('.bg-danger').should('contain', 'override is active');
//     cy.get('#justification > .card-body').should('contain', 'justified');
//     cy.wait(500);
//   });
// });

describe('When an application does not have errors', () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture('fixtures/reporter-all-access-setup');
    cy.sqlFixture('fixtures/set-legal-disclaimer-true');
  });

  it('The override justification box should not appear', () => {
    cy.mockLogin('reporter');
    const applicationId = window.btoa('["applications",2]');
    cy.visit(`/reporter/application/${applicationId}?confirmationPage=true`);
    cy.url().should('include', '/reporter/application');
    cy.get('.btn').contains('Submit Application');
    cy.get('.override-accordion > .btn').should('not.exist');
  });

  it('The justification should be automatically deleted if no more errors exist', () => {
    cy.mockLogin('reporter');
    const applicationId = window.btoa('["applications",2]');
    cy.visit(`/reporter/application/${applicationId}?confirmationPage=true`);
    cy.url().should('include', '/reporter/application');
    // clear the operator name in the admin page
    cy.get(':nth-child(1) > .nav-link').click();
    cy.get('#root_operator_name').clear();
    cy.get('.card-header').contains('Form input saved');

    // go to the summary page and add an override justification
    cy.get('.nav-guide > :nth-child(5)').click();
    cy.get('.errors').should('contain', 'contains errors');
    cy.get('.override-accordion > .btn').click();
    cy.get('#overrideJustification').clear().type('delete me when fixed');
    cy.get('.btn-success').click();
    cy.get('.alert-secondary').should('contain', 'delete me when fixed');

    // go back to the admin page to fix the issue
    cy.get(':nth-child(1) > .nav-link').click();
    cy.get('#root_operator_name').clear().type('whoops');
    cy.get('.card-header').contains('Form input saved');

    cy.get('.nav-guide > :nth-child(5)').click();
    cy.get('#administrative-data_operator_name').should('contain', 'whoops');
    cy.get('.override-accordion > .btn').should('not.exist');
    cy.get(':nth-child(1) > .nav-link').click();
    cy.get('#root_operator_name').clear();
    cy.get('.card-header').contains('Form input saved');

    cy.get('.nav-guide > :nth-child(5)').click();
    cy.get('.errors').should('contain', 'contains errors');
    cy.get('.override-accordion > .btn').click();
    cy.get('#overrideJustification').should(
      'not.contain',
      'delete me when fixed'
    );
  });
});
