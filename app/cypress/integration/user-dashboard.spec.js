describe('User dashboard', () => {
  beforeEach(() => {
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
  });

  afterEach(() => cy.logout());

  it('contains organisation dearch dropdown', () => {
    cy.visit('/reporter/user-dashboard');
    cy.get('.search-dropdown.dropdown').contains('Request access');
    cy.get('.search-toggle.dropdown-toggle').click();

    cy.get('.org-scroll').should('be.not.empty');

    cy.get('.org-scroll')
      .find('a.dropdown-item')
      .its('length')
      .should('be.gt', 1);
  });

  it('matches the snapshot', () => {
    cy.visit('/reporter/user-dashboard');
    cy.get('#page-content');
    cy.percySnapshot();
  });
});
