describe('When logged in as a reporter', () => {
  beforeEach(() => {
    cy.logout();
    cy.sqlFixture('fixtures/reporter-all-access-setup');
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
  });

  afterEach(() => {
    cy.sqlFixture('fixtures/reporter-all-access-teardown');
  });

  it('The reporter should be able to load all pages within their access scope', () => {
    cy.visit('/reporter/user-dashboard');
    cy.url().should('include', '/reporter/user-dashboard');
    cy.get('tr');
    cy.contains('View Facilities').click();
    cy.url().should('include', '/reporter/facilities-list');
    cy.get('tr');
    cy.contains('Resume').click();
    cy.url().should('include', '/reporter/ciip-application-legal-disclaimer');
    cy.get('input').click({multiple: true});
    cy.contains('Continue').click();
    cy.url().should('include', '/reporter/ciip-application');
    const applicationId = window.btoa('["applications", 2]');
    cy.visit(
      `/reporter/ciip-application?applicationId=${applicationId}&confirmationPage=true&version=1`
    );
    cy.url().should('include', '/reporter/ciip-application');
    cy.get('.btn').contains('Send to Certifier').click();
    cy.wait(500); // Wait for half second (otherwise cypress gets the input before the value has been set)
    cy.get('input').invoke('val').should('contain', 'localhost');
    cy.get('input')
      .invoke('val')
      .then(($url) => {
        cy.visit($url);
        cy.url().should('include', '/certifier/certification-redirect');
        cy.get('#page-content');
        cy.contains('Continue').click();
        cy.url().should('include', '/certifier');
        cy.get('.admin');
        cy.get('input').click({multiple: true});
        cy.get('.btn-success').click();
        cy.visit('/reporter/user-dashboard');
        cy.url().should('include', '/reporter/user-dashboard');
        cy.get('tr');
        cy.contains('View Facilities').click();
        cy.url().should('include', '/reporter/facilities-list');
        cy.get('tr');
        cy.contains('Resume').click();
        cy.url().should('include', '/reporter/ciip-application');
        cy.get('.nav-link');
        cy.contains('Summary').click();
        cy.url().should('include', '/reporter/ciip-application');
        cy.get('.btn').contains('Submit').click();
        cy.url().should('include', '/reporter/complete-submit');
        cy.contains('Dashboard').click();
        cy.url().should('include', '/reporter/user-dashboard');
        cy.get('tr');
        cy.contains('View Facilities').click();
        cy.url().should('include', '/reporter/facilities-list');
        cy.get('tr');
        cy.contains('View Submitted').click();
        cy.url().should('include', '/reporter/view-application');
        cy.get('.admin');
      });
  });
});
