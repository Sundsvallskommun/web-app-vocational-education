describe('API Service', () => {
  it('should redirect to / for protected routes on request fail', () => {
    cy.intercept('GET', '**/me', {
      statusCode: 401,
      body: { message: 'Unauthorized' },
    }).as('getMeFail');
    cy.visit('/utbildningsanordnare'); // protected route
    cy.get('h1:visible').should('contain.text', '/login');
    cy.url().should('contain', '/login');
  });
});
