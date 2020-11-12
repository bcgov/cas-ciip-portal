import 'happo-cypress';

Cypress.Commands.add('login', (username, password) => {
  // Open the login page, fill in the form with username and password and submit.
  return cy
    .request({
      method: 'POST',
      url: '/login',
      followRedirect: true,
      retryOnStatusCodeFailure: true
    })
    .then((response) => {
      const el = document.createElement('html');
      el.innerHTML = response.body;
      // This should be more strict depending on your login page template.
      const loginForm = el.querySelectorAll('form');
      const isAlreadyLoggedIn = !loginForm.length;
      if (isAlreadyLoggedIn) {
        return;
      }

      return cy.request({
        form: true,
        method: 'POST',
        url: loginForm[0].action,
        followRedirect: true,
        retryOnStatusCodeFailure: true,
        body: {
          username,
          password
        }
      });
    });
});

Cypress.Commands.add('logout', () => {
  cy.request('/logout');
});

Cypress.Commands.add('sqlFixture', (fixtureName) => {
  cy.fixture(`${fixtureName}.sql`).then((fixture) =>
    cy.exec(`psql -d ciip_portal_dev << EOF
${fixture}
EOF`)
  );
});

Cypress.Commands.add('useMockedTime', (dateTime) => {
  cy.setCookie(
    'mocks.mocked_timestamp',
    Math.round(dateTime.getTime() / 1000).toString()
  );
});
Cypress.Commands.add('clearMockedTime', () => {
  cy.clearCookie('mocks.mocked_timestamp');
});

Cypress.Commands.add('deployProdData', () => {
  cy.exec('pushd ../ && ./.bin/deploy-data.sh -test && popd');
});

Cypress.Commands.add('cleanSchema', () => {
  cy.exec(
    `psql -d ciip_portal_dev -c 'select test_helper.clean_ggircs_portal_schema()'`
  );
});
