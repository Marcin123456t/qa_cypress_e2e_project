import SignUpPageObject from '../support/pages/signUp.pageObject';
import { faker } from '@faker-js/faker';

describe('Sign Up page', () => {
  const signUpPage = new SignUpPageObject();
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

    signUpPage.assertErrorContains('email is invalid');
    signUpPage.assertErrorContains('password is too short');
  });
});
