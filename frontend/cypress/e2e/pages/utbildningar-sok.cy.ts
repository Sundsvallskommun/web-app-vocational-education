import { mockApiResponse } from 'cypress/support/e2e';
import dayjs from 'dayjs';

describe('Page > Utbildningar > Sök', () => {
  beforeEach(() => {
    cy.visit('/utbildningar/sok');
  });

  it('DOM essentials renders correctly', () => {
    cy.wait('@getEducationEvents');
    cy.get('main').should('exist');
    cy.get('.HeaderBlock h1').should('exist').should('contain.text', '/utbildningar/sok');
    cy.get('.HeaderBlock p.ingress').should('exist').should('contain.text', 'Test Description');
  });

  it('Newly saved search triggers feedback correctly', () => {
    cy.get('main').contains('button', 'Spara').should('not.have.attr', 'aria-disabled');
    const data = [
      {
        id: 1,
        userId: 1,
        searchTerm: 'el',
        parameters: `latestApplicationDate=${dayjs(new Date()).format('YYYY-MM-DD')}&page=1&size=10&sortFunction=latestApplication%2Casc%3Bname%2Casc`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    cy.intercept('POST', '**/user/saved-searches', { data: true, message: 'success' }).as('postSavedSearches');
    cy.intercept('GET', '**/user/saved-searches', { data, message: 'success' }).as('getSavedSearchesAdded');
    cy.get('main').contains('button', 'Spara').click();
    cy.wait('@getSavedSearchesAdded');
    cy.get('main').contains('button', 'Spara').should('have.attr', 'aria-disabled', 'true');
    cy.get('*').contains('Sökningen sparades.');
  });

  it('Search results default tags should render correctly when removing one', () => {
    cy.wait('@getEducationEvents');
    cy.get('main')
      .contains('label', 'Filtrerat på:')
      .next()
      .find('button:nth-child(1)')
      .should('contain.text', `Sista ansökningsdatum: ${dayjs(new Date()).format('YYYY-MM-DD')}`)
      .click()
      .then((el) => {
        console.log('el', el);
        cy.wrap(el).should('not.exist');
      });
  });

  it('Search results default tags should render correctly when resetting filters', () => {
    cy.wait('@getEducationEvents');
    cy.get('form')
      .contains('button', 'Rensa alla filter')
      .click()
      .then(() => {
        cy.get('main').contains('label', 'Filtrerat på:').should('not.exist');
      });
  });

  it('Search results renders heading correctly', () => {
    cy.wait('@getEducationEvents');
    cy.get('.HeaderBlock h2').should('contain.text', '11 träffar');
  });

  it('Search results renders cards results correctly', () => {
    cy.wait('@getEducationEvents');
    // size(limit) is 10 default from fe, so 9.5 should be shown visually
    cy.get('main ul[aria-label="Sökresultat"] li').should('have.length', 10);

    cy.get('main ul[aria-label="Sökresultat"] li:nth-child(1) h3').should('contain.text', 'Test Course');
    cy.get('main ul[aria-label="Sökresultat"] li:nth-child(1) h3').next().should('contain.text', 'Test Information');
    // Facts
    cy.get('main ul[aria-label="Sökresultat"] li:nth-child(1)')
      .contains('label', 'Längd')
      .next()
      .should('contain.text', '8 veckor');
    cy.get('main ul[aria-label="Sökresultat"] li:nth-child(1)')
      .contains('label', 'Plats')
      .next()
      .should('contain.text', 'Härnösand');
    cy.get('main ul[aria-label="Sökresultat"] li:nth-child(1)')
      .contains('label', 'Start')
      .next()
      .should('contain.text', '2025-02-17');
    cy.get('main ul[aria-label="Sökresultat"] li:nth-child(1)')
      .contains('label', 'Studietakt')
      .next()
      .should('contain.text', '25%');
    cy.get('main ul[aria-label="Sökresultat"] li:nth-child(1)')
      .contains('label', 'Utbildningsform')
      .next()
      .should('contain.text', 'AUB');
    cy.get('main ul[aria-label="Sökresultat"] li:nth-child(1)')
      .contains('label', 'Distans')
      .next()
      .should('contain.text', 'Saknas');
    cy.get('main ul[aria-label="Sökresultat"] li:nth-child(1)')
      .contains('label', 'Sista ansökningsdatum')
      .next()
      .should('contain.text', '2024-10-15');

    cy.get('main ul[aria-label="Sökresultat"] li:nth-child(1)')
      .contains('label', 'Jämför utbildning')
      .should('be.visible');

    cy.get('main').contains('button', 'Ladda fler').click();
    cy.get('main').contains('button', 'Ladda fler').should('not.exist');

    cy.url().should('include', 'size=20');
    cy.wait(300); // Note: react re-render loading state
    cy.wait('@getEducationEvents', { timeout: 10000 }).its('request.url').should('include', 'filter[size]=20');

    cy.get('main ul[aria-label="Sökresultat"] li').should('have.length', 11);
  });

  it('Search results renders table results correctly', () => {
    cy.wait('@getEducationEvents');
    cy.get('main').contains('button', 'Lista').click();
    cy.get('main').contains('button', 'Lista').should('have.attr', 'aria-disabled', 'true');

    // Results renders correctly
    cy.get('table tbody tr').should('have.length', 10);

    //// Check first content of first row

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

    ////.

    // Page 2 renders correctly
    cy.get('nav[aria-label="pagination"] ul li').contains('button', '2').click();
    cy.get('nav[aria-label="pagination"] ul li').contains('button', '2').should('have.attr', 'aria-current', 'true');
    cy.get('table tbody tr').should('have.length', 1);

    cy.intercept('GET', '/utbildningar/10-Test%20Course%2011').as('goToPage');
    cy.get('table tbody tr:nth-child(1) td:nth-child(2) a').should('contain.text', 'Test Course 11').click();

    cy.get('.HeaderBlock h1').should('exist').should('contain.text', 'Test Course 11', { timeout: 10000 });
    cy.url().should('include', '/utbildningar/10-Test%20Course%2011');
  });

  it('Search results renders empty results correctly', () => {
    cy.intercept(
      {
        method: 'GET',
        pathname: '**/education-events',
      },
      mockApiResponse([])
    ).as('getEducationEvents');
    cy.visit('/utbildningar/sok');
    cy.get('.HeaderBlock h2').should('contain.text', 'Inga träffar');
    cy.get('main').should('contain.text', 'Ange ett sökrord eller använd filtreringen för att finna utbildningar.');
  });

  it('Search results renders new query search correctly', () => {
    cy.wait('@getEducationEvents');
    cy.get('main')
      .contains('label', 'Sök utbildningar')
      .click()
      .then(($input) => {
        cy.wrap($input).type('matematik', { delay: 100 });
      });
    cy.get('main').contains('button', 'Sök').click();

    cy.url().should('include', 'q=matematik');
    cy.wait(300); // Note: react re-render loading state
    cy.wait('@getEducationEvents', { timeout: 10000 }).its('request.url').should('include', 'filter[q]=matematik');

    cy.get('main form button[aria-label="Rensa"]').click();
    cy.url().should('not.include', 'filter[q]=matematik');
  });
});
