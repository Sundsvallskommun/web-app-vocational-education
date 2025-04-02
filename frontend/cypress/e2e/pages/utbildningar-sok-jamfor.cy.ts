describe('Page > Utbildningar > Sök :: Jämför', () => {
  beforeEach(() => {
    cy.visit('/utbildningar/sok');
  });

  it('Search results renders compare page correctly', () => {
    cy.wait('@getEducationEvents');

    cy.get('main').contains('button', 'Ladda fler').click();
    cy.get('main').contains('button', 'Ladda fler').should('not.exist');
    cy.get('main ul[aria-label="Sökresultat"] li').then((searchResults) => {
      searchResults.each((index) => {
        cy.get(`main ul[aria-label="Sökresultat"] li:nth-child(${index + 1})`)
          .contains('label', 'Jämför utbildning')
          .click();
      });

      cy.get('main').contains('a', 'Jämför utbildningar (11)').click();
      cy.url().should(
        'include',
        `/utbildningar/sok/jamfor?${Array.from({ length: searchResults.length })
          .map((_, i) => `id=${i}`)
          .join('&')}`
      );
    });
    cy.get('.HeaderBlock h1').should('contain.text', '/utbildningar/sok/jamfor');

    // Cards view
    cy.get('main [aria-label="Jämför utbildningar"] a:visible').should('have.length', 4); // desktop
    cy.get('main [aria-label="Jämför utbildningar"] a:visible')
      .eq(0)
      .find('h3')
      .should('contain.text', 'Test Course 1');

    cy.get('nav[aria-label="pagination"] ul li').contains('button', '2').click();
    cy.get('nav[aria-label="pagination"] ul li').contains('button', '2').should('have.attr', 'aria-current', 'true');
    cy.get('main [aria-label="Jämför utbildningar"] a:visible')
      .eq(0)
      .find('h3')
      .should('contain.text', 'Test Course 5');

    cy.get('nav[aria-label="pagination"] ul li').contains('button', '3').click();
    cy.get('nav[aria-label="pagination"] ul li').contains('button', '3').should('have.attr', 'aria-current', 'true');
    cy.get('main [aria-label="Jämför utbildningar"] a:visible')
      .eq(0)
      .find('h3')
      .should('contain.text', 'Test Course 8');
    cy.get('main [aria-label="Jämför utbildningar"] a:visible')
      .eq(3)
      .find('h3')
      .should('contain.text', 'Test Course 11');

    // Table view
    cy.get('main').contains('button', 'Lista').click();
    cy.get('main').contains('button', 'Lista').should('have.attr', 'aria-disabled', 'true');
    cy.get('table tbody tr').should('have.length', 10);
    cy.get('table tbody tr:nth-child(1) td:nth-child(1) input[type="checkbox"]').should('exist');

    // Utbildning
    cy.get('table tbody tr:nth-child(1) td:nth-child(2) a').should('contain.text', 'Test Course 1');
    cy.get('table tbody tr:nth-child(1) td:nth-child(2) a').should(
      'have.attr',
      'href',
      '/utbildningar/0-Test%20Course%201'
    );
    cy.get('table tbody tr:nth-child(1) td:nth-child(2)').should('contain.text', 'AUB');

    // Platser / Antagna
    cy.get('table tbody tr:nth-child(1) td:nth-child(3)').should('contain.text', 'Saknas');

    // Distans / Ort
    cy.get('table tbody tr:nth-child(1) td:nth-child(4)').should('contain.text', 'Saknas');
    cy.get('table tbody tr:nth-child(1) td:nth-child(4)').should('contain.text', 'Härnösand');

    // Start / Slut
    cy.get('table tbody tr:nth-child(1) td:nth-child(5)').should('contain.text', '2025-02-17');
    cy.get('table tbody tr:nth-child(1) td:nth-child(5)').should('contain.text', '2025-04-20');

    // Studietakt
    cy.get('table tbody tr:nth-child(1) td:nth-child(6)').should('contain.text', '25%');

    // Utbildningsform
    cy.get('table tbody tr:nth-child(1) td:nth-child(7)').should('contain.text', 'AUB');

    // Sista ansökningsdatum
    cy.get('table tbody tr:nth-child(1) td:nth-child(8)').should('contain.text', '2024-10-15');

    cy.get('nav[aria-label="pagination"] ul li').contains('button', '2').click();
    cy.get('nav[aria-label="pagination"] ul li').contains('button', '2').should('have.attr', 'aria-current', 'true');
    cy.get('table tbody tr:nth-child(1) td:nth-child(2) a').should('contain.text', 'Test Course 11');
  });
});
