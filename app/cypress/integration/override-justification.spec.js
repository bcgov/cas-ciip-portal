describe('When an applicaiton has errors', () => {
  before(() => {
    cy.logout();
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture('fixtures/override-justification-setup');
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
  });

  after(() => {
    cy.logout();
  });

  it('The reporter should be able to create, edit and delete an override justification for the errors in the application', () => {
    const applicationId = window.btoa('["applications", 1]');
    cy.visit(
      `/reporter/application?applicationId=${applicationId}&confirmationPage=true&version=1`
    );
    cy.url().should('include', '/reporter/application');
    // Application has errors
    cy.get('.errors').should('contain', 'contains errors');
    cy.get('.override-accordion > .btn').click();
    cy.get('.btn-success').click();
    // Justification cannot be empty
    cy.get('.justification-text').should('contain', 'cannot be empty');
    cy.get('#overrideJustification').clear().type('justified');
    cy.get('.btn-success').click();
    // Justification can be created
    cy.get('.alert-secondary').should('contain', 'justified');
    cy.get('.btn-secondary').click();
    cy.get('#overrideJustification').clear().type('justified changed');
    cy.get('.btn-success').click();
    // Justification can be edited
    cy.get('.alert-secondary').should('contain', 'justified changed');
    cy.get('.btn-danger').click();
    // Justification can be deleted
    cy.get('.override-accordion > .btn').click();
    cy.get('#overrideJustification').clear().type('justified');
    cy.get('.btn-success').click();
    cy.get('.alert-secondary').should('contain', 'justified');
    cy.get('.form-check-input').click();
    // Application can be sent to certifier with errors + a justification
    cy.get('#certifierEmail').clear().type('certifier@certi.fy');
    cy.get('form > .btn').click();
    cy.get('.text-center > .card-header').should(
      'contain',
      'Ready for Certification'
    );
    cy.wait(500);
    cy.logout();
  });

  it('The certifier should see the override notification', () => {
    cy.login(
      Cypress.env('TEST_CERTIFIER_USERNAME'),
      Cypress.env('TEST_CERTIFIER_PASSWORD')
    );
    const applicationId = window.btoa('["applications", 1]');
    cy.visit(`/certifier/certify?applicationId=${applicationId}&version=1`);
    cy.url().should('include', '/certifier/certify');
    cy.get('.bg-danger').should('contain', 'override is active');
    cy.get('.btn-success').click();
    cy.wait(500);
    cy.get('.page-title').should('contain', 'Certification Requests');
    cy.logout();
  });

  it('The reporter should see their override justification and be able to submit', () => {
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
    const applicationId = window.btoa('["applications", 1]');
    cy.visit(
      `/reporter/application?applicationId=${applicationId}&confirmationPage=true&version=1`
    );
    cy.url().should('include', '/reporter/application');
    cy.get('.alert-secondary').should('contain', 'justified');
    cy.get('.btn').contains('Submit').click();
    cy.url().should('include', '/reporter/complete-submit');
    cy.wait(500);
    cy.logout();
  });

  it('The analyst should see the override notification', () => {
    cy.login(
      Cypress.env('TEST_ANALYST_USERNAME'),
      Cypress.env('TEST_ANALYST_PASSWORD')
    );
    const applicationRevisionId = window.btoa(
      '["application_revisions", 1, 1]'
    );
    const applicationId = window.btoa('["applications", 1]');
    cy.visit(
      `/analyst/application-review?applicationId=${applicationId}&applicationRevisionId=${applicationRevisionId}&version=1`
    );
    cy.url().should('include', '/analyst');
    cy.get('.bg-danger').should('contain', 'override is active');
    cy.get('#justification > .card-body').should('contain', 'justified');
    cy.wait(500);
  });
});

describe('When an applicaiton does not have errors', () => {
  beforeEach(() => {
    cy.logout();
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture('fixtures/reporter-all-access-setup');
    cy.sqlFixture('fixtures/set-legal-disclaimer-true');
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
  });

  afterEach(() => {
    cy.logout();
  });

  it('The override justification box should not appear', () => {
    const applicationId = window.btoa('["applications", 2]');
    cy.visit(
      `/reporter/application?applicationId=${applicationId}&confirmationPage=true&version=1`
    );
    cy.url().should('include', '/reporter/application');
    cy.get('#next-step').contains('Application Certification');
    cy.get('.override-accordion > .btn').should('not.exist');
  });

  it('the justification should be automatically deleted if no more errors exist', () => {
    const applicationId = window.btoa('["applications", 2]');
    cy.visit(
      `/reporter/application?applicationId=${applicationId}&confirmationPage=true&version=1`
    );
    cy.url().should('include', '/reporter/application');
    cy.get(':nth-child(1) > .nav-link').click();
    cy.get('#root_operator_name').clear();
    cy.get('.nav-guide > :nth-child(5)').click();
    cy.get('.errors').should('contain', 'contains errors');
    cy.get('.override-accordion > .btn').click();
    cy.get('#overrideJustification').clear().type('delete me when fixed');
    cy.get('.btn-success').click();
    cy.get('.alert-secondary').should('contain', 'delete me when fixed');
    cy.get(':nth-child(1) > .nav-link').click();
    cy.get('#root_operator_name').clear().type('whoops');
    cy.get('.nav-guide > :nth-child(5)').click();
    cy.get('.override-accordion > .btn').should('not.exist');
    cy.get(':nth-child(1) > .nav-link').click();
    cy.get('#root_operator_name').clear();
    cy.get('.nav-guide > :nth-child(5)').click();
    cy.get('.errors').should('contain', 'contains errors');
    cy.get('.override-accordion > .btn').click();
    cy.get('.alert-secondary').should('not.contain', 'delete me when fixed');
    cy.wait(500);
  });
});
