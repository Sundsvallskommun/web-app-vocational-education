import '@cypress/code-coverage/support';

import { ApiResponse } from '@services/api-service';
import { CookieConsentUtils } from '@sk-web-gui/react';

export const mockApiResponse = <TData>(data: TData): ApiResponse<TData> => ({
  data: data,
  message: 'api-response-message',
});

beforeEach(() => {
  cy.clearLocalStorage();

  // fake cookie
  cy.setCookie(CookieConsentUtils.defaultCookieConsentName, 'necessary%2Cfunc%2Cstats');

  // intercepts
  cy.intercept('GET', '**/me').as('getMe');
  cy.intercept('POST', '**/login', { data: true, message: 'success' }).as('postLogin');
  cy.intercept('POST', '**/logout', { data: true, message: 'success' }).as('postLogout');
  cy.intercept('POST', '**/contact', { message: 'success' }).as('postContactForm');
  cy.intercept('GET', '**/user/saved-searches').as('getSavedSearches');
  cy.intercept('DELETE', '**/user/saved-searches/*').as('deleteSavedSearches');
  cy.intercept('GET', '**/user/saved-interests').as('getSavedInterests');
  cy.intercept('PATCH', '**/user/saved-interests/*').as('patchSavedInterest');
  cy.intercept('POST', '**/user/saved-interests').as('postSavedInterest');
  cy.intercept('DELETE', '**/user/saved-interests/*').as('deleteSavedInterest');
  cy.intercept('GET', '**/education-events?*').as('getEducationEvents');
  cy.intercept('GET', '**/education-events/filters?*').as('getEducationFilters');

  switch (Cypress.env('VIEWPORT')) {
    case 'small-phone': // iphone-3, small-phone
      cy.viewport(320, 480);
      break;
    case 'phone': // iphone-6, phone
      cy.viewport(375, 667);
      break;
    case 'tablet': // ipad-mini, medium-device
      cy.viewport(768, 1024);
      break;
    case 'desktop': // macbook-11, desktop
      cy.viewport(1366, 768);
      break;
    default:
      cy.viewport(1366, 768);
  }
});
