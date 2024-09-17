export * from './lib/frontend-angular-carplate-carplate-feature-details.module';

export const MAX_OWNER_LENGTH = 30;
export const MIN_OWNER_LENGTH = 3;

export const textFields = {
  owner: {
    label: 'Owner*',
    errors_wrapper: 'owner-error-hints',
    errors: {
      required: {
        errorMessage: 'Owner field is required',
        errorTestId: 'owner-required',
      },
      pattern: {
        errorMessage: 'Owner name must contain only letters, ex: John Doe',
        errorTestId: 'owner-pattern',
      },
      minLength: {
        errorMessage: `Owner field must contain at least ${MIN_OWNER_LENGTH} characters`,
        errorTestId: 'owner-minlength',
      },
    },
  },
  plateName: {
    label: 'Plate Name*',
    errors_wrapper: 'plate-name-error-hints',
    errors: {
      required: {
        errorMessage: 'Plate name field is required',
        errorTestId: 'plate-name-required',
      },
      pattern: {
        errorMessage:
          'Plate name format must be 3 letters and 3 digits, ex: ABC123',
        errorTestId: 'plate-name-pattern',
      },
    },
  },
};
