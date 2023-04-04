// excluded rules on modal containing tests:
// landmark-one-main & page-has-heading-one are because of react-bootstrap modal implementation.
// color-contrast seems to only happen when using the cypress browser, but is fine when I check using the chrome plugin.
const modalExcludeRules = {
  rules: {
    "color-contrast": { enabled: false },
    "landmark-one-main": { enabled: false },
    "page-has-heading-one": { enabled: false },
  },
};

describe("When logged in as an analyst", () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture("fixtures/analyst-all-access-setup");
    cy.mockLogin("analyst");
  });

  it("The analyst dashboard has no detectable ally violations on load", () => {
    cy.visit("/analyst");
    cy.url().should("include", "/analyst");
    cy.injectAxe();
    cy.get("#page-content");
    cy.checkA11y();
  });

  it("The organisation requests page has no detectable ally violations on load", () => {
    cy.visit("/analyst/organisation-requests");
    cy.url().should("include", "/analyst/organisation-requests");
    cy.injectAxe();
    cy.get("#page-content");
    cy.checkA11y();
  });

  it("The application list page has no detectable ally violations on load", () => {
    cy.visit("/analyst/applications");
    cy.url().should("include", "/analyst/applications");
    cy.injectAxe();
    cy.get("#page-content");
    cy.checkA11y();
  });

  it("The application review page has no detectable ally violations on load", () => {
    cy.visit("/analyst/applications");
    cy.contains("View Application").click();
    cy.url().should("include", "/analyst/application/");
    cy.injectAxe();
    cy.get("#page-content");
    cy.get("body").happoScreenshot({
      component: "Application Review",
      variant: "no review selected",
    });
    cy.get(".review-step-option:first-of-type").click();
    cy.get("body").happoScreenshot({
      component: "Application Review",
      variant: "showing review in sidebar",
    });
    cy.checkA11y();
  });

  it("The add organisation page has no detectable ally violations on load", () => {
    cy.visit("/analyst/add-organisation");
    cy.url().should("include", "/analyst/add-organisation");
    cy.injectAxe();
    cy.get("#page-content");
    cy.checkA11y();
  });

  it("The add organisation modal has no detectable ally violations on open", () => {
    cy.visit("/analyst/add-organisation");
    cy.url().should("include", "/analyst/add-organisation");
    cy.get(".btn-outline-primary").click();
    cy.injectAxe();
    cy.get("#page-content");
    cy.checkA11y(null, modalExcludeRules);
  });

  it("The add facility page has no detectable ally violations on load", () => {
    cy.visit("/analyst/add-facility");
    cy.url().should("include", "/analyst/add-facility");
    cy.injectAxe();
    cy.get("#page-content");
    cy.checkA11y();
  });

  it("The add facility modal has no detectable ally violations on open", () => {
    cy.visit("/analyst/add-facility");
    cy.url().should("include", "/analyst/add-facility");
    cy.get(".card-body > .btn").click();
    cy.injectAxe();
    cy.get("#page-content");
    cy.checkA11y(null, modalExcludeRules);
  });

  it.only("The manage bceid users page has no detectable ally violations on load", () => {
    cy.visit("/analyst/manage-bceid-users");
    cy.url().should("include", "/analyst/manage-bceid-users");
    cy.injectAxe();
    cy.get("#page-content");
    cy.checkA11y();
  });
});
