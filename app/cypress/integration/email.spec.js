/* eslint-disable jest/valid-expect */

if (Cypress.env('NO_MAIL')) {
  describe('No tests run', () => {
    it('NO_MAIL flag was set', () => {
      cy.log('NOOP');
      Cypress.runner.stop();
    });
  });
}

// Note: this only replaces carriage returns, newlines and equals, but should be okay normalize differences in text content encoding of email body on CI vs. localhost.
function decoded(emailEncoded) {
  return String.raw`${emailEncoded}`.replace(/([=\n\r])/gm, '');
}

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
  cy.wait(500);
  cy.get('.dropdown-menu.show a.dropdown-item')
    .contains('MacDonalds Agriculture, Ltd.')
    .click();
  cy.wait(500);
  cy.contains('Request Access').click();
  cy.wait(500);
}

describe('Organisation access request emails', () => {
  beforeEach(() => {
    cy.sqlFixture('fixtures/email/org-access-setup');
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
    cy.request('DELETE', 'localhost:8025/api/v1/messages');
    cy.wait(500);
  });
  afterEach(() => {
    cy.logout();
    cy.sqlFixture('fixtures/email/org-access-teardown');
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
      expect(reporterMail.Content.Body).to.satisfy((body) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(body, 'text/html');
        return parsed.querySelector('a[href*="/reporter"]');
      });
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
        'approved you as an authorized representative'
      );
    });
  });
});

describe('Draft application started email', () => {
  beforeEach(() => {
    cy.sqlFixture('fixtures/email/draft-application-setup');
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
    cy.request('DELETE', 'localhost:8025/api/v1/messages');
    cy.wait(500);
  });
  afterEach(() => {
    cy.logout();
    cy.sqlFixture('fixtures/email/draft-application-teardown');
  });
  it('emails the reporter when they start a new application', () => {
    const organisationId = window.btoa('["organisations", 200]');
    cy.visit(
      `/reporter/facilities?organisationId=${encodeURIComponent(
        organisationId
      )}&organisationRowId=200`
    );
    cy.get('#page-content');

    // Assumption: The first facility with an 'Apply' button is the one created in test setup
    cy.contains('Apply').click();
    cy.wait(500);
    cy.request('localhost:8025/api/v1/messages').then((response) => {
      const message = response.body[0];
      expect(message.To[0].Mailbox).to.contain('reporter');
      expect(message.Content.Headers.Subject[0]).to.contain('CIIP');
      expect(decoded(message.Content.Body)).to.satisfy(
        (msg) =>
          msg.includes('Thank you for starting an application') &&
          msg.includes('MacDonalds Agriculture, Ltd.') &&
          msg.includes('Farm')
      );
    });
  });
});

describe('Certification & Confirmation emails', () => {
  before(() => {
    cy.sqlFixture('fixtures/email-setup');
  });
  beforeEach(() => {
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
  });
  after(() => {
    cy.wait(1000);
    cy.logout();
    cy.sqlFixture('fixtures/email-teardown');
  });

  it('should send notification emails to the certifier when the reporter sends a request, and to the reporter if the data is out of date', () => {
    cy.request('DELETE', 'localhost:8025/api/v1/messages');
    const applicationId = window.btoa('["applications", 2]');
    cy.visit(
      `/reporter/application?applicationId=${applicationId}&confirmationPage=true&version=1`
    );
    cy.url().should('include', '/reporter/application');
    cy.get('#certifierEmail').clear().type('certifier@certi.fy');
    cy.get('.btn').contains('Submit for Certification').click();
    cy.wait(1000);
    cy.request('localhost:8025/api/v1/messages').then((response) => {
      expect(response.status).to.eq(200);
      const message = response.body[0];
      expect(message.To[0].Mailbox).to.contain('certifier');
      expect(message.Content.Headers.Subject[0]).to.contain('CIIP');
      expect(decoded(message.Content.Body)).to.contain(
        'Your certification is requested'
      );
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
    cy.request('DELETE', 'localhost:8025/api/v1/messages');
  });

  it('should send a notification email to the reporter when application has been certified', () => {
    const applicationId = window.btoa('["applications", 2]');
    cy.visit(
      `/reporter/application?applicationId=${applicationId}&confirmationPage=true&version=1`
    );
    cy.url().should('include', '/reporter/application');
    cy.get('#certifierEmail').clear().type('certifier@certi.fy');
    cy.get('.btn').contains('Submit for Certification').click();
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
          expect(response.status).to.eq(200);
          const message = response.body[0];
          expect(message.To[0].Mailbox).to.contain('ciip-reporter');
          expect(message.Content.Headers.Subject[0]).to.contain('CIIP');
          expect(decoded(message.Content.Body)).to.contain(
            'has been signed by your certifier'
          );
          cy.request('DELETE', 'localhost:8025/api/v1/messages');
        });
        cy.wait(500);
      });
  });
  it('should send an email to the reporter and to the admin when application has been submitted', () => {
    const applicationId = window.btoa('["applications", 2]');
    cy.visit(
      `/reporter/application?applicationId=${applicationId}&confirmationPage=true&version=1`
    );
    cy.url().should('include', '/reporter/application');
    cy.get('.admin');
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
        'has submitted or updated their application'
      );
      cy.request('DELETE', 'localhost:8025/api/v1/messages');
    });
  });
});

