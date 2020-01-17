describe('The index page', () => {
  it('matches the snapshot when there is no session', () => {
    cy.visit('/');
    cy.get('.content');
    cy.document().toMatchSnapshot();
  });
});
