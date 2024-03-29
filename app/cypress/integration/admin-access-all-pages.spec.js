describe("When logged in as an admin", () => {
  beforeEach(() => {
    cy.cleanSchema();
    // The admin spec uses the same setup as the analyst
    cy.sqlFixture("fixtures/analyst-all-access-setup");
    cy.mockLogin("admin");
  });

  it("The admin should be able to load all pages within their access scope", () => {
    cy.visit("/admin");
    cy.url().should("include", "/admin");
    cy.get(".card-body");
    cy.visit("/admin/users");
    cy.url().should("include", "/admin/users");
    cy.get("tr");
    cy.visit("/admin/products-benchmarks");
    cy.url().should("include", "/admin/products-benchmarks");
    cy.get("tr");
    cy.visit("/admin/reporting-years");
    cy.url().should("include", "/admin/reporting-years");
    cy.get("tr");
    cy.visit("/analyst/applications");
    cy.url().should("include", "/analyst/applications");
    cy.get("tr");
    cy.visit("/admin/naics-codes");
    cy.url().should("include", "/admin/naics-codes");
    cy.get("tr");
    cy.visit("/admin/naics-products");
    cy.url().should("include", "/admin/naics-products");
    cy.get(".card");
  });
});
