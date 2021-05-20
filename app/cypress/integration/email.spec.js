/* eslint-disable jest/valid-expect */

/*
   IF RUNNING THIS LOCALLY: you'll need your own mailhog instance
  `sudo docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog`
*/

if (Cypress.env('NO_MAIL')) {
  describe('No tests run', () => {
    it('NO_MAIL flag was set', () => {
      cy.log('NOOP');
      Cypress.runner.stop();
    });
  });
}

// Note: this only replaces carriage returns, newlines, equals and indentation but should be okay normalize differences in text content encoding of email body on CI vs. localhost.
function decoded(emailEncoded) {
  return String.raw`${emailEncoded}`
    .replace(/([=\n\r])/gm, '')
    .replace(/\s+/gm, ' ');
}

describe('When a user is created', () => {
  before(() => {
    cy.cleanSchema();
    cy.sqlFixture('fixtures/add-user');
  });

  it('should send an automatic email upon registration', () => {
    cy.wait(500);
    cy.request('localhost:8025/api/v1/messages').then((response) => {
      expect(response.status).to.eq(200);
      const message = response.body[0];
      expect(message.To[0].Mailbox).to.contain('newcypressuser');
      expect(message.Content.Headers.Subject[0]).to.contain('CIIP');
      expect(decoded(message.Content.Body)).to.contain(
        'Thank you for registering'
      );
      cy.request('DELETE', 'localhost:8025/api/v1/messages');
    });
  });
});

function requestAccessToOrg() {
  cy.visit('/reporter');
  cy.get('#page-content');
  cy.get('button#org-dropdown').click();
  cy.get('.dropdown-menu.show a.dropdown-item')
    .contains('MacDonalds Agriculture, Ltd.')
    .click();
  cy.get('.card h4').contains('MacDonalds Agriculture, Ltd.');
  cy.contains('Request Access').click();
  cy.get('td').contains('MacDonalds Agriculture, Ltd.');
}

describe('Organisation access request emails', () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.sqlFixture('fixtures/email/org-access-setup');
    cy.mockLogin('reporter');
    cy.request('DELETE', 'localhost:8025/api/v1/messages');
  });

  it('sends the reporter an email when they request organisation access', () => {
    requestAccessToOrg();
    cy.request('localhost:8025/api/v1/messages').then((response) => {
      const messages = response.body;
      expect(response.status).to.eq(200);
      expect(messages).to.satisfy((messages) => {
        return messages.some((msg) => msg.To[0].Mailbox.includes('reporter'));
      });
      const reporterMail = messages.find((msg) =>
        msg.To[0].Mailbox.includes('reporter')
      );
      expect(reporterMail.Content.Headers.Subject[0]).to.contain('CIIP');
      expect(decoded(reporterMail.Content.Body)).to.satisfy(
        (msg) =>
          msg.includes('You have requested access') &&
          msg.includes('MacDonalds Agriculture, Ltd.')
      );
    });
  });
  it('notifies the admin when organisation access is requested', () => {
    requestAccessToOrg();
    cy.request('localhost:8025/api/v1/messages').then((response) => {
      const messages = response.body;
      expect(response.status).to.eq(200);
      expect(messages).to.satisfy((messages) => {
        return messages.some((msg) =>
          msg.To[0].Mailbox.includes('GHGRegulator')
        );
      });
      const adminMail = messages.find((msg) =>
        msg.To[0].Mailbox.includes('GHGRegulator')
      );
      expect(adminMail.Content.Headers.Subject[0]).to.contain('CIIP');
      // Email encoding makes it difficult to check text verbatim:
      expect(decoded(adminMail.Content.Body)).to.satisfy(
        (msg) =>
          msg.includes('Cypress Reporter') &&
          msg.includes('has requested') &&
          msg.includes('access to the application') &&
          msg.includes('MacDonalds Agriculture, Ltd.')
      );
    });
  });
  it('notifies the reporter when their access to an org is approved', () => {
    requestAccessToOrg();
    // Clear the access request notifications before generating the approval email:
    cy.request('DELETE', 'localhost:8025/api/v1/messages');
    cy.wait(500);
    cy.sqlFixture('fixtures/email/org-access-approval');
    cy.wait(500);
    cy.request('localhost:8025/api/v1/messages').then((response) => {
      const message = response.body[0];
      expect(message.To[0].Mailbox).to.contain('reporter');
      expect(message.Content.Headers.Subject[0]).to.contain('CIIP');
      expect(decoded(message.Content.Body)).to.contain(
        'administrators have approved you to submit a CIIP application on behalf of'
      );
    });
  });
});

