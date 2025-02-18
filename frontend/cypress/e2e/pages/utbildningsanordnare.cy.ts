describe('Page > Utbildningsanordnare', () => {
  beforeEach(() => {
    cy.visit('/utbildningsanordnare');
    cy.wait('@me');
  });

  it('DOM structure', () => {
    cy.get('main').should('exist');
    cy.get('h1').should('exist');
  });
});
