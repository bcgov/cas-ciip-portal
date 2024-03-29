describe("The production tab", () => {
  before(() => {
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture("fixtures/application-production-setup");
  });

  beforeEach(() => {
    cy.sqlFixture("fixtures/production-draft-form-result-setup");
    cy.mockLogin("reporter");
    const applicationId = window.btoa('["applications",1]');
    const formId = window.btoa('["form_jsons",4]');
    cy.visit(`/reporter/application/${applicationId}?formId=${formId}`);
  });

  it("Should render the aluminum product", () => {
    cy.get("#root_0_productRowId").clear().type("Aluminum");
    cy.get(".dropdown-item").click();
    cy.get("input:visible[type=text]").should("have.length", 4);
    cy.get("#root_0_productUnits").invoke("val").should("contain", "tonnes");
    cy.get("#root_0_productAmount");
    cy.get("#root_0_productEmissions");
  });

  it("Should not show amount, units or emissions when requiresProductAmount and requiresEmissionAllocation are false", () => {
    cy.get("#root_0_productRowId").clear().type("non ciip");
    cy.get(".dropdown-item").click();
    cy.get("input:visible[type=text]").should("have.length", 1);
    cy.get("#root_0_productUnits").should("not.exist");
    cy.get("#root_0_productAmount").should("not.exist");
    cy.get("#root_0_productEmissions").should("not.exist");
  });
});
