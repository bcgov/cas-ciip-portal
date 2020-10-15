describe('When logged in as a reporter', () => {
  beforeEach(() => {
    cy.logout();
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture('fixtures/reporter-all-access-setup');
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
  });

  afterEach(() => {
    cy.logout();
    cy.sqlFixture('fixtures/reporter-all-access-teardown');
  });

  it('The reporter should be able to load all pages within their access scope', () => {
    cy.visit('/reporter');
    cy.url().should('include', '/reporter');
    cy.get('tr');
    cy.contains('View Facilities').click();
    cy.url().should('include', '/reporter/facilities');
    cy.get('tr');
    cy.get(':nth-child(2) > :nth-child(7) > .btn').click();
    cy.url().should('include', '/reporter/new-application-disclaimer');
    cy.contains('Consent and continue').click();
    cy.url().should('include', '/reporter/application');
    const applicationId = window.btoa('["applications", 2]');
    cy.visit(
      `/reporter/application?applicationId=${applicationId}&confirmationPage=true&version=1`
    );
    cy.url().should('include', '/reporter/application');
    cy.get('#certifierEmail').type('certifier@certi.fy');
    cy.get('.btn').contains('Submit for Certification').click();
    cy.wait(500); // Wait for half second (otherwise cypress gets the input before the value has been set)
    cy.get('input').invoke('val').should('contain', 'localhost');
    cy.get('input')
      .invoke('val')
      .then(($url) => {
        cy.visit($url);
        cy.url().should('include', '/certifier/certification-redirect');
        cy.get('#page-content');
        cy.contains('Continue').click();
        cy.wait(500);
        cy.url().should('include', '/certifier');
        cy.get('.admin');
        cy.get('input').click({multiple: true});
        cy.get('.btn-success').click();
        cy.visit('/reporter');
        cy.url().should('include', '/reporter');
        cy.get('tr');
        cy.contains('View Facilities').click();
        cy.url().should('include', '/reporter/facilities');
        cy.get('tr');
        cy.get(':nth-child(2) > :nth-child(7) > .btn').click();
        cy.url().should('include', '/reporter/application');
        cy.get('.nav-link');
        cy.contains('Summary').click();
        cy.url().should('include', '/reporter/application');
        cy.get('.btn').contains('Submit').click();
        cy.url().should('include', '/reporter/complete-submit');
        cy.contains('Dashboard').click();
        cy.url().should('include', '/reporter');
        cy.get('tr');
        cy.contains('View Facilities').click();
        cy.url().should('include', '/reporter/facilities');
        cy.get('tr');
        cy.contains('View Submitted').click();
        cy.url().should('include', '/reporter/view-application');
        cy.get('.admin');
      });
  });
});