describe('Confirmation emails', () => {
  before(() => {
    cy.wait(500);
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture('fixtures/email-setup');
  });
  beforeEach(() => {
    cy.mockLogin('reporter');
  });

  it('should send an email to the reporter and to the admin when application has been submitted', () => {
    const applicationId = window.btoa('["applications",1]');
    cy.visit(`/reporter/application/${applicationId}?confirmationPage=true`);
    cy.url().should('include', '/reporter/application');
    cy.get('#next-step ~ button');
    cy.contains('Submit Application').click();
    cy.wait(1000);
    cy.request('localhost:8025/api/v1/messages').then((response) => {
      expect(response.status).to.eq(200);
      const messages = response.body;
      expect(messages).to.satisfy((messages) => {
        return messages.some((msg) =>
          msg.To[0].Mailbox.includes('ciip-reporter')
        );
      });
      const reporterMail = messages.find((msg) =>
        msg.To[0].Mailbox.includes('ciip-reporter')
      );
      expect(reporterMail.Content.Headers.Subject[0]).to.contain('CIIP');
      expect(decoded(reporterMail.Content.Body)).to.contain(
        'Thank you for your submission'
      );
      expect(messages).to.satisfy((messages) => {
        return messages.some((msg) =>
          msg.To[0].Mailbox.includes('GHGRegulator')
        );
      });
      const adminMail = messages.find((msg) =>
        msg.To[0].Mailbox.includes('GHGRegulator')
      );
      expect(adminMail.Content.Headers.Subject[0]).to.contain('CIIP');
      expect(decoded(adminMail.Content.Body)).to.contain(
        'has been submitted or updated'
      );
      cy.request('DELETE', 'localhost:8025/api/v1/messages');
    });
  });
});

function makeApplicationDecision(decision, appId) {
  const applicationId = window.btoa(`["applications", ${appId}]`);
  cy.visit(`/analyst/application/${encodeURIComponent(applicationId)}`);
  cy.get('#page-content');
  cy.get('#open-decision-dialog').click();
  cy.get(`button[value="${decision}"`).click();
  cy.get('#page-content');
}

describe('Application status change emails', () => {
  before(() => {
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture('fixtures/email/status-change-setup');
  });
  beforeEach(() => {
    cy.request('DELETE', 'localhost:8025/api/v1/messages');
    cy.wait(500);
  });

  it('should send the reporter an email when their application has been approved', () => {
    cy.mockLogin('analyst');
    cy.visit('/analyst');
    cy.get('#page-content');

    makeApplicationDecision('APPROVED', 1);
    cy.wait(500);

    cy.request('localhost:8025/api/v1/messages').then((response) => {
      const message = response.body[0];
      expect(message.To[0].Mailbox).to.contain('reporter');
      expect(message.Content.Headers.Subject[0]).to.contain('CIIP');
      expect(decoded(message.Content.Body)).to.satisfy(
        (msg) =>
          msg.includes('Your CIIP Application') &&
          msg.includes('approved') &&
          msg.includes('test_organisation') &&
          msg.includes('test_organisation_facility')
      );
    });
  });
  it('should send the reporter an email when their application has been rejected', () => {
    cy.mockLogin('analyst');
    cy.visit('/analyst');
    cy.get('#page-content');

    makeApplicationDecision('REJECTED', 2);
    cy.wait(500);

    cy.request('localhost:8025/api/v1/messages').then((response) => {
      const message = response.body[0];
      expect(message.To[0].Mailbox).to.contain('reporter');
      expect(message.Content.Headers.Subject[0]).to.contain('CIIP');
      expect(decoded(message.Content.Body)).to.satisfy(
        (msg) =>
          msg.includes('Your CIIP Application') &&
          msg.includes('rejected') &&
          msg.includes('test_organisation') &&
          msg.includes('test_organisation_facility')
      );
    });
  });
  it('should send the reporter an email when changes to their application have been requested', () => {
    cy.mockLogin('analyst');
    cy.visit('/analyst');
    cy.get('#page-content');

    makeApplicationDecision('REQUESTED_CHANGES', 3);
    cy.wait(500);

    cy.request('localhost:8025/api/v1/messages').then((response) => {
      const message = response.body[0];
      expect(message.To[0].Mailbox).to.contain('reporter');
      expect(message.Content.Headers.Subject[0]).to.contain('CIIP');
      expect(decoded(message.Content.Body)).to.satisfy(
        (msg) =>
          msg.includes('Changes are requested to your CIIP application') &&
          msg.includes('test_organisation') &&
          msg.includes('test_organisation_facility')
      );
    });
  });
});
