describe('The index page', () => {
  it('contains the login buttons ', () => {
    cy.useMockedTime(new Date(2021, 1, 29, 11, 11, 0, 0)); // Jan 29, 2021 11:11am

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
    cy.get('body').happoScreenshot({component: 'Index Page'});
  });

  it('does not contain the mocked database field', () => {
    cy.visit('/');
    cy.get('header').contains('Mocked database date:').should('not.exist');
    cy.get('header').contains('Database date').should('not.exist');
    cy.get('header').contains('Reset').should('not.exist');
  });
});
