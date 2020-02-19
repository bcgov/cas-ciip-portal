import '@percy/cypress';

Cypress.Commands.add('login', (username, password) => {
  // Open the login page, fill in the form with username and password and submit.
  return (
    cy
      .request({
        method: 'POST',
        url: '/login',
        followRedirect: true,
        retryOnStatusCodeFailure: true
      })
      // This is not a real promise
      // eslint-disable-next-line promise/prefer-await-to-then
      .then(response => {
        const _el = document.createElement('html');
        _el.innerHTML = response.body;
        // This should be more strict depending on your login page template.
        const loginForm = _el.querySelectorAll('form');
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
      })
  );
});

Cypress.Commands.add('logout', () => {
  cy.request('/logout');
});

Cypress.Commands.add('sqlFixture', fixtureName => {
  // This is not a real promise
  // eslint-disable-next-line promise/prefer-await-to-then
  cy.fixture(`${String(fixtureName)}.sql`).then(fixture =>
    cy.exec(`psql -d ggircs_dev << ${String(fixture)}`)
  );
});
