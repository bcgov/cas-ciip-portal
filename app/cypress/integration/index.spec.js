describe('The index page', () => {
  it('contains the login buttons ', () => {
    cy.visit('/');
    cy.get('#page-content');
    cy.get('header').contains('Register');
    cy.get('header').contains('Login');
    cy.get('#page-content').contains('Register and Apply');
    cy.get('#page-content').contains(
      'Already have an account? Click here to login.'
    );
  });

  it('matches the snapshot', () => {
    cy.visit('/');
    cy.get('#page-content');
    cy.percySnapshot();
  });
});
