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
    cy.url().should('include', '/disclaimer');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The application admin tab has no detectable ally violations on load', () => {
    cy.sqlFixture('fixtures/set-legal-disclaimer-true');
    const applicationId = window.btoa('["applications",2]');
    const formId = window.btoa('["form_jsons",5]');
    cy.visit(`/reporter/application/${applicationId}?formId=${formId}`);
    cy.get('#page-content');
    cy.contains('Administration');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y({exclude: [['.rbt-input-hint']]});
  });

  it('The application emissions tab has no detectable ally violations on load', () => {
    cy.sqlFixture('fixtures/set-legal-disclaimer-true');
    const applicationId = window.btoa('["applications",2]');
    const formId = window.btoa('["form_jsons",2]');
    cy.visit(`/reporter/application/${applicationId}?formId=${formId}`);
    cy.get('#page-content');
    cy.contains('Emission');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y();
  });

  it('The application fuel tab has no detectable ally violations on load', () => {
    cy.sqlFixture('fixtures/set-legal-disclaimer-true');
    const applicationId = window.btoa('["applications",2]');
    const formId = window.btoa('["form_jsons",3]');
    cy.visit(`/reporter/application/${applicationId}?formId=${formId}`);
    cy.get('#page-content');
    cy.contains('Fuel');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y({exclude: [['.rbt-input-hint']]});
  });

  it('The application production tab has no detectable ally violations on load', () => {
    cy.sqlFixture('fixtures/set-legal-disclaimer-true');
    const applicationId = window.btoa('["applications", 2]');
    const formId = window.btoa('["form_jsons",4]');
    cy.visit(`/reporter/application/${applicationId}?formId=${formId}`);
    cy.get('#page-content');
    cy.contains('Production');
    cy.injectAxe();
    cy.get('#page-content');
    cy.checkA11y({exclude: [['.rbt-input-hint']]});
  });

  it('The application summary page has no detectable ally violations on load', () => {
    cy.sqlFixture('fixtures/set-legal-disclaimer-true');
    const applicationId = window.btoa('["applications",2]');
    cy.visit(`/reporter/application/${applicationId}?confirmationPage=true`);
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
