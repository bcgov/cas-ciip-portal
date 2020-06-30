describe('When visiting the page as a guest', () => {
  it('The index page has no detectable ally violations on load', () => {
    cy.visit('/');
    cy.get('#page-content');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The disclaimer page has no detectable ally violations on load', () => {
    cy.visit('/resources/disclaimer');
    cy.get('#page-content');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The privacy page has no detectable ally violations on load', () => {
    cy.visit('/resources/privacy');
    cy.get('#page-content');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The copyright page has no detectable ally violations on load', () => {
    cy.visit('/resources/copyright');
    cy.get('#page-content');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The contact page has no detectable ally violations on load', () => {
    cy.visit('/resources/contact');
    cy.get('#page-content');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });
});
