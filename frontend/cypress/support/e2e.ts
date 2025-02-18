import '@cypress/code-coverage/support';
import { ApiResponse } from '@services/api-service';
import { meEducationCoordinator } from 'cypress/fixtures/me';

export const mockApiResponse = <TData>(data: TData): ApiResponse<TData> => ({ data: data, message: 'response-text' });

beforeEach(() => {
  // fake cookie
  // cy.setCookie('connect.sid', 'cookie');

  // global intercepts
  // cy.intercept('GET', '**/me', mockApiResponse(meEducationCoordinator)).as('me');

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
