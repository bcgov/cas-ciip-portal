const DASHBOARD_URLS = {
  admin: '/admin',
  analyst: '/analyst',
  reporter: '/reporter'
};

const REQUIRED_QUERY_PARAMS = {
  facilities: '?organisationRowId=200',
  application: `?applicationId=${encodeURIComponent(
    window.btoa('["applications", 101]')
  )}&version=1&formResultId=${encodeURIComponent(
    window.btoa('["form_results", 201]')
  )}`,
  'view-application': `?applicationId=${encodeURIComponent(
    window.btoa('["applications", 101]')
  )}&version=1`,
  'new-application-disclaimer': `?applicationId=${encodeURIComponent(
    window.btoa('["applications", 101]')
  )}&version=1`,
  certify: `?applicationId=${encodeURIComponent(
    window.btoa('["applications", 102]')
  )}&version=1`,
  'certification-redirect': `?rowId=${encodeURIComponent(
    'sss999'
  )}&id=${encodeURIComponent(window.btoa('["applications", 102]'))}`,
  'application-review': `?applicationId=${encodeURIComponent(
    window.btoa('["applications", 103]')
  )}&applicationRevisionId=${encodeURIComponent(
    window.btoa('["application_revisions", 103, 1]')
  )}&version=1`
};
// NOTE: Of the pages with required query params, only the fixtures for the facilities and new-application-disclaimer pages currently work, hence the others are skipped:
// Notably, the fixtures do work when running them manually and then manually visiting the page in the browser... while in the test environment there are syntax errors.
const SKIP = new Set(
  Object.keys(REQUIRED_QUERY_PARAMS).filter(
    (page) => page !== 'facilities' && page !== 'new-application-disclaimer'
  )
);
let DEBUG;

// Uncomment this to limit tests to a single page:
// DEBUG = 'application';

const {AUTHENTICATED_PAGES} = Cypress.env;

function testRedirectsForScopedPages(scope, pages) {
  pages.forEach((page) => {
    if (DEBUG ? DEBUG !== page : SKIP.has(page)) return;

    it(`should land the ${scope} on the ${page} page after redirecting through login`, () => {
      let url = `/${scope}/${page}${
        page in REQUIRED_QUERY_PARAMS ? REQUIRED_QUERY_PARAMS[page] : ''
      }`;
      if (page === 'index') url = `/${scope}`;

      cy.visit(url);
      cy.url().should('include', '/login-redirect');
      cy.url().should('include', `?redirectTo=${encodeURIComponent(url)}`);

      cy.login(
        Cypress.env[`TEST_${scope.toUpperCase()}_USERNAME`],
        Cypress.env[`TEST_${scope.toUpperCase()}_PASSWORD`]
      );

      // As the SSO login page won't open in a frame in Cypress, the final redirect must be
      // tested indirectly as though we're following the auth callback:
      cy.visit(`/login?redirectTo=${encodeURIComponent(url)}`);
      cy.url().should('include', url);
    });
  });
}

describe('Successful redirection of authenticated pages through login', () => {
  beforeEach(() => {
    cy.logout();
    cy.sqlFixture('fixtures/login-redirects-setup');
  });
  afterEach(() => {
    cy.logout();
    cy.sqlFixture('fixtures/login-redirects-teardown');
  });

  Object.keys(AUTHENTICATED_PAGES).forEach((scope) =>
    testRedirectsForScopedPages(scope, AUTHENTICATED_PAGES[scope])
  );
});
