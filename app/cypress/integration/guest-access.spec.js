describe('An unauthenticated user', () => {
  it('should not have access to the list of users', () => {
    cy.sqlFixture('dev/user');
    cy.request({
      url: 'graphql',
      body:
        '{ "query": "{ allCiipUsers { edges { node { firstName, lastName } } } }" }',
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    })
      .its('body')
      .should('deep.equal', {data: {allCiipUsers: {edges: []}}});
  });
});
