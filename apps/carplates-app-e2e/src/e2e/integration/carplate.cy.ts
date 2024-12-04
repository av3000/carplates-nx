import { generatePlatename } from '../../support/utils';

describe('Carplate', () => {
  it('should create and load new carplate', () => {
    cy.visit('/carplates/new');
    cy.intercept('POST', `${Cypress.env('backendApiUrl')}/api/carplates`).as(
      'createCarplate'
    );

    cy.get('[data-cy="carplate-form"]').should('exist');

    const newCarplate = {
      plate_name: generatePlatename(),
      owner: 'Johan Doehan',
    };

    cy.get('[data-cy="carplate-form-owner-input"]').type(newCarplate.owner);
    cy.get('[data-cy="carplate-form-plate-name-input"]').type(
      newCarplate.plate_name
    );

    cy.get('[data-cy="carplate-form-save-button"]').click();

    cy.wait('@createCarplate').then((interception) => {
      const createdCarplate = interception.response?.body;

      expect(createdCarplate).to.not.be.null;
      expect(createdCarplate).to.have.property('id');
      expect(createdCarplate).to.have.property(
        'plate_name',
        newCarplate.plate_name
      );
      expect(createdCarplate).to.have.property('owner', newCarplate.owner);

      cy.get('[data-cy="carplate-list-item-plate-name"]').should(
        'contain',
        newCarplate.plate_name
      );
      cy.get('[data-cy="carplate-list-item-id"]').should(
        'contain',
        createdCarplate.id
      );
    });
  });
});
