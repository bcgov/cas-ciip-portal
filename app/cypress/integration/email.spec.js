if (Cypress.env('NO_MAIL')) {
  describe('No tests run', () => {
    it('NO_MAIL flag was set', () => {
      cy.log('NOOP');
    });
  });
} else {
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
    it('should do nothing for now', () => {
      cy.wait(1000);
      cy.log('here');
    });
  });
}
