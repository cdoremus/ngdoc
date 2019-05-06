describe('Articles using waits', () => {
  it('should wait for tags', () => {
    cy.server();
    cy.route('/api/tags').as('tags');
    cy.visit('/');
    cy.wait('@tags');

    cy.get('.tags-container input').type('anim');
    cy.get('div.tags').should('have.length', 3);
  });

  // USER CREATED TEST FOR WAITS
  // should wait for articles to load then assert count
  // BIG HINT: route: api/articles/recent
  // More subtle hint: route: api/articles/recent
  // BONUS - assert the title of the 3rd article
  // BONUS - assert anchor target for articles is _blank
  // HINT: http://example.cypress.io
  // HINT: https://docs.cypress.io/api/commands/should.html#Value
  it('recents articles should display 25 articles', () => {
    cy.server();
    cy.route('api/articles/recent').as('tags');
    cy.visit('/');
    // assert data
    cy.wait('@tags').then(xhr => {
      const body = xhr.response.body;
      assert.isNotNull(body);
      console.log(body);
      assert.equal(25, body.length);
    });
  });
});
