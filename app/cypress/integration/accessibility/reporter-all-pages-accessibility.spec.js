describe('When logged in as a reporter', () => {
  before(() => {
    cy.cleanSchema();
    cy.deployProdData();
    cy.sqlFixture('fixtures/reporter-all-access-setup');
  });

  beforeEach(() => {
    cy.mockLogin('reporter');
  });

  it('The reporter dashboard has no detectable ally violations on load', () => {
    cy.visit('/reporter');
    cy.url().should('include', '/reporter');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The facilities list page has no detectable ally violations on load', () => {
    cy.visit('/reporter/facilities');
    cy.url().should('include', '/reporter/facilities');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The new application disclaimer page has no detectable ally violations on load', () => {
    cy.visit('/reporter/facilities');
    cy.contains('Resume').click();
    cy.url().should('include', '/reporter/new-application-disclaimer');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The application admin tab has no detectable ally violations on load', () => {
    cy.sqlFixture('fixtures/set-legal-disclaimer-true');
    const applicationId = window.btoa('["applications", 2]');
    const formResultId = window.btoa('["form_results",5]');
    cy.visit(
      `/reporter/application?applicationId=${applicationId}&&version=1&formResultId=${formResultId}`
    );
    cy.get('#page-content');
    cy.contains('Administration');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The application emissions tab has no detectable ally violations on load', () => {
    cy.sqlFixture('fixtures/set-legal-disclaimer-true');
    const applicationId = window.btoa('["applications", 2]');
    const formResultId = window.btoa('["form_results",6]');
    cy.visit(
      `/reporter/application?applicationId=${applicationId}&&version=1&formResultId=${formResultId}`
    );
    cy.get('#page-content');
    cy.contains('Emission');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The application fuel tab has no detectable ally violations on load', () => {
    cy.sqlFixture('fixtures/set-legal-disclaimer-true');
    const applicationId = window.btoa('["applications", 2]');
    const formResultId = window.btoa('["form_results",7]');
    cy.visit(
      `/reporter/application?applicationId=${applicationId}&&version=1&formResultId=${formResultId}`
    );
    cy.get('#page-content');
    cy.contains('Fuel');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The application production tab has no detectable ally violations on load', () => {
    cy.sqlFixture('fixtures/set-legal-disclaimer-true');
    const applicationId = window.btoa('["applications", 2]');
    const formResultId = window.btoa('["form_results",8]');
    cy.visit(
      `/reporter/application?applicationId=${applicationId}&&version=1&formResultId=${formResultId}`
    );
    cy.get('#page-content');
    cy.contains('Production');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The application summary page has no detectable ally violations on load', () => {
    cy.sqlFixture('fixtures/set-legal-disclaimer-true');
    const applicationId = window.btoa('["applications", 2]');
    cy.visit(
      `/reporter/application?applicationId=${applicationId}&confirmationPage=true&version=1`
    );
    cy.contains('Submit Application');
    cy.get('#page-content');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The /reporter/application/[applicationId]/version/[versionNumber]/view page has no detectable ally violations on load', () => {
    const applicationId = window.btoa('["applications", 2]');
    cy.visit(`/reporter/application/${applicationId}/version/1/view`);
    cy.get('#page-content');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The /reporter/complete-submit page has no detectable ally violations on load', () => {
    cy.visit('/reporter/complete-submit');
    cy.get('#page-content');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });
});
