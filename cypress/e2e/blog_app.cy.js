describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'Test user',
      username: 'testuser',
      password: 'testpass',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('');
  });

  it('login form is shown correctly', function () {
    cy.contains('Log in to application');
    cy.contains('Username:');
    cy.contains('Password:');
    cy.contains('Login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser');
      cy.get('#password').type('testpass');
      cy.get('#login-button').click();

      cy.contains('Test user logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrongusername');
      cy.get('#password').type('testpass');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'Failed to log in!')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border', '2px solid rgb(255, 0, 0)');

      cy.get('html').should('not.contain', 'Test user logged in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'testpass' });
    });

    it('Blog can be created', function () {
      cy.contains('Create blog').click();
      cy.get('#title-input').type('Test blog created by cypress');
      cy.get('#author-input').type('Cypress author');
      cy.get('#url-input').type('Some random cypress url');
      cy.get('#create-button').click();
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'random test title',
          author: 'Cypress',
          url: 'randomtesturli',
        });
      });

      it('Blog can be liked', function () {
        //...
      });
    });
  });
});
