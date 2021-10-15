/*
  This set of e2e tests test the real login function,
  and doesn't mock the login
  There are suspected side-effects causing subsequent tests to encounter flaky failures,
  so this test suite should be run last (hence the file name starting with zz)
*/

describe("When logged in as a reporter", () => {
  before(() => {
    cy.cleanSchema();
    cy.sqlFixture("dev/user");
    cy.login(
      Cypress.env("TEST_REPORTER_USERNAME"),
      Cypress.env("TEST_REPORTER_PASSWORD")
    );
  });

  after(() => cy.logout());

  it("The index page redirects to the reporter dashboard", () => {
    cy.visit("/");
    cy.get("#page-content");
    cy.url().should("include", "/reporter");
  });
});

describe("When logged in as an analyst", () => {
  before(() => {
    cy.cleanSchema();
    cy.sqlFixture("dev/user");
    cy.login(
      Cypress.env("TEST_ANALYST_USERNAME"),
      Cypress.env("TEST_ANALYST_PASSWORD")
    );
  });

  after(() => cy.logout());

  it("The index page redirects to the analyst dashboard", () => {
    cy.visit("/");
    cy.get("#page-content");
    cy.url().should("include", "/analyst");
  });
});

describe("When logged in as an admin", () => {
  before(() => {
    cy.cleanSchema();
    cy.sqlFixture("dev/user");
    cy.login(
      Cypress.env("TEST_ADMIN_USERNAME"),
      Cypress.env("TEST_ADMIN_PASSWORD")
    );
  });

  after(() => cy.logout());

  it("The index page redirects to the admin dashboard", () => {
    cy.visit("/");
    cy.get("#page-content");
    cy.url().should("include", "/admin");
  });
});
