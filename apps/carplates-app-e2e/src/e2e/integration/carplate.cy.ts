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

  it('should edit and update carplates owner', () => {
    cy.visit('/carplates');

    cy.get('[data-cy="carplate-list-item-id"]')
      .first()
      .invoke('text')
      .then((carplateId) => {
        cy.get('[data-cy="carplate-list-item-actions-open-button"]')
          .first()
          .click();
        cy.get('[data-cy="carplate-list-item-details-open-button"]')
          .first()
          .click();

        const newOwner = 'Neil Armstrong';

        cy.get('[data-cy="carplate-form-owner-input"]').clear();
        cy.get('[data-cy="carplate-form-owner-input"]').type(newOwner);

        cy.intercept(
          'PUT',
          `${Cypress.env('backendApiUrl')}/api/carplates/${carplateId}`
        ).as('updateCarplate');

        cy.get('[data-cy="carplate-form-save-button"]').click();

        cy.wait('@updateCarplate').then((interception) => {
          expect(interception.response?.statusCode).to.equal(200);
        });

        cy.get('[data-cy="carplate-list-item-owner"]')
          .first()
          .should('contain', newOwner);
      });
  });
});
