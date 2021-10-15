describe("When viewing an application from the 2018 reporting year", () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.sqlFixture("fixtures/ciip-2018/add-2018-data");
    cy.mockLogin("reporter");
  });

  it("The view-application page renders the 2018 ciip data", () => {
    const applicationId = btoa('["applications",1]');
    cy.visit(`/reporter/application/${applicationId}/version/1/view`);
    cy.contains("Facility Description");
    cy.contains("orgBookLegalName");
    cy.contains("Application Type");
    cy.contains("gasDescription");
    cy.contains("Fuel Type alt");
    cy.contains("Product Name");
  });
});
