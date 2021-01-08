describe('When logged in as a reporter', () => {
  beforeEach(() => {
    cy.cleanSchema();
    cy.sqlFixture('dev/user');
    cy.mockLogin('reporter');
  });

  afterEach(() => cy.logout());

  it('The index page redirects to the reporter dashboard', () => {
    cy.visit('/');
    cy.get('#page-content');
    cy.url().should('include', '/reporter');
  });
});

describe('When logged in as an analyst', () => {
  before(() => {
    cy.mockLogin('analyst');
  });

  after(() => cy.logout());

  it('The index page redirects to the analyst dashboard', () => {
    cy.visit('/');
    cy.get('#page-content');
    cy.url().should('include', '/analyst');
  });
});

describe('When logged in as an admin', () => {
  before(() => {
    cy.mockLogin('admin');
  });

  after(() => cy.logout());

  it('The index page redirects to the admin dashboard', () => {
    cy.visit('/');
    cy.get('#page-content');
    cy.url().should('include', '/admin');
  });
});
