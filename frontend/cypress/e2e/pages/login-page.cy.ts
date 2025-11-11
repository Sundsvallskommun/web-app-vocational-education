describe('Page > Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('DOM essentials renders correctly', () => {
    cy.get('main').should('exist');
    cy.get('.HeaderBlock h1').should('exist').should('contain.text', '/login');
    cy.get('.HeaderBlock p.ingress').should('exist').should('contain.text', 'Test Description');
  });

  it('Form is is rendered and works correctly', () => {
    cy.get('h1:visible', { timeout: 10000 }).should('contain.text', '/login');
    cy.get('form:visible').should('be.visible');
    cy.get('form:visible').find('input[name="username"]').should('exist');
    cy.get('form:visible').find('input[name="password"]').should('exist');
    cy.get('form:visible').contains('button[type="submit"]', 'Logga in').should('be.visible').click();
    cy.get('form:visible').contains('Användarnamn måste anges').should('exist');
    cy.get('form:visible').contains('Lösenord måste anges').should('exist');
    cy.get('form:visible').find('input[name="username"]').should('exist').type('admin');
    cy.get('form:visible').find('input[name="password"]').should('exist').type('admin');
    cy.get('form:visible').contains('button[type="submit"]', 'Logga in').should('be.visible').click();

    cy.wait('@postLogin');

    // verify modal should popup
    cy.get('[role="dialog"]:visible').should('be.visible');
    cy.contains('[role="dialog"]:visible h1', 'Verifiera engångskod', { timeout: 10000 }).should('be.visible');
    // enter code
    cy.get('[role="dialog"]:visible form input[name="code"]').should('be.visible').type('123456', { timeout: 10000 });

    // call verify
    cy.intercept('POST', '**/verify-2fa', { data: true, message: 'success' }).as('postVerify');
    cy.get('[role="dialog"]:visible form').contains('button[type="submit"]', 'Verifiera').should('be.visible').click();
    cy.wait('@postVerify').its('response.statusCode').should('eq', 200);

    cy.get('[role="dialog"] form').should('not.exist');

    cy.get('h1:visible', { timeout: 10000 }).should('contain.text', '/');

    // redirect to home page
    cy.url().should('contain', '/');
  });

  it('Glömt lösenord modal is rendered correctly', () => {
    cy.get('button').contains('Glömt lösenord?').click();
    cy.get('h1').should('contain.text', 'Glömt lösenord');
    cy.get('h1')
      .next()
      .should('contain.text', 'För tillfället, kontakta din närmsta konto-ansvarige för att återställa lösenordet.');
    cy.get('button').contains('Stäng').click();
    cy.get('h1').contains('Glömt lösenord').should('not.exist');
  });

  it('Login form error INVALID_CREDENTIALS', () => {
    cy.visit('/login?failMessage=INVALID_CREDENTIALS');
    cy.get('form').contains('Felaktigt användarnamn eller lösenord').should('exist');
  });

  it('Login form error MISSING_PERMISSIONS', () => {
    cy.visit('/login?failMessage=MISSING_PERMISSIONS');
    cy.get('form').contains('Användaren saknar rättigheter').should('exist');
  });

  it('Login form error INVALID_CODE_OR_EXPIRED', () => {
    cy.visit('/login?failMessage=INVALID_CODE_OR_EXPIRED');
    cy.get('form').contains('Engångskoden är felaktig eller har gått ut').should('exist');
  });
});
