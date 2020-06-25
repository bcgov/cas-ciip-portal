const DASHBOARD_URLS = {
  admin: '/admin',
  analyst: '/analyst',
  reporter: '/reporter'
};

const {AUTHENTICATED_PAGES} = Cypress.env;

describe('Login redirects: Successful redirection to final destination through login prompt', () => {
  beforeEach(() => {
    cy.logout();
  });
  afterEach(() => {
    cy.logout();
  });

  Object.keys(DASHBOARD_URLS).forEach((role) => {
    const url = DASHBOARD_URLS[role];
    it(`should land the ${role} on the ${role} dashboard after redirecting through login`, () => {
      cy.visit(url);
      cy.url().should('include', '/login-redirect');
      cy.url().should('include', `?redirectTo=${encodeURIComponent(url)}`);

      // LOGIN FORM WON'T OPEN IN A FRAME...
      // ... BUT WE CAN TEST BEFORE & AFTER:

      cy.visit(`/login?redirectTo=${url}`);
      cy.url().should('include', url);
    });
  });
});

describe('Successful redirection of authenticated pages through login', () => {
  Object.keys(AUTHENTICATED_PAGES).forEach((role) => {
    it(`should land the ${role} user on each of the ${role} views after redirecting through login`, () => {
      const roleViews = AUTHENTICATED_PAGES[role];
      roleViews.forEach((view) => {
        // Dashboards were already tested above
        if (view === 'index') return;
        const url = `/${role}/${view}`;

        cy.visit(url);
        cy.url().should('include', '/login-redirect');
        cy.url().should('include', `?redirectTo=${encodeURIComponent(url)}`);
      });
    });
  });
});
