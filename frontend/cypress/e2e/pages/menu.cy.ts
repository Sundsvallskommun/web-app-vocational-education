describe('Menu', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Menu renders correctly', () => {
    cy.wait('@getEducationFilters');

    cy.contains('button', 'Meny').click({ force: true });

    cy.get('nav[aria-label="Huvudmeny"] ul')
      .contains('a', 'För dig som söker utbildning')
      .should('be.visible')
      .should('have.attr', 'href', '/utbildningar');
    cy.get('nav[aria-label="Huvudmeny"] ul').contains('a', 'För dig som söker utbildning').next().click();
    cy.get('nav[aria-label="Huvudmeny"] ul')
      .contains('a', 'Sök utbildning')
      .should('be.visible')
      .should('have.attr', 'href', '/utbildningar/sok');

    cy.get('nav[aria-label="Huvudmeny"] ul')
      .contains('a', 'För arbetsgivare')
      .should('be.visible')
      .should('have.attr', 'href', '/arbetsgivare');
      {/* https://jira.sundsvall.se/browse/DRAKEN-2296 */}
    // cy.get('nav[aria-label="Huvudmeny"] ul')
    //   .contains('a', 'För utbildningsanordnare')
    //   .should('be.visible')
    //   .should('have.attr', 'href', '/utbildningsanordnare');
    cy.get('nav[aria-label="Huvudmeny"] ul')
      .contains('a', 'Kontakta oss')
      .should('be.visible')
      .should('have.attr', 'href', '/kontakta-oss');

    // links
    cy.contains('a', 'Behandling av personuppgifter')
      .should('be.visible')
      .should('have.attr', 'href', '/personuppgifter');
    cy.contains('a', 'Tillgänglighetsredogörelse')
      .should('be.visible')
      .should('have.attr', 'href', '/tillganglighetsredogorelse');
    cy.contains('a', 'Om webbplatsen').should('be.visible').should('have.attr', 'href', '/om-webbplatsen');
    cy.contains('a', 'Cookies').should('be.visible').should('have.attr', 'href', '/kakor');
    cy.contains('a', 'Logga ut').should('be.visible').should('have.attr', 'href', '/logout');

    cy.contains('button', 'Stäng').click();

    cy.contains('nav[aria-label="Huvudmeny"] ul a', 'För dig som söker utbildning').should('not.exist');
  });

  it('Menu logout redirects to /', () => {
    cy.contains('button', 'Meny').click({ force: true });
    cy.get('nav[aria-label="Snabblänkar"] ul').contains('a', 'Logga ut').click();

    cy.contains('nav[aria-label="Huvudmeny"] ul a', 'För dig som söker utbildning').should('not.exist');
  });
});
