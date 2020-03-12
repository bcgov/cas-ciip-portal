describe('When a user is created', () => {
  before(() => {
    cy.sqlFixture('fixtures/add-user');
  });
  after(() => {
    cy.sqlFixture('fixtures/remove-user');
    cy.request('DELETE', 'localhost:8025/api/v1/messages');
  });

  it('should send an automatic email upon registration', () => {
    cy.wait(1000);
    cy.request('localhost:8025/api/v1/messages').then(response => {
      // eslint-disable-next-line jest/valid-expect
      expect(response.status).to.eq(200);
      // eslint-disable-next-line jest/valid-expect
      expect(response.body[0].Content.Body).to.contain(
        'Thank you for registering'
      );
    });
  });
});

describe('New test', () => {
  it('should do a thing', () => {
    cy.wait(1000);
    cy.log('here');
  });
});

// If (Cypress.env('NO_MAIL')) {
//   cy.log('Flag: NO_MAIL is set. Email tests did not run');
// } else {
//   cy.log('mail uh oh');
// }
// cy.get('#username')
//   .clear()
//   .type(Cypress.env('TEST_REPORTER_USERNAME'));
// cy.get('#password')
//   .clear()
//   .type(Cypress.env('TEST_REPORTER_PASSWORD'));
// cy.get('#kc-login').click();
