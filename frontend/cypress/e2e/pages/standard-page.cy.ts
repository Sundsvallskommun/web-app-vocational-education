describe('Page > Standardsida', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('DOM essentials renders correctly', () => {
    cy.get('main').should('exist');
    cy.get('.HeaderBlock h1').should('exist').should('contain.text', '/');
    cy.get('.HeaderBlock p.ingress').should('exist').should('contain.text', 'Test Description');
    cy.get('footer h2:last-of-type').should('contain.text', 'Kontakta oss');
    cy.get('footer h2:last-of-type + span').should(
      'contain.text',
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
    );
  });

  it('TableBlock is rendered correctly', () => {
    cy.get('.TableBlock th').should('contain.text', 'test_header1');
    cy.get('.TableBlock tr:nth-child(1) td').should('contain.text', 'test_data1');

    cy.get('.TableBlock th button').should('contain.text', 'test_header1').click();
    cy.get('.TableBlock tr:nth-child(1) td').should('contain.text', 'test_data2');
  });

  it('PromotionsBlock is rendered correctly', () => {
    cy.get('.PromotionsBlock h2').should('contain.text', 'Promoted Title');
    cy.get('.PromotionsBlock h2 + p').should('contain.text', 'Promoted Description');
  });

  it('EducationsStartingBlock is rendered correctly', () => {
    cy.get('.EducationsStartingBlock h2').should('contain.text', 'Utbildningar som snart börjar');
    cy.get('.EducationsStartingBlock h3').should('contain.text', 'Test Course');
    cy.get('.EducationsStartingBlock')
      .invoke('text')
      .then((text) => {
        expect(text).to.contain('Studietakt: 25%');
        expect(text).to.contain('Test Information');
        expect(text).to.contain('17 Feb 2025');
        expect(text).to.contain('Härnösand');
      });
  });

  it('ImportantDatesBlock is rendered correctly', () => {
    cy.get('.ImportantDatesBlock h2').should('contain.text', 'Test Important Dates');
    cy.get('.ImportantDatesBlock h3').should('contain.text', 'December 9024');
    cy.get('.ImportantDatesBlock h4').should('contain.text', 'test2');
    cy.get('.ImportantDatesBlock h4 + p').should('contain.text', 'test2');
    cy.get('.ImportantDatesBlock')
      .invoke('text')
      .then((text) => {
        expect(text).to.contain('16Dec');
      });
    cy.get('.ImportantDatesBlock a').should('contain.text', 'Se alla viktiga datum');
  });

  it('MapBlock is rendered correctly', () => {
    cy.get('.MapBlock h2').should('contain.text', 'Test Map Title');
    cy.get('.MapBlock h2 + p').should('contain.text', 'Test Map Text');
  });

  it('EmployerPromotionsBlock is rendered correctly', () => {
    cy.get('.EmployerPromotionsBlock h2').should('contain.text', 'Test Employer Promotions Title');
    cy.get('.EmployerPromotionsBlock h3').should('contain.text', 'test_employer_title1');
    cy.get('.EmployerPromotionsBlock h3')
      .should('contain.text', 'test_employer_title1')
      .next()
      .contains('test_employer_text1')
      .should('be.visible');
  });

  it('FAQBlock is rendered correctly', () => {
    cy.get('.FAQBlock h2').should('contain.text', 'Test FAQ');
    cy.get('.FAQBlock h2 + p').should('contain.text', 'Test FAQ Description');
    cy.get('.FAQBlock li').should('contain.text', 'test_faq_question1');
    cy.get('.FAQBlock li').contains('*', 'test_faq_answer1').should('not.be.visible');
    cy.get('.FAQBlock li').click();
    cy.get('.FAQBlock li').contains('*', 'test_faq_answer1').should('be.visible');
  });

  it('ContactFormBlock is rendered correctly', () => {
    cy.get('.ContactFormBlock h2').should('contain.text', 'Test Contact Title');
    cy.get('.ContactFormBlock h2 + p').should('contain.text', 'Test Contact Description');

    cy.get('.ContactFormBlock select[name="municipalityEmail"]').should('exist');
    cy.get('.ContactFormBlock select[name="municipalityEmail"]').select('Test label');

    cy.get('.ContactFormBlock input[name="name"]').should('exist').type('Test Name');
    cy.get('.ContactFormBlock input[name="email"]').should('exist').type('test@example.com');
    cy.get('.ContactFormBlock textarea[name="message"]').should('exist').type('message');

    cy.get('.ContactFormBlock button[type="submit"]').should('exist').click();

    cy.wait('@postContactForm')
      .its('response.statusCode')
      .should((statusCode: number) => {
        expect([200]).to.include(statusCode);
      });

    cy.get('*').contains('Meddelandet skickades').should('be.visible');
  });

  it('SearchBlock is rendered correctly', () => {
    cy.get('.SearchBlock h2').should('contain.text', 'Sugen på att börja studera?');
    cy.get('.SearchBlock h2')
      .should('contain.text', 'Sugen på att börja studera?')
      .next()
      .contains(
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Exercitation veniam consequat sunt nostrud amet.'
      )
      .should('be.visible');
  });

  it('LogosBlock is rendered correctly', () => {
    cy.get('.LogosBlock h2').should('contain.text', 'Test Logos Title');
    cy.get('.LogosBlock h2 + p').should('contain.text', 'Test Logos Description');
  });

  it('Render minimal page', () => {
    cy.visit('/minimal');
    cy.get('main').should('exist');
    cy.get('.HeaderBlock h1').should('exist').should('contain.text', '/minimal');
  });
});
