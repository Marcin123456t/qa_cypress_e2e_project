/// <reference types='cypress' />
/// <reference types='../support' />

const faker = require('faker');

describe('Sign Up page', () => {
  let userData;

  before(() => {
    cy.task('db:clear');

    userData = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'Pass12345!'
    };
  });

  beforeEach(() => {
    cy.visit('/#/register');
  });

  it('should register a new user successfully', () => {
    cy.get('input[placeholder="Username"]').type(userData.username);
    cy.get('input[placeholder="Email"]').type(userData.email);
    cy.get('input[placeholder="Password"]').type(userData.password);
    cy.get('button').contains('Sign up').click();

    cy.get('a.nav-link').should('contain', userData.username);
  });

  it('should show an error for invalid registration', () => {
    cy.get('input[placeholder="Username"]').type('TestUser');
    cy.get('input[placeholder="Email"]').type('invalid-email');
    cy.get('input[placeholder="Password"]').type('123');
    cy.get('button').contains('Sign up').click();

    cy.get('ul.error-messages', { timeout: 10000 }).should('exist');

    cy.get('ul.error-messages li ul li', { timeout: 10000 })
      .should('contain.text', 'This email does not seem valid.');

    cy.get('ul.error-messages li ul li')
      .should('contain.text', 'password is too short');
  });
});
