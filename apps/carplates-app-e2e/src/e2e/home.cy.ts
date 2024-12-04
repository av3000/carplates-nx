import { getGreeting } from '../support/app.po';

describe('Carplates Page', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('CarPlates App');
  });

  it('should have carplates loaded', () => {
    cy.intercept(
      'GET',
      `${Cypress.env('backendApiUrl')}/api/carplates?page=1&size=3`,
      { fixture: 'carplates.json' }
    ).as('getCarplatesList');
    cy.wait('@getCarplatesList');
    cy.get('[data-cy="carplates-list-item"]').should('have.length', 3);
  });

  it('should display create carplate button, filters form, carplates list and pagination', () => {
    cy.get('[data-cy="create-carplate-modal-button"]').should('exist');
    cy.get('[data-cy="carplate-list-filters-form"]').should('exist');
    cy.get('[data-cy="carplate-list-filters-form-plate-name"]').should('exist');
    cy.get('[data-cy="carplate-list-filters-form-owner"]').should('exist');
    cy.get('[data-cy="carplate-list"]').should('exist');
    cy.get('[data-cy="pagination"]').should('exist');
  });
});
