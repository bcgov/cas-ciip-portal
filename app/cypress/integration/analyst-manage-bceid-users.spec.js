describe("When the analyst is managing bceid user access", () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture("fixtures/analyst-all-access-setup");
    cy.mockLogin("analyst");
  });

  it("The analyst should be able allow login with a new bceid", () => {
    cy.visit("/analyst/manage-bceid-users");
    cy.url().should("include", "/analyst/manage-bceid-users");

    cy.get(":nth-child(4) > :nth-child(5) > .btn").click();
    cy.get("#page-content");
    cy.get(":nth-child(4) > :nth-child(5) > .btn").should("contain", "Disable");
  });

  it("The analyst should be able to view the access requests for a user", () => {
    cy.visit("/analyst/manage-bceid-users");
    cy.url().should("include", "/analyst/manage-bceid-users");

    cy.get(":nth-child(1) > :nth-child(4) > .alert-link").click();
    cy.get("#page-content");
    cy.url().should("include", "/analyst/manage-bceid-users");
  });
});
