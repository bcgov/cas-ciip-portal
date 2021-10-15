describe("Has a control that allows changing the date time", () => {
  beforeEach(() => {
    cy.cleanSchema();
  });

  it("contains the mocked database field", () => {
    cy.visit("/");
    cy.get("footer").get("#mock-database-date-picker");
  });
});
