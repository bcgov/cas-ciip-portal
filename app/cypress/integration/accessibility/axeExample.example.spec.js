describe('The index page', () => {
  it('has no detectable a11y violations on load', () => {
    cy.visit('/');
    // Visit must come before injecting cypress-axe
    cy.injectAxe();
    cy.get('#page-content');
    // Check A11y for accessibility violations
    cy.checkA11y();
  });
});
