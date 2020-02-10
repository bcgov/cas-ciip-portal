describe('When reviewing a submitted application as an analyst', () => {
  beforeEach(() => {
    cy.login(
      Cypress.env('TEST_ANALYST_USERNAME'),
      Cypress.env('TEST_ANALYST_PASSWORD')
    );
    cy.visit(
      '/analyst/application-review?applicationId=WyJhcHBsaWNhdGlvbnMiLDFd&revisionId=WyJhcHBsaWNhdGlvbl9yZXZpc2lvbnMiLDEsMl0%3D&version=2'
    );
  });

  afterEach(() => cy.logout());

  it('The summary page properly displays the diffs when showDiff is selected', () => {
    // Before showDiff checkbox is checked (showDiff = false)
    cy.get('#page-content');
    cy.contains('Changed');
    cy.contains('Test operator').should('not.exist');
    // After showDiff checkbox is checked (showDiff = true)
    cy.get('.form-check-input').click();
    cy.get('#dropdown-old').contains('Version 1');
    cy.get('#dropdown-new').contains('current');
    cy.get('.admin')
      .get('#root_operator_name-diffFrom')
      .contains('Test operator');
    cy.get('.admin')
      .get('#root_operator_name-diffTo')
      .contains('Changed');
    cy.get('.emission')
      .get('.diffFrom')
      .contains('96');
    cy.get('.emission')
      .get('.diffTo')
      .contains('6');
    cy.get('.fuel')
      .get('.diffFrom')
      .contains('400');
    cy.get('.fuel')
      .get('.diffTo')
      .contains('40,120');
    cy.get('.electricity-and-heat')
      .get('.diffFrom')
      .contains('57');
    cy.get('.electricity-and-heat')
      .get('.diffTo')
      .contains('7');
    cy.get('.electricity-and-heat')
      .get('.diffFrom')
      .contains('81');
    cy.get('.electricity-and-heat')
      .get('.diffTo')
      .contains('[No Data Entered]');
    cy.get('.production')
      .get('.diffFrom')
      .contains('59');
    cy.get('.production')
      .get('.diffTo')
      .contains('5');
    cy.get('.production')
      .get('.diffFrom')
      .contains('8,760');
    cy.get('.production')
      .get('.diffTo')
      .contains('80');
    // Diff-From dropdown changed to version: swrs import
    cy.get('#dropdown-old').click();
    cy.get('.dropdown-item').click();
    cy.get('#dropdown-old').contains('swrs import');
    cy.get('.admin')
      .get('.diffFrom > i')
      .contains('[No Data Entered]');
    cy.get('.admin')
      .get('.diffTo')
      .contains('Changed');
    cy.get('.emission')
      .get('.diffFrom > i')
      .contains('[No Data Entered]');
    cy.get('.emission')
      .get('.diffTo')
      .contains('6');
    cy.get('.fuel')
      .get('.diffFrom > i')
      .contains('[No Data Entered]');
    cy.get('.fuel')
      .get('.diffTo')
      .contains('10');
    cy.get('.electricity-and-heat')
      .get('.diffFrom > i')
      .contains('[No Data Entered]');
    cy.get('.electricity-and-heat')
      .get('.diffTo')
      .contains('22');
    cy.get('.electricity-and-heat')
      .get('.diffFrom > i')
      .contains('[No Data Entered]');
    cy.get('.electricity-and-heat')
      .get('.diffTo')
      .contains('29');
    cy.get('.production')
      .get('.diffFrom > i')
      .contains('[No Data Entered]');
    cy.get('.production')
      .get('.diffTo')
      .contains('5');
    cy.get('.production')
      .get('.diffFrom > i')
      .contains('[No Data Entered]');
    cy.get('.production')
      .get('.diffTo')
      .contains('800');
    // Take snapshot
    cy.percySnapshot();
  });
});
