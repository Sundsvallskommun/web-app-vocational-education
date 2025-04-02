import dayjs from 'dayjs';

describe('Page > Utbildningar > Sök :: Filter', () => {
  beforeEach(() => {
    cy.visit('/utbildningar/sok');
  });

  it('Search filter "Sortera efter" triggers url change and fetch payload correctly', () => {
    cy.wait('@getEducationEvents');
    cy.get('form').contains('button', 'Sortera efter').click();
    cy.get('form').contains('button', 'Sortera efter').next().contains('label', 'A -> Ö').click();
    cy.url().should('include', 'sortFunction=name%2Casc');
    cy.wait(300); // Note: react re-render loading state
    cy.wait('@getEducationEvents', { timeout: 10000 })
      .its('request.url')
      .should('include', 'filter[sortFunction]=name,asc');
  });

  it('Search filter "Utbildningskategori(er)" triggers url change and fetch payload correctly', () => {
    cy.wait('@getEducationEvents');
    cy.get('form').contains('button', 'Utbildningskategori(er)').click();
    cy.get('form').contains('button', 'Utbildningskategori(er)').next().contains('label', 'Data och IT').click();
    cy.url().should('include', 'category=DATA+OCH+IT');
    cy.wait(300); // Note: react re-render loading state
    cy.wait('@getEducationEvents', { timeout: 10000 })
      .its('request.url')
      .should('include', 'filter[category][0]=DATA+OCH+IT');
  });

  it('Search filter "Utbildningsform(er)" triggers url change and fetch payload correctly', () => {
    cy.wait('@getEducationEvents');
    cy.get('form').contains('button', 'Utbildningsform(er)').click();
    cy.get('form')
      .contains('button', 'Utbildningsform(er)')
      .next()
      .contains('label', 'Grundläggande vuxenutbildning')
      .click();
    cy.url().should('include', 'level=grundl%C3%A4ggande+vuxenutbildning');
    cy.wait(300); // Note: react re-render loading state
    cy.wait('@getEducationEvents', { timeout: 10000 })
      .its('request.url')
      .should('include', 'filter[level][0]=grundl%C3%A4ggande+vuxenutbildning');
  });

  it('Search filter "Kommun(er)" triggers url change and fetch payload correctly', () => {
    cy.wait('@getEducationEvents');
    cy.get('form').contains('button', 'Kommun(er)').click();
    cy.get('form').contains('button', 'Kommun(er)').next().contains('label', 'Sundsvall').click();
    cy.url().should('include', 'studyLocation=Sundsvall');
    cy.wait(300); // Note: react re-render loading state
    cy.wait('@getEducationEvents', { timeout: 10000 })
      .its('request.url')
      .should('include', 'filter[studyLocation][0]=Sundsvall');
  });

  it('Search filter "Distansutbildning" triggers url change and fetch payload correctly', () => {
    cy.wait('@getEducationEvents');
    cy.get('form').contains('button', 'Distansutbildning').click();
    cy.get('form').contains('button', 'Distansutbildning').next().contains('label', 'Ja').click();
    cy.url().should('include', 'distance=true');
    cy.wait(300); // Note: react re-render loading state
    cy.wait('@getEducationEvents', { timeout: 10000 }).its('request.url').should('include', 'filter[distance]=true');
  });

  it('Search filter "Sista ansökningsdatum" triggers url change and fetch payload correctly', () => {
    cy.wait('@getEducationEvents');
    cy.wait(300); // Note: react re-render loading state
    const newDate = dayjs(new Date()).add(1, 'day');
    cy.get('form').contains('button', 'Fler filter').click().as('moreButton');
    cy.get('form').contains('button', 'Färre filter').should('be.visible');
    cy.get('form').contains('button', 'Sista ansökningsdatum').click();
    cy.get('form input[name="latestApplicationDate"]').type(newDate.format('YYYY-MM-DD'));
    cy.url().should('include', `latestApplicationDate=${newDate.format('YYYY-MM-DD')}`);
    cy.wait(300); // Note: react re-render loading state
    cy.wait('@getEducationEvents', { timeout: 10000 })
      .its('request.url')
      .should('include', `filter[latestApplicationDate]=${newDate.format('YYYY-MM-DD')}`);
  });

  it('Search filter "Start från" triggers url change and fetch payload correctly', () => {
    cy.wait('@getEducationEvents');
    cy.wait(300); // Note: react re-render loading state
    const newDate = dayjs(new Date()).add(1, 'day');
    cy.get('form').contains('button', 'Fler filter').click().as('moreButton');
    cy.get('form').contains('button', 'Färre filter').should('be.visible');
    cy.get('form').contains('button', 'Start från').click();
    cy.get('form input[name="startDate"]').type(newDate.format('YYYY-MM-DD'));
    cy.url().should('include', `startDate=${newDate.format('YYYY-MM-DD')}`);
    cy.wait(300); // Note: react re-render loading state
    cy.wait('@getEducationEvents', { timeout: 10000 })
      .its('request.url')
      .should('include', `filter[startDate]=${newDate.format('YYYY-MM-DD')}`);
  });

  it('Search filter "Studietakt(er)" triggers url change and fetch payload correctly', () => {
    cy.wait('@getEducationEvents');
    cy.wait(300); // Note: react re-render loading state
    cy.get('form').contains('button', 'Fler filter').click().as('moreButton');
    cy.get('form').contains('button', 'Färre filter').should('be.visible');
    cy.get('form').contains('button', 'Studietakt(er)').click();
    cy.get('form').contains('button', 'Studietakt(er)').next().contains('label', '100').click();
    cy.url().should('include', 'scope=100');
    cy.wait(300); // Note: react re-render loading state
    cy.wait('@getEducationEvents', { timeout: 10000 }).its('request.url').should('include', 'filter[scope][0]=100');
  });
});
