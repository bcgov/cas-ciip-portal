describe("When an reporter wants to resubmit an older application", () => {
  const applicationSummaryURL = `/reporter/application/${window.btoa(
    '["applications",1]'
  )}?formId=&confirmationPage=true`;
  beforeEach(() => {
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture("fixtures/user-can-resubmit-older-applications-setup");
    cy.mockLogin("reporter");
  });

  it("The application should be able to be resubmitted as long as a version 1 was previously submitted", () => {
    cy.visit(`/reporter/facilities`);
    cy.get("#page-content");
    cy.get("#reportingYear").select("2019");
    cy.get(":nth-child(8) > .btn").first().click(); // view application
    cy.url().should("include", "/reporter/application");
    cy.get(".fade > .btn").click();
    cy.url().should("include", "disclaimer");
    cy.contains("continue").click();
    cy.visit(applicationSummaryURL);
    cy.url().should("include", "/reporter/application");
    cy.get(".override-accordion > .btn").click();
    cy.get("#overrideJustification").clear().type("override");
    cy.get(".btn-success").click();
    cy.contains("Submit").click();
    cy.url().should("include", "/reporter/complete-submit");
  });
});
