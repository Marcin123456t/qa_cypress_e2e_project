/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import { faker } from '@faker-js/faker';

describe('Sign Up page', () => {
  let userData;
  const signUpPage = new SignUpPageObject();

  before(() => {
    cy.task('db:clear');

    userData = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'Pass12345!'
    };
  });

  beforeEach(() => {
    signUpPage.visit();
  });

  it('should register a new user successfully', () => {
    signUpPage.typeUsername(userData.username);
    signUpPage.typeEmail(userData.email);
    signUpPage.typePassword(userData.password);
    signUpPage.clickSignUp();

    signUpPage.assertSignedUp(userData.username);
  });

  it('should show an error for invalid registration', () => {
    signUpPage.typeUsername('TestUser');
    signUpPage.typeEmail('invalid-email');
    signUpPage.typePassword('123');
    signUpPage.clickSignUp();

    signUpPage.assertErrorContains('Email must be a valid email.');
    signUpPage.assertErrorContains('password is too short');
  });
});
