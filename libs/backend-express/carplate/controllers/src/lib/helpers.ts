import { CarplateParameters } from '@shared/carplate/types';
import { ErrorResponseName } from '@shared/common/enums';
import { ErrorResponse } from '@shared/common/types';

const PLATE_SYMBOLS_TOTAL = 6;
const OWNER_NAME_MAX_LENGTH = 30;
const OWNER_NAME_MIN_LENGTH = 3;

const validateCarplateGeneralFields = ({
  plate_name,
  owner,
}: CarplateParameters): ErrorResponse | null => {
  const plateFormatError = validatePlateFormat(plate_name);
  const plateLengthError = validatePlateLength(plate_name);
  const ownerError = owner ? validateOwner(owner) : null;

  if (plateLengthError) {
    return plateLengthError;
  }

  if (plateFormatError) {
    return plateFormatError;
  }

  if (ownerError) {
    return ownerError;
  }

  return null;
};

export const validateCarplateCreate = (
  carplateCreateParameters: CarplateParameters
): ErrorResponse | null => {
  const fieldsMissingError = validateIfAnyFieldsMissing(
    carplateCreateParameters
  );

  if (fieldsMissingError) {
    return fieldsMissingError;
  }

  const generalFieldsError = validateCarplateGeneralFields(
    carplateCreateParameters
  );

  if (generalFieldsError) {
    return generalFieldsError;
  }

  return null;
};

export const validateCarplateUpdate = ({
  plate_name,
  owner,
}: CarplateParameters): ErrorResponse | null => {
  const noFieldsError = validateIfNoFieldsProvided({ plate_name, owner });
  const plateError = plate_name ? validatePlate(plate_name) : null;
  const ownerError = owner ? validateOwner(owner) : null;

  if (noFieldsError) {
    return noFieldsError;
  }

  if (plateError) {
    return plateError;
  }

  if (ownerError) {
    return ownerError;
  }

  return null;
};

const validatePlate = (plate_name: string): ErrorResponse | null => {
  const plateFormatError = validatePlateFormat(plate_name);
  const plateLengthError = validatePlateLength(plate_name);

  if (plateLengthError) {
    return plateLengthError;
  }

  if (plateFormatError) {
    return plateFormatError;
  }

  return null;
};

const validateIfAnyFieldsMissing = (
  carplateCreateParameters: CarplateParameters
): ErrorResponse | null => {
  const missingFields = [];

  if (!carplateCreateParameters.plate_name) {
    missingFields.push('plate_name');
  }

  if (!carplateCreateParameters.owner) {
    missingFields.push('owner');
  }

  return missingFields.length > 0
    ? {
        error: {
          name: ErrorResponseName.MissingFields,
          message: `[${ErrorResponseName.MissingFields}]: All fields are required.`,
        },
        body: { missingFields },
      }
    : null;
};

const validateIfNoFieldsProvided = ({
  plate_name,
  owner,
}: CarplateParameters): ErrorResponse | null => {
  return !plate_name && !owner
    ? {
        error: {
          name: ErrorResponseName.MissingFields,
          message: `[${ErrorResponseName.MissingFields}]: No fields provided`,
        },
        body: { plate_name, owner },
      }
    : null;
};

const validateOwner = (owner: string): ErrorResponse | null => {
  return owner.length > OWNER_NAME_MAX_LENGTH ||
    owner.length < OWNER_NAME_MIN_LENGTH
    ? {
        error: {
          name: ErrorResponseName.Validation,
          message: `[${ErrorResponseName.Validation}]: Owner has to be from ${OWNER_NAME_MIN_LENGTH} - ${OWNER_NAME_MAX_LENGTH} symbols.`,
        },
        body: { owner },
      }
    : null;
};

const validatePlateLength = (plate_name: string): ErrorResponse | null => {
  return plate_name.length !== PLATE_SYMBOLS_TOTAL
    ? {
        error: {
          name: ErrorResponseName.Validation,
          message: `[${ErrorResponseName.Validation}]: Plate number has to be ${PLATE_SYMBOLS_TOTAL} symbols.`,
        },
        body: { plate_name },
      }
    : null;
};

const validatePlateFormat = (plate_name: string): ErrorResponse | null => {
  return !isCorrectPlateFormat(plate_name)
    ? {
        error: {
          name: ErrorResponseName.Validation,
          message: `[${ErrorResponseName.Validation}]: Plate number has to be 3 letters and 3 digits format ex: AAA111.`,
        },
        body: { plate_name },
      }
    : null;
};

const isCorrectPlateFormat = (plate_name: string): boolean =>
  /^[a-zA-Z]{3}\d{3}$/.test(plate_name);

export const validateIdFormat = (id: string): ErrorResponse | null => {
  return !isCorrectIdFormat(id)
    ? {
        error: {
          name: ErrorResponseName.Validation,
          message: `[${ErrorResponseName.Validation}]: Invalid carplate id format.`,
        },
        body: { id },
      }
    : null;
};

const isCorrectIdFormat = (id: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    id
  );
