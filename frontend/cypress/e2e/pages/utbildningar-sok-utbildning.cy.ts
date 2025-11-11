describe('Page > Utbildningar > Sök :: Utbildning', () => {
  beforeEach(() => {
    cy.visit('/utbildningar/sok');
  });

  it('Search results renders education page upon result-click correctly', () => {
    cy.get('main').contains('h3', 'Test Course 1').click();
    cy.url().should('include', '/utbildningar/0-Test%20Course%201');
    cy.get('.HeaderBlock h1').should('contain.text', 'Test Course 1');
  });
});
