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
          title: 'first random',
          author: 'Cypress',
          url: 'randomtesturli'
        });

        cy.createBlog({
          title: 'second random',
          author: 'Cypress again',
          url: 'randomurlagain'
        });

        cy.createBlog({
          title: 'third random',
          author: 'still cypress',
          url: 'randomurliapukkaa'
        });
      });


      it('Blog can be liked', function () {
        const blogTitle = 'second random';

        cy.contains(blogTitle).contains('View').click();

        cy.contains(blogTitle)
          .parent()
          .within(() => {
            cy.contains('Likes: 0');
            cy.contains('like').click();
            cy.contains('Likes: 1');
          });
      });

      it('Blog can be removed by user who added it', function () {
        const blogTitle = 'second random';

        cy.contains(blogTitle).contains('View').click();
        cy.contains(blogTitle).parent().contains('Remove').click();
        cy.wait(1000);
        cy.contains(blogTitle).should('not.exist');
      });

      it('Remove button is visible only for the user who added the blog', function () {
        cy.contains('Logout').click();

        const secondUser = {
          name: 'second user',
          username: 'seconduser',
          password: 'secondpass',
        };

        cy.request('POST', `${Cypress.env('BACKEND')}/users`, secondUser);

        cy.login({ username: 'seconduser', password: 'secondpass' });

        const blogTitle = 'second random';

        cy.contains(blogTitle).contains('View').click();
        cy.contains(blogTitle).parent().contains('Remove').should('not.exist');
      });

      it.only('Blogs ordered correctly by likes', function () {
        const firstBlog = 'first random';
        const secondBlog = 'second random';
        const thirdBlog = 'third random';

        cy.contains(firstBlog).contains('View').click();
        cy.contains(secondBlog).contains('View').click();
        cy.contains(thirdBlog).contains('View').click();
        
        cy.contains(thirdBlog).parent().contains('like').click();
        cy.contains(thirdBlog).parent().find('.blog__likes').should('include.text', 1);

        cy.contains(secondBlog).parent().contains('like').click();
        cy.contains(secondBlog).parent().find('.blog__likes').should('include.text', 1);
        
        cy.contains(secondBlog).parent().contains('like').click();
        cy.contains(secondBlog).parent().find('.blog__likes').should('include.text', 2);

        // check that blogs are in the correct order:
        cy.get('.blog__all-details').eq(0).should('contain', secondBlog); // since it has 2 likes
        cy.get('.blog__all-details').eq(1).should('contain', thirdBlog); // since it has 1 like
        cy.get('.blog__all-details').eq(2).should('contain', firstBlog); // since it has 0 likes
      });
    });
  });
});
