describe('The index page', () => {
  it('contains the login buttons ', () => {
    cy.visit('/');
    cy.get('#page-content');
    cy.get('header').contains('Register');
    cy.get('header').contains('Login');
    cy.get('header').happoScreenshot({component: 'Header'});
    cy.get('footer').happoScreenshot({component: 'Footer'});
    cy.get('#page-content').contains('Register and Apply');
    cy.get('#page-content').contains(
      'Already have an account? Click here to login.'
    );
    cy.get('#page-content').happoScreenshot({component: 'Index Page'});
  });

  it('does not contain the mocked database field', () => {
    cy.visit('/');
    cy.get('header').contains('Mocked database date:').should('not.exist');
    cy.get('header').contains('Database date').should('not.exist');
    cy.get('header').contains('Reset').should('not.exist');
  });
});
