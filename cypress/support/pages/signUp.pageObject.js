import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.get('input[placeholder="Username"]');
  }

  get emailField() {
    return cy.get('input[placeholder="Email"]');
  }

  get passwordField() {
    return cy.get('input[placeholder="Password"]');
  }

  get signUpBtn() {
    return cy.get('button').contains('Sign up');
  }

  get errorMessages() {
    return cy.get('ul.error-messages');
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignUp() {
    this.signUpBtn.click();
  }

  assertSignedUp(username) {
    cy.contains('a.nav-link', username).should('exist');
  }

  assertErrorContains(text) {
    this.errorMessages.should('contain.text', text);
  }
}

export default SignUpPageObject;
