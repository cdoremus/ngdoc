describe('Articles using fixtures', () => {
  it('stubbed data can be referenced inline', () => {
    cy.server();
    cy.route('api/articles/recent', 'fixture:articles').as('recent');
    cy.visit('/');
    cy.wait('@recent');
    cy.get('app-article').should('have.length', 3);
  });

  describe('stubbed tests using fixture keyword and alias', () => {
    beforeEach(() => {
      cy.server();
      cy.fixture('articles.json').as('articlesJSON');
      cy.route('api/articles/recent', '@articlesJSON').as('recent');
      cy.visit('/');
      cy.wait('@recent');
      cy.get('app-article').should('have.length', 3);
    });

    it('testing fixtures', () => {
      cy.route('POST', '/api/articles/search', '@articlesJSON').as('articles');

      cy.get('input#keyword').type('NgRx{enter}');

      cy.wait('@articles');
      cy.get('app-article').should('have.length', 3);
    });
  });

    // USER CREATED TEST FOR TAGS
    // USE THE TAGS FIXTURE FILE TO STUB THE /api/tags call
    // WAIT FOR THE TAGS TO RETURN AND ASSERT THE COUNT
    // BONUS: Run tests using npx cypress run
    // BONUS: Figure out how to capture screenshots manually'
  // write test here
  describe('should filter tags', () => {
    beforeEach(() => {
      cy.server();
      cy.fixture('tags.json').as('tagsJSON');
      cy.route('api/tags', '@tagsJSON').as('recent-tags');
      cy.visit('/');
      cy.wait('@recent-tags');
    });
    it('should have 4 tags with NgRx search', () => {
      // use tagsJSON fixture
      cy.route('GET', '/api/tags', '@tagsJSON');
      // Enter 'NgRx' in the search box
      cy.get('input#keyword').type('NgRx{enter}');
      cy.get('div.tags').should('have.length', 4);
    });
  });
});
