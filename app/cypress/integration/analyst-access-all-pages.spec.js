describe("When logged in as an analyst", () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.sqlFixture("fixtures/analyst-all-access-setup");
    cy.mockLogin("analyst");
  });

  it("The analyst should be able to load all pages within their access scope", () => {
    cy.visit("/analyst");
    cy.url().should("include", "/analyst");
    cy.get(".card-body");
    cy.visit("/analyst/organisation-requests");
    cy.url().should("include", "/analyst/organisation-requests");
    cy.get("tr");
    cy.visit("/analyst");
    cy.contains("Submitted applications").click();
    cy.url().should("include", "/analyst/applications");
    cy.get("tr");
    cy.contains("View Application").click();
    cy.url().should("include", "/analyst/application/");
    cy.visit("/analyst");
    cy.url().should("include", "/analyst");
    cy.get(".card-link").contains("Operations").click();
    cy.url().should("include", "/analyst/add-organisation");
    cy.visit("/analyst");
    cy.url().should("include", "/analyst");
    cy.get(".card-body");
    cy.contains("Facilities").click();
    cy.url().should("include", "/analyst/add-facility");
    cy.visit("/analyst");
    cy.url().should("include", "/analyst");
    cy.get(".card-body");
    cy.get(".card-link").contains("Manage").click();
    cy.url().should("include", "/analyst/manage-bceid-users");
  });
});