describe('Certification email opt-out', () => {
  before(() => {
    cy.sqlFixture('fixtures/email-setup');
  });
  beforeEach(() => {
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
  });
  after(() => {
    cy.wait(1000);
    cy.logout();
    cy.sqlFixture('fixtures/email-teardown');
  });
  it('should not send a notification email to the certifier if the reporter opts out', () => {
    const applicationId = window.btoa('["applications", 2]');
    cy.request('DELETE', 'localhost:8025/api/v1/messages');
    cy.visit(
      `/reporter/application?applicationId=${applicationId}&confirmationPage=true&version=1`
    );
    cy.url().should('include', '/reporter/application');
    cy.get('#certifierEmail').clear().type('certifier@certi.fy');
    cy.get('.form-check-input').click();
    cy.get('.btn').contains('Submit for Certification').click();
    cy.wait(1000);
    cy.request('localhost:8025/api/v1/messages').then((response) => {
      expect(response.body.length).to.eq(0);
      cy.request('DELETE', 'localhost:8025/api/v1/messages');
      cy.wait(500);
    });
  });
});

function makeApplicationDecision(decision) {
  const applicationId = window.btoa('["applications", 1]');
  const applicationRevisionId = window.btoa('["application_revisions", 1, 1]');
  cy.visit(
    `/analyst/application-review?applicationId=${encodeURIComponent(
      applicationId
    )}&applicationRevisionId=${encodeURIComponent(
      applicationRevisionId
    )}&version=1`
  );
  cy.get('#dropdown').click();
  cy.wait(500);
  cy.contains(decision).click();
  cy.wait(500);
}

describe('Application status change emails', () => {
  beforeEach(() => {
    cy.sqlFixture('fixtures/email/status-change-setup');
    cy.request('DELETE', 'localhost:8025/api/v1/messages');
    cy.login(
      Cypress.env('TEST_ANALYST_USERNAME'),
      Cypress.env('TEST_ANALYST_PASSWORD')
    );
    cy.wait(500);
  });
  afterEach(() => {
    cy.logout();
    cy.sqlFixture('fixtures/email/status-change-teardown');
  });

  it('should send the reporter an email when their application has been approved', () => {
    makeApplicationDecision('APPROVED');

    cy.request('localhost:8025/api/v1/messages').then((response) => {
      const message = response.body[0];
      expect(message.To[0].Mailbox).to.contain('reporter');
      expect(message.Content.Headers.Subject[0]).to.contain('CIIP');
      expect(decoded(message.Content.Body)).to.satisfy(
        (msg) =>
          msg.includes('Your CIIP Application') &&
          msg.includes('approved') &&
          msg.includes('MacDonalds Agriculture, Ltd.') &&
          msg.includes('Farm')
      );
    });
  });
  it('should send the reporter an email when their application has been rejected', () => {
    makeApplicationDecision('REJECTED');

    cy.request('localhost:8025/api/v1/messages').then((response) => {
      const message = response.body[0];
      expect(message.To[0].Mailbox).to.contain('reporter');
      expect(message.Content.Headers.Subject[0]).to.contain('CIIP');
      expect(decoded(message.Content.Body)).to.satisfy(
        (msg) =>
          msg.includes('Your CIIP Application') &&
          msg.includes('rejected') &&
          msg.includes('MacDonalds Agriculture, Ltd.') &&
          msg.includes('Farm')
      );
    });
  });
  it('should send the reporter an email when changes to their application have been requested', () => {
    makeApplicationDecision('REQUESTED_CHANGES');

    cy.request('localhost:8025/api/v1/messages').then((response) => {
      const message = response.body[0];
      expect(message.To[0].Mailbox).to.contain('reporter');
      expect(message.Content.Headers.Subject[0]).to.contain('CIIP');
      expect(decoded(message.Content.Body)).to.satisfy(
        (msg) =>
          msg.includes('Changes are requested to your CIIP application') &&
          msg.includes('MacDonalds Agriculture, Ltd.') &&
          msg.includes('Farm')
      );
    });
  });
});
