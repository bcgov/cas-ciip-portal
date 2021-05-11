import path from 'path';

const QUERY_PARAMS = {
  '/reporter/application/[applicationId]/version/[versionNumber]/view': {
    applicationId: encodeURIComponent(window.btoa('["applications",1]')),
    versionNumber: '1'
  },
  '/reporter/application/[applicationId]': {
    applicationId: encodeURIComponent(window.btoa('["applications",1]'))
  },
  '/reporter/application/[applicationId]/version/[versionNumber]/disclaimer': {
    applicationId: encodeURIComponent(window.btoa('["applications",1]')),
    versionNumber: '1'
  },
  '/analyst/application/[applicationId]': {
    applicationId: encodeURIComponent(window.btoa('["applications",3]'))
  }
};

let DEBUG;

// Uncomment this to limit tests to a single page:
// DEBUG = 'view-application';

const {AUTHENTICATED_PAGES} = Cypress.env;

function testRedirectsForScopedPages(scope, pages) {
  pages.forEach((page) => {
    if (DEBUG && DEBUG !== page) return;

    it(`should land the ${scope} on the ${page} page after redirecting through login`, () => {
      let url = path.join('/', scope, page);

      if (url in QUERY_PARAMS) {
        for (const [param, value] of Object.entries(QUERY_PARAMS[url])) {
          url = url.replace(`[${param}]`, value);
        }
      }

      cy.visit(url);
      cy.url().should('include', '/login-redirect');
      cy.url().should('include', `?redirectTo=${encodeURIComponent(url)}`);

      cy.mockLogin(scope);

      // As the SSO login page won't open in a frame in Cypress, the final redirect must be
      // tested indirectly as though we're following the auth callback:
      cy.visit(`/login?redirectTo=${encodeURIComponent(url)}`);
      cy.url().should('include', url);
    });
  });
}

describe('Successful redirection of authenticated pages through login', () => {
  before(() => {
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture('fixtures/login-redirects-setup');
  });

  Object.keys(AUTHENTICATED_PAGES).forEach((scope) =>
    testRedirectsForScopedPages(scope, AUTHENTICATED_PAGES[scope])
  );
});

describe('When failing the keycloak authorization', () => {
  it('should redirect to the 403 page', () => {
    // Any request with the auth_callback=1 query param will be routed through the keycloak middleware
    cy.visit('/login?auth_callback=1');
    cy.url().should('include', '/403');
  });
});
