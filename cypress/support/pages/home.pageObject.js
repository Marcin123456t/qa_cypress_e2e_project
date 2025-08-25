import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.get('a.nav-link').contains(this.username);
  }

  assertHeaderContainUsername(username) {
    cy.contains('a.nav-link', username).should('exist');
  }
}

export default HomePageObject;
