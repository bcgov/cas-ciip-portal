describe("When reviewing an application from the 2018 reporting year", () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.sqlFixture("fixtures/ciip-2018/add-2018-data");
    cy.mockLogin("analyst");
  });

  it("The review-application page renders the 2018 ciip data", () => {
    cy.visit("/analyst/application/WyJhcHBsaWNhdGlvbnMiLDFd");
    cy.contains("Facility Description");
    cy.contains("orgBookLegalName");
    cy.contains("Application Type");
    cy.contains("gasDescription");
    cy.contains("Fuel Type alt");
    cy.contains("Product Name");
  });
});
