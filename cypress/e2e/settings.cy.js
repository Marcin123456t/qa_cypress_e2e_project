/// <reference types="cypress" />
/// <reference types="../support" />

const faker = require('faker');

describe('Settings page', () => {
  let user;
  let newData;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    newData = {
      username: faker.internet.userName(),
      bio: faker.lorem.sentence(),
      email: faker.internet.email(),
      password: 'NewPass123!'
    };
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/#/login');

    cy.register(user.email, user.username, user.password);

    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.get('button').contains('Sign in').click();

    cy.get('a.nav-link').contains(user.username, { timeout: 10000 })
      .should('be.visible');

    cy.visit('/#/settings');
    cy.get('form', { timeout: 10000 }).should('be.visible');
  });

  it('should provide an ability to update username', () => {
    cy.get('input[placeholder="Username"]', { timeout: 10000 })
      .should('be.visible');
    cy.get('input[placeholder="Username"]').clear();
    cy.get('input[placeholder="Username"]').type(newData.username);
    cy.get('button').contains('Update Settings').click();
    cy.get('a.nav-link').contains(newData.username, { timeout: 10000 })
      .should('exist');
  });

  it('should provide an ability to update bio', () => {
    cy.get('textarea[placeholder="Short bio about you"]', { timeout: 10000 })
      .should('be.visible');
    cy.get('textarea[placeholder="Short bio about you"]').clear();
    cy.get('textarea[placeholder="Short bio about you"]').type(newData.bio);
    cy.get('button').contains('Update Settings').click();
    cy.get('textarea[placeholder="Short bio about you"]')
      .should('have.value', newData.bio);
  });

  it('should provide an ability to update email', () => {
    cy.get('input[placeholder="Email"]', { timeout: 10000 })
      .should('be.visible');
    cy.get('input[placeholder="Email"]').clear();
    cy.get('input[placeholder="Email"]').type(newData.email);
    cy.get('button').contains('Update Settings').click();
    cy.get('input[placeholder="Email"]').should('have.value', newData.email);
  });

  it('should provide an ability to update password', () => {
    cy.get('input[placeholder="New Password"]', { timeout: 10000 })
      .should('be.visible');
    cy.get('input[placeholder="New Password"]').clear();
    cy.get('input[placeholder="New Password"]').type(newData.password);
    cy.get('button').contains('Update Settings').click();

    cy.get('button').contains('Or click here to logout.', { timeout: 10000 })
      .click();
    cy.visit('/#/login');

    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(newData.password);
    cy.get('button').contains('Sign in').click();
    cy.get('a.nav-link').contains(newData.username, { timeout: 10000 })
      .should('exist');
  });

  it('should provide an ability to log out', () => {
    cy.get('button').contains('Or click here to logout.', { timeout: 10000 })
      .should('be.visible').click();
    cy.url().should('include', '/#/login');
  });
});
