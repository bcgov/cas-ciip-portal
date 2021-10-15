describe("When reviewing a submitted application as an analyst", () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture("fixtures/analyst-diffing-setup");
    cy.mockLogin("analyst");
    cy.visit("/analyst/application/WyJhcHBsaWNhdGlvbnMiLDFd");
  });

  it("The summary page properly displays the diffs when showDiff is selected", () => {
    // Before showDiff checkbox is checked (showDiff = false)
    cy.get("#page-content");
    cy.contains("Changed_5");
    cy.contains("Changed_0").should("not.exist");
    // After showDiff checkbox is checked (showDiff = true)
    cy.get(".form-check-input").click();
    cy.get("#dropdown-old").contains("Version 1");
    cy.get("#dropdown-new").contains("current");
    cy.get(".admin-2020")
      .get("#administrative-data_operator_name-diffFrom")
      .contains("Changed_0");
    cy.get(".admin-2020")
      .get("#administrative-data_operator_name-diffTo")
      .contains("Changed_5");
    cy.get(".emission").get(".diffFrom").contains("6");
    cy.get(".emission").get(".diffTo").contains("11");
    cy.get(".fuel").get(".diffFrom").contains("40,120");
    cy.get(".fuel").get(".diffTo").contains("40,125");
    cy.get(".production").get(".diffFrom").contains("87,600");
    cy.get(".production").get(".diffTo").contains("87,605");
    // Diff-From dropdown changed to version: swrs import
    cy.get("#dropdown-old").click();
    cy.get(".dropdown-item").click();
    cy.get("#dropdown-old").contains("swrs import");
    cy.get(".admin-2020").get(".diffFrom > i").contains("[No Data Entered]");
    cy.get(".admin-2020").get(".diffTo").contains("Changed");
    cy.get(".emission").get(".diffFrom > i").contains("[No Data Entered]");
    cy.get(".emission").get(".diffTo").contains("11");
    cy.get(".fuel").get(".diffFrom > i").contains("[No Data Entered]");
    cy.get(".fuel").get(".diffTo").contains("40,125");
    cy.get(".production").get(".diffFrom > i").contains("[No Data Entered]");
    cy.get(".production").get(".diffTo").contains("87,605");
  });
});
