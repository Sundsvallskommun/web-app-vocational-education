import dayjs from 'dayjs';

describe('Page > Utbildningsanordnare', () => {
  beforeEach(() => {
    cy.visit('/utbildningsanordnare');
  });

  it('DOM essentials renders correctly', () => {
    cy.get('main').should('exist');
    cy.get('.HeaderBlock h1').should('exist').should('contain.text', '/utbildningsanordnare');
    cy.get('.HeaderBlock p.ingress').should('exist').should('contain.text', 'Test Description');
  });

  it('Saved searches is rendered correctly', () => {
    cy.wait('@getSavedSearches')
      .its('response.statusCode')
      .should((statusCode: number) => {
        expect([200, 304]).to.include(statusCode);
      });

    cy.contains('h2', 'Mina sparade sökningar').nextAll().find('h3').should('contain.text', 'el');

    cy.contains('h2', 'Mina sparade sökningar')
      .nextAll()
      .get('#SavedSearches li:nth-child(1)')
      .should('contain.text', 'Sista ansökningsdatum: 2025-02-13');

    // default 4
    cy.get('#SavedSearches > li').should('have.length', 4);

    // load more
    cy.contains('button', 'Ladda fler').click();
    cy.get('#SavedSearches > li').should('have.length', 5);
  });

  it('Saved searches results remove calls correctly', () => {
    cy.get('#SavedSearches li:nth-child(1)').contains('button', 'Radera').click();

    cy.wait('@deleteSavedSearches')
      .its('response.statusCode')
      .should((statusCode: number) => {
        expect([200]).to.include(statusCode);
      });

    cy.get('*').contains('Den sparade sökningen är nu borttagen.');
  });

  it('Saved interests is rendered correctly', () => {
    cy.wait('@getSavedInterests')
      .its('response.statusCode')
      .should((statusCode: number) => {
        expect([200, 304]).to.include(statusCode);
      });

    cy.contains('h2', 'Lägg till intresseområden')
      .nextAll()
      .find('h3')
      .should('contain.text', 'Bygg och anläggning - Arbetsmarknadsutbildningar');

    cy.contains('h2', 'Lägg till intresseområden')
      .nextAll()
      .get('#SavedInterests li:nth-child(1)')
      .invoke('text')
      .then((text) => {
        expect(text).to.contain(`Uppdaterad 2024-12-12`);
        expect(text).to.contain('Härnösand | 12 månader framåt');
        expect(text).to.contain('Pågående under perioden1');
        expect(text).to.contain('Kapacitet utbildningsplatser2');
        expect(text).to.contain('Plannerade utbildningstarter3');
        expect(text).to.contain('Tillgängliga utbildningsplatser4');
        expect(text).to.contain('Slutförda under perioden5');
      });
  });

  it('Saved interests results edit is rendered correctly', () => {
    cy.get('#SavedInterests li:nth-child(1)').contains('button', 'Ändra').click();

    cy.wait('@getEducationFilters');

    cy.get('h1').should('contain.text', 'Ändra kort för intresseområde Bygg och anläggning');

    cy.get('select[name="category"] option:selected').should('be.visible').and('contain.text', 'Bygg och anläggning');
    cy.get('select[name="level"] option:selected')
      .should('be.visible')
      .and('contain.text', 'Arbetsmarknadsutbildningar');

    cy.get('form button[type="submit"]').contains('Uppdatera').click();
    cy.wait('@patchSavedInterest');

    cy.get('*').contains('Intresseområdet sparades.');
  });

  it('Saved interests results remove calls correctly', () => {
    cy.get('#SavedInterests li:nth-child(1)').contains('button', 'Radera').click();

    cy.wait('@deleteSavedInterest')
      .its('response.statusCode')
      .should((statusCode: number) => {
        expect([200]).to.include(statusCode);
      });

    cy.get('*').contains('Det sparade intresseområdet är nu borttagen.');
  });

  it('Saved interests form adds an entry', () => {
    cy.get('select[name="category"]').select('Data och IT');

    cy.get('select[name="level"]').select('Grundläggande vuxenutbildning');

    cy.get('#SavedInterestsForm').contains('button', 'Välj Kommun(er)').click(); // open
    cy.get('#SavedInterestsForm input[name="studyLocation"][value="Sundsvall"]').parent().click(); // click the label
    cy.get('#SavedInterestsForm').contains('button', 'Välj Kommun(er)').click(); // close

    cy.get('#SavedInterestsForm').contains('button', 'Välj Tidsintervall').click(); // open
    cy.get('#SavedInterestsForm input[name="timeInterval"][value="12"]').should('be.checked');
    cy.get('#SavedInterestsForm input[name="timeInterval"][value="6"]').click();
    cy.get('#SavedInterestsForm input[name="timeIntervalFrom"]').should(
      'have.value',
      dayjs(new Date()).format('YYYY-MM-DD')
    );
    cy.get('#SavedInterestsForm').contains('button', 'Välj Tidsintervall').click(); // close

    cy.get('#SavedInterestsForm').contains('button', 'Lägg till').click();

    cy.wait('@postSavedInterest')
      .its('response.statusCode')
      .should((statusCode: number) => {
        expect([200]).to.include(statusCode);
      });

    cy.contains('*', 'Intresseområdet sparades');
  });
});
