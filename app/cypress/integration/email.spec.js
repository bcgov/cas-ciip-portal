describe('The environment variables are not stupid', () => {
  it('should have envs ', () => {
    if (Cypress.env('NO_MAIL')) {
      cy.log('Flag: NO_MAIL is set. Email tests did not run');
    } else {
      cy.log('mail uh oh');
    }
  });
});
