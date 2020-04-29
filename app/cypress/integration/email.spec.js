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
    });

    it('should send an automatic email upon registration', () => {
      cy.wait(500);
      cy.request('localhost:8025/api/v1/messages').then((response) => {
        // eslint-disable-next-line jest/valid-expect
        expect(response.status).to.eq(200);
        // eslint-disable-next-line jest/valid-expect
        expect(response.body[0].Content.Body).to.contain(
          'Thank you for registering'
        );
        cy.request('DELETE', 'localhost:8025/api/v1/messages');
      });
    });
  });

  describe('Certification & Confirmation emails', () => {
    before(() => {
      cy.sqlFixture('fixtures/email-setup');
    });
    beforeEach(() => {
      cy.logout();
      cy.login(
        Cypress.env('TEST_REPORTER_USERNAME'),
        Cypress.env('TEST_REPORTER_PASSWORD')
      );
    });
    after(() => {
      cy.wait(1000);
      cy.sqlFixture('fixtures/email-teardown');
    });
    it('should send notification emails to the certifier when the reporter sends a request, and to the reporter if the data is out of date', () => {
      const applicationId = window.btoa('["applications", 2]');
      cy.visit(
        `/reporter/ciip-application?applicationId=${applicationId}&confirmationPage=true&version=1`
      );
      cy.url().should('include', '/reporter/ciip-application');
      cy.get('#certifierEmail').clear().type('certifier@certi.fy');
      cy.get('.btn').contains('Send to Certifier').click();
      cy.wait(1000);
      cy.request('localhost:8025/api/v1/messages').then((response) => {
        // eslint-disable-next-line jest/valid-expect
        expect(response.status).to.eq(200);
        // eslint-disable-next-line jest/valid-expect
        expect(response.body[0].To[0].Mailbox).to.contain('certifier');
        // eslint-disable-next-line jest/valid-expect
        expect(response.body[0].Content.Body).to.contain(
          'has requested that you review'
        );
        cy.request('DELETE', 'localhost:8025/api/v1/messages');
        cy.get('input')
          .invoke('val')
          .then(($url) => {
            cy.visit($url);
            cy.url().should('include', '/certifier/certification-redirect');
            cy.get('#page-content');
            cy.sqlFixture('fixtures/change-form-result');
            cy.wait(1000);
            cy.contains('Continue').click();
            cy.url().should('include', '/certifier');
            cy.get('#page-content');
            cy.get('.card-title').contains('The data has changed');
            cy.wait(500);
          });
      });
    });
    it('should send a notification email to the reporter when application has been certified', () => {
      const applicationId = window.btoa('["applications", 2]');
      cy.visit(
        `/reporter/ciip-application?applicationId=${applicationId}&confirmationPage=true&version=1`
      );
      cy.url().should('include', '/reporter/ciip-application');
      cy.get('#certifierEmail').clear().type('certifier@certi.fy');
      cy.get('.btn').contains('Send to Certifier').click();
      cy.wait(500);
      cy.request('DELETE', 'localhost:8025/api/v1/messages');
      cy.get('input')
        .invoke('val')
        .then(($url) => {
          cy.visit($url);
          cy.url().should('include', '/certifier/certification-redirect');
          cy.get('#page-content');
          cy.contains('Continue').click();
          cy.url().should('include', '/certifier');
          cy.get('.admin');
          cy.get('input').click({multiple: true});
          cy.get('.btn-success').click();
          cy.wait(500);
          cy.request('localhost:8025/api/v1/messages').then((response) => {
            // eslint-disable-next-line jest/valid-expect
            expect(response.status).to.eq(200);
            // eslint-disable-next-line jest/valid-expect
            expect(response.body[0].To[0].Mailbox).to.contain('ciip-reporter');
            // eslint-disable-next-line jest/valid-expect
            expect(response.body[0].Content.Body).to.contain(
              'has been signed by your certifier'
            );
            cy.request('DELETE', 'localhost:8025/api/v1/messages');
          });
          cy.wait(500);
        });
    });
    it('should send a confirmation email to the reporter when application has been submitted', () => {
      const applicationId = window.btoa('["applications", 2]');
      cy.visit(
        `/reporter/ciip-application?applicationId=${applicationId}&confirmationPage=true&version=1`
      );
      cy.url().should('include', '/reporter/ciip-application');
      cy.get('.admin');
      cy.contains('Submit Application').click();
      cy.wait(1000);
      cy.request('localhost:8025/api/v1/messages').then((response) => {
        // eslint-disable-next-line jest/valid-expect
        expect(response.status).to.eq(200);
        // eslint-disable-next-line jest/valid-expect
        expect(response.body[0].To[0].Mailbox).to.contain('ciip-reporter');
        // eslint-disable-next-line jest/valid-expect
        expect(response.body[0].Content.Body).to.contain(
          'Thank you for your submission'
        );
        cy.request('DELETE', 'localhost:8025/api/v1/messages');
      });
    });
  });
}
