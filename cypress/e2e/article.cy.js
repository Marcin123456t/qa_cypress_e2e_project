/// <reference types='cypress' />
/// <reference types='../support' />

describe('Articles page', () => {
  let user;

  before(() => {
    cy.task('db:clear');

    const timestamp = Date.now();
    user = {
      email: `test${timestamp}@mail.com`,
      username: `Chandler${timestamp}`,
      password: '12345Qwert!'
    };

    cy.request('POST', '/users', {
      email: user.email,
      username: user.username,
      password: user.password
    }).then((resp) => {
      expect(resp.status).to.eq(200);
    });
  });

  beforeEach(() => {
    cy.visit('/#/login');

    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.get('button').contains('Sign in').click();

    cy.get('a.nav-link').contains(user.username).should('exist');
  });

  it('should create a new article', () => {
    cy.visit('/#/editor');

    cy.get('input[placeholder="Article Title"]').type('Test Article');
    cy.get('input[placeholder="What\'s this article about?"]')
      .type('Test description');
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type('Test body content');
    cy.get('input[placeholder="Enter tags"]').type('test');
    cy.get('button').contains('Publish Article').click();

    cy.contains('Test Article').should('exist');
    cy.contains('Test body content').should('exist');
  });

  it('should edit an article', () => {
    cy.contains('Test Article').click();
    cy.contains('Edit Article').click();

    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .clear();
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type('Updated body content');

    cy.get('button').contains('Publish Article').click();

    cy.contains('Updated body content').should('exist');
  });

  it('should delete an article', () => {
    cy.contains('Test Article').click();
    cy.get('button').contains('Delete Article').click();

    cy.contains('Test Article').should('not.exist');
  });
});
