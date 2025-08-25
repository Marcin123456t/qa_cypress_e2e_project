/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let anotherUser;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateUser').then((generateUser) => {
      anotherUser = generateUser;
    });
  });

  beforeEach(() => {
    cy.visit('/#/login');
    cy.register(user.email, user.username, user.password);
    cy.getByDataCy('email-sign-in').type(user.email);
    cy.getByDataCy('password-sign-in').type(user.password);
    cy.getByDataCy('sign-in-btn').click();
    cy.getByDataCy('username-link').should('contain', user.username);
  });

  it('should be able to follow the another user', () => {
    userPage.visit(anotherUser.username);

    userPage.follow();
    userPage.assertFollowed();

    userPage.unfollow();
    userPage.assertUnfollowed();
  });
});
